import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Callback from '@/models/Callback'

// GET - Retrieve all callback requests
export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
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
  } catch (error) {
    console.error('GET /api/callback error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch callback requests' },
      { status: 500 }
    )
  }
}

// POST - Create a new callback request
export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    // Create new callback request
    const newCallback = await Callback.create({
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim() || undefined,
      message: body.message?.trim() || undefined,
      product: body.product?.trim() || undefined,
      status: 'pending',
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Callback request submitted successfully',
        data: newCallback,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('POST /api/callback error:', error)
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to submit callback request' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a callback request by ID
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Callback ID is required' },
        { status: 400 }
      )
    }

    const deleted = await Callback.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Callback request not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Callback request deleted successfully',
    })
  } catch (error) {
    console.error('DELETE /api/callback error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete callback request' },
      { status: 500 }
    )
  }
}

// PATCH - Update callback status
export async function PATCH(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'ID and status are required' },
        { status: 400 }
      )
    }

    if (!['pending', 'contacted', 'completed'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status. Use: pending, contacted, or completed' },
        { status: 400 }
      )
    }

    const updated = await Callback.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Callback request not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Callback status updated successfully',
      data: updated,
    })
  } catch (error) {
    console.error('PATCH /api/callback error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update callback request' },
      { status: 500 }
    )
  }
}
