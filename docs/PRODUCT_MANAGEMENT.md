# Product Management & Quote Request System Guide

This document provides a comprehensive guide for managing products and the Request a Quote functionality in the Bombay Sky High website.

## Table of Contents

1. [System Overview](#system-overview)
2. [Adding a New Product](#adding-a-new-product)
3. [Product to Quote Form Mapping](#product-to-quote-form-mapping)
4. [Product Dropdown Auto-Population](#product-dropdown-auto-population)
5. [API Reference](#api-reference)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## System Overview

### Architecture

The product management system follows a **centralized data pattern**:

```
lib/products.ts          ← Single source of truth for all products
    ↓
app/products/page.tsx    ← Products listing page (reads from lib/products.ts)
    ↓
app/request-quote/page.tsx ← Quote form with product dropdown
    ↓
app/api/products/route.ts  ← API for fetching products
    ↓
app/api/callback/route.ts  ← API for submitting quote requests
```

### Key Files

| File | Purpose |
|------|---------|
| `lib/products.ts` | **Central product database** - All products are defined here |
| `app/products/page.tsx` | Products listing page with search and categories |
| `app/request-quote/page.tsx` | Quote request form with auto-filled product |
| `app/api/products/route.ts` | REST API to fetch products |
| `app/api/callback/route.ts` | API to submit quote requests |
| `models/Callback.ts` | MongoDB schema for quote requests |
| `components/ProductModal.tsx` | Product detail modal with "Request Quote" button |

---

## Adding a New Product

### Step 1: Open the Products Data File

Navigate to: `lib/products.ts`

### Step 2: Find the Appropriate Category

Products are organized by category. Find the category where your new product belongs:

```typescript
export const productCategories: ProductCategory[] = [
  {
    id: 'scaffolding-products',    // Category ID
    title: '🧱 Scaffolding Products', // Display title
    badge: 'Main Products',          // Optional badge
    icon: 'faCubes',                 // FontAwesome icon
    products: [                      // ← Add your product here
      // ... existing products
    ],
  },
  // ... more categories
]
```

### Step 3: Add the New Product

Add a new product object to the `products` array:

```typescript
{
  id: generateId('Your Product Name'),  // Auto-generates URL-safe ID
  title: 'Your Product Name',           // Display name (REQUIRED)
  description: 'Product description',   // Short description (REQUIRED)
  image: 'https://example.com/image.jpg', // Image URL (REQUIRED)
  category: 'scaffolding-products',     // Must match parent category ID
  badge: 'New',                         // Optional badge (e.g., "New", "Popular")
  price: '₹2,500'                       // Optional price display
}
```

### Example: Adding a New Product

```typescript
// In lib/products.ts, find the scaffolding-products category and add:

{
  id: generateId('Heavy Duty Scaffold Wheels'),
  title: 'Heavy Duty Scaffold Wheels',
  description: 'Industrial-grade wheels for mobile scaffolding with brake locks.',
  image: 'https://images.unsplash.com/photo-example?w=400&h=300&fit=crop',
  category: 'scaffolding-products',
  badge: 'New'
}
```

### Step 4: Save and Test

1. Save the file
2. The product will automatically appear in:
   - Products page listing
   - Search results
   - Request Quote dropdown
   - Products API response

---

## Product to Quote Form Mapping

### How It Works

When a user clicks "Request Quote" on a product:

1. **Product Modal** → Contains a "Request Quote" button
2. **Button Click** → Navigates to `/request-quote?product=ProductName`
3. **Quote Form** → Reads URL parameter and pre-fills the product dropdown

### Flow Diagram

```
[Product Card Click]
        ↓
[Product Modal Opens]
        ↓
[User Clicks "Request Quote"]
        ↓
[Navigate to: /request-quote?product=Adjustable%20Steel%20Props]
        ↓
[Quote Form Auto-Fills Product Field]
```

### Technical Implementation

In `components/ProductModal.tsx`:

```tsx
<a
  href={`/request-quote?product=${encodeURIComponent(product.title)}`}
  className="btn-gradient ..."
>
  Request Quote
</a>
```

In `app/request-quote/page.tsx`:

```tsx
const searchParams = useSearchParams()
const productParam = searchParams.get('product')

// Auto-fill form with URL parameter
const [formData, setFormData] = useState({
  // ...
  product: productParam || '',
})
```

---

## Product Dropdown Auto-Population

### How Products Are Loaded

The dropdown fetches products from the API on page load:

```tsx
// In app/request-quote/page.tsx
useEffect(() => {
  async function fetchProducts() {
    const response = await fetch('/api/products?titles=true')
    const data = await response.json()
    if (data.success) {
      setProducts(data.data) // Array of product titles
    }
  }
  fetchProducts()
}, [])
```

### Why Products Auto-Update

Since the API reads from `lib/products.ts`, any new product added to that file will:

1. **Automatically appear** in the dropdown
2. **No code changes needed** in the quote form
3. **No database updates required**

---

## API Reference

### GET /api/products

Fetch products data.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `titles` | boolean | If `true`, returns only product titles |
| `category` | string | Filter by category ID |

**Examples:**

```bash
# Get all products with full details
GET /api/products

# Get only product titles (for dropdowns)
GET /api/products?titles=true

# Get products in a specific category
GET /api/products?category=scaffolding-products
```

**Response (titles=true):**

```json
{
  "success": true,
  "data": [
    "Scaffolding Tie Rod",
    "Adjustable Steel Props",
    "Push Pull Prop"
  ],
  "count": 30
}
```

### POST /api/callback

Submit a quote request.

**Request Body:**

```json
{
  "name": "John Doe",
  "phone": "+91 9876543210",
  "email": "john@example.com",
  "message": "Need scaffolding for project",
  "product": "Adjustable Steel Props"
}
```

**Required Fields:** `name`, `phone`

**Response:**

```json
{
  "success": true,
  "message": "Callback request submitted successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "phone": "+91 9876543210",
    "email": "john@example.com",
    "message": "Need scaffolding for project",
    "product": "Adjustable Steel Props",
    "status": "pending",
    "createdAt": "2026-01-14T10:30:00.000Z"
  }
}
```

---

## Best Practices

### 1. Product Images

- **Recommended size:** 400x300 pixels
- **Format:** JPEG or WebP for best compression
- **Use CDN URLs** when possible for faster loading
- **Avoid very large images** - they slow down page load

### 2. Product Titles

- Keep titles **concise but descriptive**
- Use **consistent naming conventions**
- Avoid special characters that might break URLs

### 3. Categories

- **Don't create too many categories** - keep navigation simple
- Each category should have **at least 3 products**
- Use **clear, descriptive category names**

### 4. Adding New Categories

To add a new category:

```typescript
// In lib/products.ts
{
  id: 'new-category-id',
  title: '🔧 New Category Name',
  icon: 'faWrench',  // Must be imported in products page
  products: [
    // Add products here
  ],
}
```

Then update the icon mapping in `app/products/page.tsx`:

```typescript
import { faWrench } from '@fortawesome/free-solid-svg-icons'

const iconMap: Record<string, IconDefinition> = {
  // ... existing icons
  faWrench,
}
```

---

## Troubleshooting

### Product Not Showing in Dropdown

1. **Check `lib/products.ts`** - Is the product added correctly?
2. **Check category ID** - Does it match a valid category?
3. **Clear browser cache** and refresh the page
4. **Check browser console** for API errors

### Quote Form Not Submitting

1. **Check required fields** - Name and Phone are required
2. **Check phone format** - Must be at least 10 digits
3. **Check MongoDB connection** in `.env.local`
4. **Check server logs** for API errors

### Product Image Not Loading

1. **Verify image URL** is accessible
2. **Check for CORS issues** if using external images
3. **Try a different image host** (Unsplash, Cloudinary, etc.)

### Performance Issues

The products page is optimized with:
- **Memoized components** (`memo`, `useMemo`, `useCallback`)
- **Lazy-loaded modal** (`dynamic` import)
- **Lazy-loaded images** with blur placeholders
- **Optimized image sizes**

If still slow:
1. **Reduce image sizes** further
2. **Consider pagination** for large product lists
3. **Use a CDN** for images

---

## File Structure Reference

```
bombay-sky-high-nextjs/
├── app/
│   ├── api/
│   │   ├── callback/
│   │   │   └── route.ts      # Quote submission API
│   │   └── products/
│   │       └── route.ts      # Products fetch API
│   ├── products/
│   │   └── page.tsx          # Products listing page
│   └── request-quote/
│       └── page.tsx          # Quote request form
├── components/
│   ├── ProductModal.tsx      # Product details modal
│   ├── ProductCard.tsx       # Product card component
│   └── ProductGallery.tsx    # Product grid component
├── lib/
│   ├── products.ts           # ⭐ CENTRAL PRODUCT DATA
│   └── mongodb.ts            # Database connection
└── models/
    └── Callback.ts           # Quote request schema
```

---

## Quick Reference: Adding a Product

```typescript
// 1. Open lib/products.ts
// 2. Find the category
// 3. Add this object to the products array:

{
  id: generateId('Product Title'),
  title: 'Product Title',
  description: 'Brief product description.',
  image: 'https://your-image-url.com/image.jpg',
  category: 'category-id',
  // Optional:
  badge: 'New',
  price: '₹X,XXX'
}

// 4. Save the file - Done!
```

The product will automatically appear everywhere it needs to be. 🎉
