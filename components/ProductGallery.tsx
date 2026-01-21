'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ProductModal, { Product } from './ProductModal'

interface ProductGalleryCardProps {
  product: Product
  index: number
  onProductClick: (product: Product) => void
}

function ProductGalleryCard({ product, index, onProductClick }: ProductGalleryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onClick={() => onProductClick(product)}
      className="bg-white p-5 rounded-2xl text-center shadow-md cursor-pointer relative overflow-hidden group"
    >
      {product.badge && (
        <div className="absolute top-4 left-4 badge-gradient text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
          {product.badge}
        </div>
      )}
      
      {/* Image Container */}
      <div className="relative w-full h-[200px] mb-4 rounded-xl overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-primary-dark px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            View Details
          </span>
        </div>
      </div>

      <h3 className="my-3 text-dark text-lg font-semibold line-clamp-1">{product.title}</h3>
      <p className="text-slate-450 text-sm mb-2 line-clamp-2">{product.description}</p>
      
      {product.price && (
        <p className="text-primary-dark font-bold text-lg">{product.price}</p>
      )}
    </motion.div>
  )
}

interface ProductGalleryProps {
  products: Product[]
  className?: string
}

export default function ProductGallery({ products, className = '' }: ProductGalleryProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    // Delay clearing the product to allow exit animation
    setTimeout(() => setSelectedProduct(null), 200)
  }

  return (
    <>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {products.map((product, index) => (
          <ProductGalleryCard
            key={`${product.title}-${index}`}
            product={product}
            index={index}
            onProductClick={handleProductClick}
          />
        ))}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </>
  )
}
