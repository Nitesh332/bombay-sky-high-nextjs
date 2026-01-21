'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

export interface Product {
  title: string
  description: string
  image: string
  price?: string
  badge?: string
}

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Handle Escape key to close modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  // Focus trap implementation
  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      const previouslyFocused = document.activeElement as HTMLElement

      // Focus the close button when modal opens
      closeButtonRef.current?.focus()

      // Add event listener for Escape key
      document.addEventListener('keydown', handleKeyDown)

      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'unset'
        // Return focus to previously focused element
        previouslyFocused?.focus()
      }
    }
  }, [isOpen, handleKeyDown])

  // Focus trap - keep focus within modal
  const handleTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !modalRef.current) return

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault()
      lastElement?.focus()
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault()
      firstElement?.focus()
    }
  }

  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleTabKey}
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes} className="text-slate-600 text-lg" />
            </button>

            {/* Product Image */}
            <div className="relative w-full h-[300px] md:h-[350px]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 badge-gradient text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-6 md:p-8">
              <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-dark mb-3">
                {product.title}
              </h2>

              {product.price && (
                <p className="text-2xl font-bold text-primary mb-4">{product.price}</p>
              )}

              <p className="text-slate-500 text-base leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Features List */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2 text-slate-600 text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    High-quality materials
                  </li>
                  <li className="flex items-center gap-2 text-slate-600 text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Durable construction
                  </li>
                  <li className="flex items-center gap-2 text-slate-600 text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Industry certified
                  </li>
                  <li className="flex items-center gap-2 text-slate-600 text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Easy installation
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`/request-quote?product=${encodeURIComponent(product.title)}`}
                  className="flex-1 btn-gradient text-white px-6 py-3 rounded-lg font-semibold text-center inline-flex items-center justify-center gap-2 transition-all hover:opacity-90"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  Request Quote
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex-1 bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-semibold text-center inline-flex items-center justify-center gap-2 transition-all hover:bg-slate-200"
                >
                  <FontAwesomeIcon icon={faPhone} />
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
