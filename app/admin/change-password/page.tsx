'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ChangePasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [passwordExpired, setPasswordExpired] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecial: false,
  })

  useEffect(() => {
    // Verify authentication status
    const verifyAuth = async () => {
      try {
        const response = await fetch('/api/admin/verify')
        const data = await response.json()

        if (!data.authenticated) {
          router.push('/admin/login')
          return
        }

        setPasswordExpired(data.data?.passwordExpired || false)
      } catch (error) {
        router.push('/admin/login')
      } finally {
        setIsVerifying(false)
      }
    }

    verifyAuth()
  }, [router])

  // Check password strength as user types
  useEffect(() => {
    const password = formData.newPassword
    setPasswordStrength({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    })
  }, [formData.newPassword])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validate all fields
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmNewPassword) {
      setError('All fields are required')
      return
    }

    // Check password strength
    if (!Object.values(passwordStrength).every(Boolean)) {
      setError('New password does not meet all requirements')
      return
    }

    // Check passwords match
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError('New passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('Password changed successfully! Redirecting...')
        setTimeout(() => {
          router.push(data.data.redirectTo)
        }, 1500)
      } else {
        setError(data.error || 'Failed to change password')
      }
    } catch (error) {
      console.error('Change password error:', error)
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Bombay <span className="text-primary">Sky High</span>
          </h1>
          <p className="text-slate-400 mt-2">Admin Portal</p>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Change Password</h2>
            {passwordExpired ? (
              <div className="mt-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-lg text-sm">
                ⚠️ Your password has expired. Please set a new password to continue.
              </div>
            ) : (
              <p className="text-slate-500 mt-1">Update your password securely</p>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Current Password */}
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Enter new password"
                />

                {/* Password Strength Indicators */}
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-medium text-slate-500">Password requirements:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div
                      className={`flex items-center gap-1.5 text-xs ${
                        passwordStrength.minLength ? 'text-green-600' : 'text-slate-400'
                      }`}
                    >
                      {passwordStrength.minLength ? '✓' : '○'} Min 8 characters
                    </div>
                    <div
                      className={`flex items-center gap-1.5 text-xs ${
                        passwordStrength.hasUppercase ? 'text-green-600' : 'text-slate-400'
                      }`}
                    >
                      {passwordStrength.hasUppercase ? '✓' : '○'} 1 uppercase letter
                    </div>
                    <div
                      className={`flex items-center gap-1.5 text-xs ${
                        passwordStrength.hasNumber ? 'text-green-600' : 'text-slate-400'
                      }`}
                    >
                      {passwordStrength.hasNumber ? '✓' : '○'} 1 number
                    </div>
                    <div
                      className={`flex items-center gap-1.5 text-xs ${
                        passwordStrength.hasSpecial ? 'text-green-600' : 'text-slate-400'
                      }`}
                    >
                      {passwordStrength.hasSpecial ? '✓' : '○'} 1 special character
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label
                  htmlFor="confirmNewPassword"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Confirm new password"
                />
                {formData.confirmNewPassword && formData.newPassword !== formData.confirmNewPassword && (
                  <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{success}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 rounded-xl font-semibold text-lg transition-all ${
                  isLoading
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-dark text-slate-900 hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Updating Password...
                  </span>
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </form>

          {/* Back Link */}
          {!passwordExpired && (
            <div className="mt-6 text-center">
              <Link
                href="/admin/dashboard"
                className="text-sm text-slate-500 hover:text-primary transition-colors"
              >
                ← Back to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
