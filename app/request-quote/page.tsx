'use client'

import { useState, useEffect, FormEvent, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faPhone,
  faEnvelope,
  faComment,
  faBox,
  faPaperPlane,
  faCheckCircle,
  faSpinner,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'

interface FormData {
  name: string
  phone: string
  email: string
  message: string
  product: string
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
}

function RequestQuoteForm() {
  const searchParams = useSearchParams()
  const productParam = searchParams.get('product')

  const [products, setProducts] = useState<string[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
    product: productParam || '',
  })

  // Fetch products for dropdown
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products?titles=true')
        const data = await response.json()
        if (data.success) {
          setProducts(data.data)
          // If product from URL isn't in the list, add it
          if (productParam && !data.data.includes(productParam)) {
            setProducts(prev => [productParam, ...prev])
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoadingProducts(false)
      }
    }
    fetchProducts()
  }, [productParam])

  // Update product when URL param changes
  useEffect(() => {
    if (productParam) {
      setFormData(prev => ({ ...prev, product: productParam }))
    }
  }, [productParam])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (formData.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          message: formData.message.trim() || undefined,
          product: formData.product || undefined,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
          product: '',
        })
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError('Failed to submit. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-5">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-dark mb-4">Quote Request Submitted!</h2>
            <p className="text-slate-500 mb-8">
              Thank you for your interest. Our team will review your request and get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-all hover:bg-slate-200"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Browse Products
              </Link>
              <button
                onClick={() => setIsSuccess(false)}
                className="btn-gradient text-white px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark to-dark-light text-white pt-36 pb-16 px-5 text-center relative hero-pattern">
        <div className="relative max-w-[700px] mx-auto">
          <span className="inline-block bg-primary/20 text-primary px-5 py-2 rounded-full text-sm mb-6 border border-primary/30">
            📋 Get Custom Pricing
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Request a Quote</h1>
          <p className="text-lg text-slate-350">
            Fill out the form below and our team will get back to you with a personalized quote within 24 hours.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-5 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            {/* Back Link */}
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-6 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
              Back to Products
            </Link>

            {productParam && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-600">
                  Requesting quote for: <span className="font-semibold text-primary-dark">{productParam}</span>
                </p>
              </div>
            )}

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg outline-none transition-all ${
                      errors.name
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg outline-none transition-all ${
                      errors.phone
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg outline-none transition-all ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Product Dropdown */}
              <div>
                <label htmlFor="product" className="block text-sm font-semibold text-slate-700 mb-2">
                  Product
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faBox}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <select
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    disabled={isLoadingProducts}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Select a product (optional)</option>
                    {products.map((product) => (
                      <option key={product} value={product}>
                        {product}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {isLoadingProducts ? (
                      <FontAwesomeIcon icon={faSpinner} className="text-slate-400 animate-spin" />
                    ) : (
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                  Message
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="absolute left-4 top-4 text-slate-400"
                  />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements, quantity needed, project timeline, etc."
                    rows={4}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-gradient text-white px-6 py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Submit Quote Request
                  </>
                )}
              </button>
            </form>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-center text-sm text-slate-500">
                By submitting this form, you agree to be contacted by our sales team.
                <br />
                We typically respond within 24 hours on business days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Loading fallback for Suspense
function FormLoading() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-5">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
          <FontAwesomeIcon icon={faSpinner} className="text-primary text-3xl animate-spin mb-4" />
          <p className="text-slate-500">Loading form...</p>
        </div>
      </div>
    </div>
  )
}

export default function RequestQuotePage() {
  return (
    <Suspense fallback={<FormLoading />}>
      <RequestQuoteForm />
    </Suspense>
  )
}
