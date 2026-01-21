import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

// Paths that require admin authentication
const protectedPaths = [
  '/admin/dashboard',
  '/admin/callbacks',
  '/admin/change-password',
]

// Paths that should redirect to dashboard if already authenticated
const authPaths = ['/admin/login']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if it's an admin path
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const token = getTokenFromRequest(request)

  // Handle login page - redirect to dashboard if already authenticated
  if (authPaths.includes(pathname)) {
    if (token) {
      const payload = await verifyToken(token)
      if (payload) {
        // If password is expired, redirect to change password
        if (payload.passwordExpired) {
          return NextResponse.redirect(new URL('/admin/change-password', request.url))
        }
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
    }
    return NextResponse.next()
  }

  // Handle protected paths
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const payload = await verifyToken(token)

    if (!payload) {
      // Invalid token - redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('admin_token')
      return response
    }

    // If password is expired and trying to access anything other than change-password
    if (payload.passwordExpired && !pathname.startsWith('/admin/change-password')) {
      return NextResponse.redirect(new URL('/admin/change-password', request.url))
    }

    // If password is not expired and trying to access change-password directly (optional access)
    // Allow access - user might want to change password proactively

    return NextResponse.next()
  }

  // Redirect /admin to /admin/login
  if (pathname === '/admin' || pathname === '/admin/') {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
