'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faClock,
  faUser,
  faPhone,
  faBuilding,
  faTag,
  faComment,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import ContactCard from '@/components/ContactCard'
import FaqItem from '@/components/FaqItem'

const contactInfo = [
  {
    icon: faMapMarkerAlt,
    title: 'Our Location',
    lines: ['Vasai, Maharashtra', 'India - 400068'],
  },
  {
    icon: faPhoneAlt,
    title: 'Phone Number',
    lines: ['+91 7039683427', '+91 9869753645'],
  },
  {
    icon: faEnvelope,
    title: 'Email Address',
    lines: ['info@bombayskyhigh.com', 'sales@bombayskyhigh.com'],
  },
  {
    icon: faClock,
    title: 'Working Hours',
    lines: ['Mon - Sat: 9AM - 6PM', 'Sunday: Closed'],
  },
]

const faqs = [
  {
    question: 'Do you provide scaffolding on rent?',
    answer:
      'Yes, we offer flexible rental options for all our scaffolding products including props, cuplock systems, H-frames, and formwork accessories. Contact us for rental rates and terms.',
  },
  {
    question: 'What is your delivery area?',
    answer:
      'We deliver scaffolding materials across India. Our primary service areas include Mumbai, Pune, Bangalore, Delhi, Chennai, and surrounding regions. Contact us for delivery to your location.',
  },
  {
    question: 'Do you offer bulk discounts?',
    answer:
      'Absolutely! We provide competitive bulk pricing for large orders. Please fill out the quote form above or call us directly to discuss your requirements and get a customized quote.',
  },
  {
    question: 'Are your products certified?',
    answer:
      'Yes, all our scaffolding products are manufactured as per Indian and international safety standards. We provide quality certificates and documentation with our products.',
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess(false)

    // Basic validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setSubmitError('Please fill in all required fields')
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
          email: formData.email.trim(),
          message: `Subject: ${formData.subject.trim() || 'Contact Form Submission'}\nCompany: ${formData.company.trim() || 'N/A'}\n\nMessage: ${formData.message.trim()}`,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitSuccess(true)
        setFormData({
          name: '',
          phone: '',
          email: '',
          company: '',
          subject: '',
          message: '',
        })
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  return (
    <main>
      {/* Page Hero */}
      <section className="contact-hero-gradient text-white pt-36 pb-20 px-5 text-center relative hero-pattern">
        <div className="relative max-w-[700px] mx-auto">
          <span className="inline-block bg-primary/20 text-primary px-5 py-2 rounded-full text-sm mb-6 border border-primary/30">
            📞 Get In Touch
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-lg text-slate-350">
            Have questions about our scaffolding products? We&apos;re here to help!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-5 bg-slate-50">
        <div className="max-w-[1200px] mx-auto">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {contactInfo.map((info, index) => (
              <ContactCard key={index} {...info} />
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-white p-10 rounded-2xl shadow-sm">
              <div className="mb-8">
                <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  Send Message
                </span>
                <h2 className="text-2xl text-dark mb-3">Get a Free Quote</h2>
                <p className="text-slate-450">
                  Fill out the form below and our team will get back to you within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-slate-550 font-medium text-sm">
                      <FontAwesomeIcon icon={faUser} className="mr-2 text-primary" />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your full name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl text-base bg-slate-50 transition-all form-input"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-slate-550 font-medium text-sm">
                      <FontAwesomeIcon icon={faPhone} className="mr-2 text-primary" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Enter your phone number"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl text-base bg-slate-50 transition-all form-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-slate-550 font-medium text-sm">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-primary" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl text-base bg-slate-50 transition-all form-input"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="company" className="block mb-2 text-slate-550 font-medium text-sm">
                      <FontAwesomeIcon icon={faBuilding} className="mr-2 text-primary" />
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Your company name (optional)"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl text-base bg-slate-50 transition-all form-input"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="subject" className="block mb-2 text-slate-550 font-medium text-sm">
                    <FontAwesomeIcon icon={faTag} className="mr-2 text-primary" />
                    Subject *
                  </label>
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl text-base bg-slate-50 transition-all form-input"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="product">Product Inquiry</option>
                    <option value="rental">Rental Services</option>
                    <option value="quote">Request Quote</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-5">
                  <label htmlFor="message" className="block mb-2 text-slate-550 font-medium text-sm">
                    <FontAwesomeIcon icon={faComment} className="mr-2 text-primary" />
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your requirements..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl text-base bg-slate-50 transition-all form-input resize-y"
                  />
                </div>

                {/* Success Message */}
                {submitSuccess && (
                  <div className="mb-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="text-sm">We will get back to you within 24 hours.</p>
                  </div>
                )}

                {/* Error Message */}
                {submitError && (
                  <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                    <p className="font-semibold">Error:</p>
                    <p className="text-sm">{submitError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-gradient text-dark py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Map Section */}
            <div className="bg-white p-10 rounded-2xl shadow-sm">
              <div className="mb-8">
                <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  Our Location
                </span>
                <h2 className="text-2xl text-dark mb-3">Visit Our Office</h2>
                <p className="text-slate-450">
                  Come visit us at our Mumbai office for product demonstrations
                </p>
              </div>

              <div className="mb-6 rounded-xl overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1704067200000!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <div>
                <h4 className="text-dark mb-4 font-semibold">Quick Contact</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold bg-dark text-white transition-all hover:-translate-y-0.5"
                  >
                    <FontAwesomeIcon icon={faPhone} /> Call Now
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold bg-green-500 text-white transition-all hover:-translate-y-0.5"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
                  </a>
                  <a
                    href="mailto:info@bombayskyhigh.com"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold bg-primary text-white transition-all hover:-translate-y-0.5"
                  >
                    <FontAwesomeIcon icon={faEnvelope} /> Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-5 bg-white">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            FAQs
          </span>
          <h2 className="text-3xl text-dark mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-450 text-lg max-w-[600px] mx-auto">
            Find answers to common questions about our products and services
          </p>
        </div>
        <div className="max-w-[800px] mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem key={index} {...faq} />
          ))}
        </div>
      </section>
    </main>
  )
}
