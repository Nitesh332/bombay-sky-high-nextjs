# Bombay Sky High - Next.js

A modern scaffolding company website built with Next.js 14, TypeScript, and Tailwind CSS.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Project Structure

```
bombay-sky-high-nextjs/
├── app/
│   ├── layout.tsx          # Root layout with Navbar & Footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles + Tailwind
│   ├── products/
│   │   └── page.tsx        # Products page
│   └── contact/
│       └── page.tsx        # Contact page
├── components/
│   ├── Navbar.tsx          # Navigation component
│   ├── Footer.tsx          # Footer component
│   ├── ProductCard.tsx     # Product card component
│   ├── FeatureCard.tsx     # Feature card component
│   ├── TestimonialCard.tsx # Testimonial card component
│   ├── FaqItem.tsx         # FAQ accordion component
│   └── ContactCard.tsx     # Contact info card component
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Features

- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 📱 **Responsive Design** - works on all devices
- 🔍 **Product Search** - filter products in real-time
- 📝 **Contact Form** - with form validation
- ❓ **FAQ Accordion** - interactive FAQ section
- 🎯 **SEO Optimized** - with proper meta tags
- 🖼️ **Image Optimization** - using Next.js Image component

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Font Awesome Icons
