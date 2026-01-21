import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/models/Admin'
import AdminLog from '@/models/AdminLog'
import { generateToken, setTokenCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()
    const { userId, password } = body

    // Validate input
    if (!userId || !password) {
      return NextResponse.json(
        { success: false, error: 'User ID and password are required' },
        { status: 400 }
      )
    }

    // Find admin by userId
    const admin = await Admin.findOne({ userId: userId.toLowerCase().trim() })

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check if password is expired
    const passwordExpired = admin.isPasswordExpired()

    // Generate JWT token
    const token = await generateToken({
      adminId: admin._id.toString(),
      userId: admin.userId,
      passwordExpired,
    })

    // Set token in cookie
    await setTokenCookie(token)

    // Log the login action
    await AdminLog.create({
      adminId: admin._id,
      userId: admin.userId,
      action: 'login',
      details: passwordExpired ? 'Password expired - redirect to change password' : 'Successful login',
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    })

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        userId: admin.userId,
        passwordExpired,
        redirectTo: passwordExpired ? '/admin/change-password' : '/admin/dashboard',
      },
    })
  } catch (error: any) {
    console.error('POST /api/admin/login error:', error)
    return NextResponse.json(
      { success: false, error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}
