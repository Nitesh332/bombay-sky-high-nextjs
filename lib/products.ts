/**
 * Centralized Product Data
 * 
 * This file contains all product data in a single location.
 * When adding a new product, simply add it to the appropriate category below.
 * The product will automatically appear in:
 * - Products page
 * - Request a Quote dropdown
 * - API responses
 */

export interface Product {
  id: string
  title: string
  description: string
  image: string
  badge?: string
  price?: string
  category: string
}

export interface ProductCategory {
  id: string
  title: string
  badge?: string
  icon: string
  products: Product[]
}

// Helper function to generate product ID from title
const generateId = (title: string): string => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// All products organized by category
export const productCategories: ProductCategory[] = [
  {
    id: 'scaffolding-products',
    title: '🧱 Scaffolding Products',
    badge: 'Main Products',
    icon: 'faCubes',
    products: [
      { id: generateId('Scaffolding Tie Rod'), title: 'Scaffolding Tie Rod', description: 'High-strength tie rods for secure scaffolding connections.', image: '/images/Scaffolding-Tie-Rod.png', category: 'scaffolding-products' },
      { id: generateId('Adjustable Steel Props'), title: 'Adjustable Steel Props', description: 'Heavy-duty adjustable props for construction support.', image: '/images/AdjustableSteelProps.jpg', category: 'scaffolding-products' },
      { id: generateId('Push Pull Prop'), title: 'Push Pull Prop', description: 'Versatile push-pull props for wall alignment.', image: '/images/push-pull-prop.jpg', category: 'scaffolding-products' },
      { id: generateId('Steel Scaffolding Parts'), title: 'Steel Scaffolding Parts', description: 'Complete range of steel scaffolding components.', image: '/images/Steel-Scaffolding-Parts-images.jpg', category: 'scaffolding-products' },
      { id: generateId('SB Make MS Adjustable Props'), title: 'SB Make MS Adjustable Props', description: 'Premium quality MS adjustable props by SB.', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop', category: 'scaffolding-products' },
      { id: generateId('Telescopic Steel Props'), title: 'Telescopic Steel Props', description: 'Telescopic props with extended height adjustment.', image: '/images/telescopic-steel-props.jpg', category: 'scaffolding-products' },
      { id: generateId('Cuplock Scaffolding System'), title: 'Cuplock Scaffolding System', description: 'Fast and secure cuplock scaffolding system.', image: '/images/cuplok-system.jpg', category: 'scaffolding-products' },
      { id: generateId('Steel Scaffolding Pipe'), title: 'Steel Scaffolding Pipe', description: 'Durable MS pipes for scaffolding structures.', image: '/images/steel-scaffolding-pipes.jpg', category: 'scaffolding-products' },
      { id: generateId('Cup Lock System'), title: 'Cup Lock System', description: 'Reliable cup lock system for quick assembly.', image: '/images/CapLockSystem.jpg', category: 'scaffolding-products' },
      { id: generateId('Scaffolding Shuttering Clamps'), title: 'Scaffolding Shuttering Clamps', description: 'Heavy-duty clamps for shuttering applications.', image: '/images/scaffolding-shuttering-clamps.jpg', category: 'scaffolding-products' },
      { id: generateId('Tubular Steel Scaffolding'), title: 'Tubular Steel Scaffolding', description: 'Standard tubular steel scaffolding systems.', image: '/images/tubular-steel-scaffolding.jpg', category: 'scaffolding-products' },
      { id: generateId('Steel Adjustable Props'), title: 'Steel Adjustable Props', description: 'Industrial-grade steel adjustable props.', image: '/images/steel-adjustable-props.jpg', category: 'scaffolding-products' },
    ],
  },
  {
    id: 'material-rental',
    title: '📦 Scaffolding Material & Rental',
    icon: 'faTruck',
    products: [
      { id: generateId('Scaffolding Rental Service'), title: 'Scaffolding Rental Service', description: 'Complete scaffolding rental solutions.', image: '/images/scaffolding-rental-service.jpg', category: 'material-rental' },
      { id: generateId('Scaffolding Steel Clamp'), title: 'Scaffolding Steel Clamp', description: 'High-quality steel clamps for scaffolding.', image: '/images/scaffolding-steel-clamp.jpg', category: 'material-rental' },
      { id: generateId('Steel Erect Scaffolding'), title: 'Steel Erect Scaffolding', description: 'Ready-to-erect steel scaffolding systems.', image: '/images/steel-erect-scaffolding.jpg', category: 'material-rental' },
      { id: generateId('Scaffolding Products on Hire'), title: 'Scaffolding Products on Hire', description: 'Wide range of scaffolding for hire.', image: '/images/scaffolding-products-on-hire.jpg', category: 'material-rental' },
      { id: generateId('Adjustable U-Jack'), title: 'Adjustable U-Jack', description: 'U-head jacks for beam support.', image: '/images/adjustable-u-jack.jpg', category: 'material-rental' },
      { id: generateId('Commercial Construction Scaffolding'), title: 'Commercial Construction Scaffolding', description: 'Scaffolding for commercial projects.', image: '/images/commercial-construction-scaffolding.jpg', category: 'material-rental' },
    ],
  },
  {
    id: 'fittings',
    title: '🧩 Scaffolding Fittings',
    icon: 'faCogs',
    products: [
      { id: generateId('Scaffolding Clamps Fittings'), title: 'Scaffolding Clamps Fittings', description: 'Premium scaffolding clamp fittings.', image: '/images/scaffolding-clamps-fittings.jpg', category: 'fittings' },
      { id: generateId('Pipe Clamp Fittings Scaffolding'), title: 'Pipe Clamp Fittings Scaffolding', description: 'Pipe clamps for secure connections.', image: '/images/pipe-clamp-fittings-scaffolding.jpg', category: 'fittings' },
      { id: generateId('Waller Plate with Wing Nut'), title: 'Waller Plate with Wing Nut', description: 'Waller plates with wing nuts included.', image: '/images/waller-plate-with-wing-nut.jpg', category: 'fittings' },
    ],
  },
  {
    id: 'props-rental',
    title: '🪛 Scaffolding Props Rental',
    icon: 'faTools',
    products: [
      { id: generateId('Scaffolding Shoring Prop'), title: 'Scaffolding Shoring Prop', description: 'Heavy-duty shoring props available.', image: '/images/scaffolding-shoring-prop.jpg', category: 'props-rental' },
      { id: generateId('Centering MS Props'), title: 'Centering MS Props', description: 'MS props for centering applications.', image: '/images/centering-ms-props.jpg', category: 'props-rental' },
      { id: generateId('MS Scaffolding Props'), title: 'MS Scaffolding Props', description: 'Quality MS scaffolding props on rent.', image: '/images/ms-scaffolding-props.jpg', category: 'props-rental' },
    ],
  },
  {
    id: 'formwork',
    title: '🏗️ Form Work (Accessories)',
    icon: 'faBuilding',
    products: [
      { id: generateId('Aluminium Formwork Accessories'), title: 'Aluminium Formwork Accessories', description: 'Complete aluminium formwork accessories.', image: '/images/aluminium-formwork-accessories.jpg', category: 'formwork' },
      { id: generateId('Modular Aluminium Form Work'), title: 'Modular Aluminium Form Work', description: 'Modular aluminium formwork systems.', image: '/images/modular-aluminium-form-work.jpg', category: 'formwork' },
      { id: generateId('Aluminium Formwork System'), title: 'Aluminium Formwork System', description: 'Complete aluminium formwork solutions.', image: '/images/aluminium-formwork-system.jpg', category: 'formwork' },
    ],
  },
  {
    id: 'h-frames',
    title: '🪜 H Frames & Scaffolding',
    icon: 'faBorderAll',
    products: [
      { id: generateId('MS Aluminium Composite Tower'), title: 'MS Aluminium Composite Tower', description: 'MS aluminium composite scaffold towers.', image: '/images/ms-aluminium-composite-tower.jpg', category: 'h-frames' },
      { id: generateId('H Frame Scaffolding'), title: 'H Frame Scaffolding', description: 'Easy-to-assemble H-frame systems.', image: '/images/h-frame-scaffolding.jpg', category: 'h-frames' },
      { id: generateId('Light Weight H Frame'), title: 'Light Weight H Frame', description: 'Lightweight H-frame scaffolding.', image: '/images/light-weight-h-frame.jpg', category: 'h-frames' },
    ],
  },
]

/**
 * Get all products as a flat array
 */
export function getAllProducts(): Product[] {
  return productCategories.flatMap(category => category.products)
}

/**
 * Get all product titles (for dropdown)
 */
export function getAllProductTitles(): string[] {
  return getAllProducts().map(product => product.title)
}

/**
 * Get product by title
 */
export function getProductByTitle(title: string): Product | undefined {
  return getAllProducts().find(
    product => product.title.toLowerCase() === title.toLowerCase()
  )
}

/**
 * Get product by ID
 */
export function getProductById(id: string): Product | undefined {
  return getAllProducts().find(product => product.id === id)
}

/**
 * Get products by category
 */
export function getProductsByCategory(categoryId: string): Product[] {
  const category = productCategories.find(cat => cat.id === categoryId)
  return category?.products || []
}

/**
 * Get category labels for navigation
 */
export function getCategoryLabels() {
  return productCategories.map(cat => ({
    id: cat.id,
    label: cat.title.replace(/^[^\s]+\s/, ''), // Remove emoji prefix
    icon: cat.icon,
  }))
}
