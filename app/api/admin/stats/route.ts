import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Callback from '@/models/Callback'
import { canAccessDashboard } from '@/lib/auth'

// GET - Retrieve dashboard statistics (admin only)
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication and dashboard access
    const { canAccess, admin, error, redirectTo } = await canAccessDashboard()

    if (!canAccess || !admin) {
      return NextResponse.json(
        { success: false, error: error || 'Unauthorized', redirectTo },
        { status: 401 }
      )
    }

    await dbConnect()

    // Get callback statistics
    const [totalCallbacks, pendingCallbacks, contactedCallbacks, completedCallbacks, recentCallbacks] = await Promise.all([
      Callback.countDocuments({}),
      Callback.countDocuments({ status: 'pending' }),
      Callback.countDocuments({ status: 'contacted' }),
      Callback.countDocuments({ status: 'completed' }),
      Callback.find({}).sort({ createdAt: -1 }).limit(5).lean(),
    ])

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          total: totalCallbacks,
          pending: pendingCallbacks,
          contacted: contactedCallbacks,
          completed: completedCallbacks,
        },
        recentCallbacks,
        admin: {
          userId: admin.userId,
        },
      },
    })
  } catch (error: any) {
    console.error('GET /api/admin/stats error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
