import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/models/Admin'
import AdminLog from '@/models/AdminLog'
import { generateToken, setTokenCookie, verifyAdminAuth, validatePassword } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    // Verify admin is authenticated
    const { isAuthenticated, admin, error } = await verifyAdminAuth()

    if (!isAuthenticated || !admin) {
      return NextResponse.json(
        { success: false, error: error || 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()

    const body = await request.json()
    const { currentPassword, newPassword, confirmNewPassword } = body

    // Validate input
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if new passwords match
    if (newPassword !== confirmNewPassword) {
      return NextResponse.json(
        { success: false, error: 'New passwords do not match' },
        { status: 400 }
      )
    }

    // Validate new password strength
    const passwordValidation = validatePassword(newPassword)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { success: false, error: passwordValidation.errors.join('. ') },
        { status: 400 }
      )
    }

    // Get admin from database
    const adminUser = await Admin.findById(admin.adminId)

    if (!adminUser) {
      return NextResponse.json(
        { success: false, error: 'Admin not found' },
        { status: 404 }
      )
    }

    // Verify current password
    const isCurrentPasswordValid = await adminUser.comparePassword(currentPassword)

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    // Check if new password is same as current
    const isSamePassword = await bcrypt.compare(newPassword, adminUser.passwordHash)
    if (isSamePassword) {
      return NextResponse.json(
        { success: false, error: 'New password must be different from current password' },
        { status: 400 }
      )
    }

    // Hash new password and update
    const salt = await bcrypt.genSalt(12)
    const newPasswordHash = await bcrypt.hash(newPassword, salt)

    adminUser.passwordHash = newPasswordHash
    adminUser.lastPasswordUpdatedAt = new Date()
    await adminUser.save()

    // Generate new token with passwordExpired = false
    const newToken = await generateToken({
      adminId: admin.adminId,
      userId: admin.userId,
      passwordExpired: false,
    })

    // Set new token cookie
    await setTokenCookie(newToken)

    // Log the password change action
    await AdminLog.create({
      adminId: admin.adminId,
      userId: admin.userId,
      action: 'password_change',
      details: 'Password changed successfully',
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    })

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully',
      data: {
        redirectTo: '/admin/dashboard',
      },
    })
  } catch (error: any) {
    console.error('POST /api/admin/change-password error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to change password. Please try again.' },
      { status: 500 }
    )
  }
}
