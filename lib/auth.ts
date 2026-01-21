import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'bombay-sky-high-admin-secret-key-2024'
)

const TOKEN_NAME = 'admin_token'
const TOKEN_EXPIRY = '24h'

export interface AdminTokenPayload {
  adminId: string
  userId: string
  passwordExpired: boolean
  iat: number
  exp: number
}

// Generate JWT token
export async function generateToken(payload: {
  adminId: string
  userId: string
  passwordExpired: boolean
}): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET)

  return token
}

// Verify JWT token
export async function verifyToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as AdminTokenPayload
  } catch (error) {
    return null
  }
}

// Get token from cookies (for API routes)
export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(TOKEN_NAME)
  return token?.value || null
}

// Get token from request (for middleware)
export function getTokenFromRequest(request: NextRequest): string | null {
  const token = request.cookies.get(TOKEN_NAME)
  return token?.value || null
}

// Set token in cookies
export async function setTokenCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  })
}

// Remove token from cookies
export async function removeTokenCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(TOKEN_NAME)
}

// Validate password strength
export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least 1 uppercase letter')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least 1 number')
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least 1 special character')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Verify admin authentication for API routes
export async function verifyAdminAuth(): Promise<{
  isAuthenticated: boolean
  admin: AdminTokenPayload | null
  error?: string
}> {
  const token = await getTokenFromCookies()

  if (!token) {
    return {
      isAuthenticated: false,
      admin: null,
      error: 'No authentication token found',
    }
  }

  const payload = await verifyToken(token)

  if (!payload) {
    return {
      isAuthenticated: false,
      admin: null,
      error: 'Invalid or expired token',
    }
  }

  return {
    isAuthenticated: true,
    admin: payload,
  }
}

// Check if admin can access dashboard (not password expired)
export async function canAccessDashboard(): Promise<{
  canAccess: boolean
  admin: AdminTokenPayload | null
  error?: string
  redirectTo?: string
}> {
  const { isAuthenticated, admin, error } = await verifyAdminAuth()

  if (!isAuthenticated) {
    return {
      canAccess: false,
      admin: null,
      error,
      redirectTo: '/admin/login',
    }
  }

  if (admin?.passwordExpired) {
    return {
      canAccess: false,
      admin,
      error: 'Password expired',
      redirectTo: '/admin/change-password',
    }
  }

  return {
    canAccess: true,
    admin,
  }
}
