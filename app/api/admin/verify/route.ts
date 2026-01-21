import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { isAuthenticated, admin, error } = await verifyAdminAuth()

    if (!isAuthenticated || !admin) {
      return NextResponse.json(
        { 
          success: false, 
          authenticated: false,
          error: error || 'Not authenticated' 
        },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      data: {
        userId: admin.userId,
        passwordExpired: admin.passwordExpired,
      },
    })
  } catch (error: any) {
    console.error('GET /api/admin/verify error:', error)
    return NextResponse.json(
      { success: false, authenticated: false, error: 'Verification failed' },
      { status: 500 }
    )
  }
}
