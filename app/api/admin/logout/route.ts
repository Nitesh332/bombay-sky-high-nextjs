import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/models/Admin'
import AdminLog from '@/models/AdminLog'
import { removeTokenCookie, verifyAdminAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { isAuthenticated, admin } = await verifyAdminAuth()

    if (isAuthenticated && admin) {
      await dbConnect()

      // Log the logout action
      await AdminLog.create({
        adminId: admin.adminId,
        userId: admin.userId,
        action: 'logout',
        details: 'User logged out',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      })
    }

    // Remove token cookie
    await removeTokenCookie()

    return NextResponse.json({
      success: true,
      message: 'Logout successful',
    })
  } catch (error: any) {
    console.error('POST /api/admin/logout error:', error)
    
    // Still try to remove the cookie even if there's an error
    try {
      await removeTokenCookie()
    } catch {}

    return NextResponse.json({
      success: true,
      message: 'Logout successful',
    })
  }
}
