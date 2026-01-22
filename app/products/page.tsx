'use client'

import { useState, useMemo, useCallback, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faCubes,
  faTruck,
  faCogs,
  faTools,
  faBuilding,
  faBorderAll,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { productCategories, type Product as ProductType } from '@/lib/products'

// Dynamically import the modal for code splitting
const ProductModal = dynamic(() => import('@/components/ProductModal'), {
  ssr: false,
  loading: () => null,
})

// Icon mapping
const iconMap: Record<string, IconDefinition> = {
  faCubes,
  faTruck,
  faCogs,
  faTools,
  faBuilding,
  faBorderAll,
}

const categories = productCategories.map(cat => ({
  id: cat.id,
  label: cat.title.replace(/^[^\s]+\s/, ''),
  icon: iconMap[cat.icon] || faCubes,
}))

// Memoized Product Card Component
const ProductCard = memo(function ProductCard({ 
  product, 
  onProductClick 
}: { 
  product: ProductType
  onProductClick: (product: ProductType) => void 
}) {
  return (
    <div
      onClick={() => onProductClick(product)}
      className="bg-white p-5 rounded-2xl text-center shadow-md cursor-pointer relative overflow-hidden group hover:-translate-y-2 transition-transform duration-200"
    >
      {product.badge && (
        <div className="absolute top-4 left-4 badge-gradient text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
          {product.badge}
        </div>
      )}
      
      <div className="relative w-full h-[200px] mb-4 rounded-xl overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAAFERIGITFBUWFx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEEGKVf+PJpNSuKsE2OXGxIx3HY+R7qjRtIhRJYJl+1P/9k="
        />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-primary-dark px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            View Details
          </span>
        </div>
      </div>

      <h3 className="my-3 text-dark text-lg font-semibold line-clamp-1">{product.title}</h3>
      <p className="text-slate-450 text-sm mb-2 line-clamp-2">{product.description}</p>
    </div>
  )
})

// Memoized Category Button
const CategoryButton = memo(function CategoryButton({
  category,
  isActive,
  onClick,
}: {
  category: { id: string; label: string; icon: IconDefinition }
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all ${
        isActive
          ? 'btn-gradient text-white'
          : 'bg-slate-100 text-slate-550 hover:bg-slate-200'
      }`}
    >
      <FontAwesomeIcon icon={category.icon} className="text-sm" />
      {category.label}
    </button>
  )
})

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('scaffolding-products')
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Memoize filtered products to prevent recalculation on every render
  const filteredProductsByCategory = useMemo(() => {
    const result: Record<string, ProductType[]> = {}
    
    productCategories.forEach(category => {
      const filtered = searchTerm
        ? category.products.filter(
            product =>
              product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : category.products
      
      result[category.id] = filtered
    })
    
    return result
  }, [searchTerm])

  // Memoized handlers
  const handleProductClick = useCallback((product: ProductType) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProduct(null), 200)
  }, [])

  const handleCategoryClick = useCallback((categoryId: string) => {
    setActiveCategory(categoryId)
    // Scroll to the section with offset for sticky header
    const section = document.getElementById(categoryId)
    if (section) {
      const headerOffset = 150 // Account for navbar + category bar
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  return (
    <main>
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-dark to-dark-light text-white pt-36 pb-20 px-5 text-center relative hero-pattern">
        <div className="relative max-w-[700px] mx-auto">
          <span className="inline-block bg-primary/20 text-primary px-5 py-2 rounded-full text-sm mb-6 border border-primary/30">
            🏗️ Premium Quality Products
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Our Scaffolding Products</h1>
          <p className="text-lg text-slate-350 mb-8">
            Explore our comprehensive range of high-quality scaffolding materials, props, and
            construction equipment
          </p>
          <div className="bg-white rounded-full py-1 px-1 pl-6 flex items-center max-w-[500px] mx-auto shadow-xl overflow-hidden">
            <FontAwesomeIcon icon={faSearch} className="text-slate-450 mr-3" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-1 border-none outline-none text-base py-3 text-dark"
            />
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="bg-white py-5 px-5 border-b border-slate-200 sticky top-[70px] z-[100]">
        <div className="max-w-[1200px] mx-auto flex gap-3 overflow-x-auto hide-scrollbar pb-1">
          {categories.map((cat) => (
            <CategoryButton
              key={cat.id}
              category={cat}
              isActive={activeCategory === cat.id}
              onClick={() => handleCategoryClick(cat.id)}
            />
          ))}
        </div>
      </section>

      {/* Products Sections */}
      {productCategories.map((category, index) => (
        <section
          key={category.id}
          id={category.id}
          className={`py-10 px-5 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
        >
          {category.badge && (
            <div className="text-center mb-2">
              <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold">
                {category.badge}
              </span>
            </div>
          )}
          <h2 className="text-center text-2xl text-dark mb-8 pb-2 border-b-4 border-primary inline-block w-full">
            {category.title}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
            {filteredProductsByCategory[category.id].map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
          
          {filteredProductsByCategory[category.id].length === 0 && (
            <p className="text-center text-slate-450 py-10">
              No products found matching &ldquo;{searchTerm}&rdquo;
            </p>
          )}
        </section>
      ))}

      {/* CTA Section */}
      <section className="cta-gradient py-20 px-5 text-center">
        <div>
          <h2 className="text-3xl text-white mb-4">Need Custom Scaffolding Solutions?</h2>
          <p className="text-slate-350 text-lg mb-9">
            Contact our experts for personalized recommendations and bulk order discounts
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/request-quote"
              className="bg-white text-dark px-7 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faEnvelope} /> Request Quote
            </Link>
            <a
              href="tel:+917039683427"
              className="bg-transparent text-white px-7 py-4 rounded-lg font-semibold border-2 border-white inline-flex items-center gap-2 transition-all hover:bg-white hover:text-dark"
            >
              <FontAwesomeIcon icon={faPhone} /> Call: +91 70396  83427
            </a>
          </div>
        </div>
      </section>

      {/* Product Modal - Lazy Loaded */}
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </main>
  )
}

