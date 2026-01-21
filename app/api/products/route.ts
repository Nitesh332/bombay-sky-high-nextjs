import { NextRequest, NextResponse } from 'next/server'
import { getAllProducts, getAllProductTitles, productCategories } from '@/lib/products'

/**
 * GET /api/products
 * 
 * Retrieves products data. Supports the following query parameters:
 * - titles: boolean - If true, returns only product titles (for dropdowns)
 * - category: string - Filter products by category ID
 * 
 * Examples:
 * - GET /api/products - Returns all products with full details
 * - GET /api/products?titles=true - Returns only product titles
 * - GET /api/products?category=scaffolding-products - Returns products in category
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const titlesOnly = searchParams.get('titles') === 'true'
    const category = searchParams.get('category')

    // Return only titles for dropdown
    if (titlesOnly) {
      const titles = getAllProductTitles()
      return NextResponse.json({
        success: true,
        data: titles,
        count: titles.length,
      })
    }

    // Filter by category if specified
    if (category) {
      const categoryData = productCategories.find(cat => cat.id === category)
      if (!categoryData) {
        return NextResponse.json(
          { success: false, error: 'Category not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({
        success: true,
        data: categoryData.products,
        category: {
          id: categoryData.id,
          title: categoryData.title,
          badge: categoryData.badge,
        },
        count: categoryData.products.length,
      })
    }

    // Return all products
    const products = getAllProducts()
    return NextResponse.json({
      success: true,
      data: products,
      categories: productCategories.map(cat => ({
        id: cat.id,
        title: cat.title,
        badge: cat.badge,
        productCount: cat.products.length,
      })),
      count: products.length,
    })
  } catch (error) {
    console.error('GET /api/products error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
