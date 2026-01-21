import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Callback from '@/models/Callback'
import AdminLog from '@/models/AdminLog'
import { canAccessDashboard } from '@/lib/auth'

// GET - Retrieve all callbacks (admin only)
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

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '100')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    // Build query
    const query: Record<string, string> = {}
    if (status && ['pending', 'contacted', 'completed'].includes(status)) {
      query.status = status
    }

    const [callbacks, total] = await Promise.all([
      Callback.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Callback.countDocuments(query),
    ])

    return NextResponse.json({
      success: true,
      data: callbacks,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error('GET /api/admin/callbacks error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch callbacks' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a single callback by ID (admin only)
export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const deleteAll = searchParams.get('deleteAll') === 'true'

    if (deleteAll) {
      // Delete all callbacks
      const result = await Callback.deleteMany({})

      // Log the delete all action
      await AdminLog.create({
        adminId: admin.adminId,
        userId: admin.userId,
        action: 'delete_all_callbacks',
        details: `Deleted ${result.deletedCount} callback records`,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      })

      return NextResponse.json({
        success: true,
        message: `Successfully deleted ${result.deletedCount} callback records`,
        deletedCount: result.deletedCount,
      })
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Callback ID is required' },
        { status: 400 }
      )
    }

    const callback = await Callback.findByIdAndDelete(id)

    if (!callback) {
      return NextResponse.json(
        { success: false, error: 'Callback not found' },
        { status: 404 }
      )
    }

    // Log the delete action
    await AdminLog.create({
      adminId: admin.adminId,
      userId: admin.userId,
      action: 'delete_callback',
      details: `Deleted callback from ${callback.name} (${callback.phone})`,
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    })

    return NextResponse.json({
      success: true,
      message: 'Callback deleted successfully',
    })
  } catch (error: any) {
    console.error('DELETE /api/admin/callbacks error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete callback' },
      { status: 500 }
    )
  }
}
