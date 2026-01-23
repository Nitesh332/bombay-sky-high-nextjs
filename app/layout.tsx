import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Font Awesome Configuration
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const metadata: Metadata = {
  metadataBase: new URL('https://bombayskyhigh.com'),
  title: {
    default: 'Bombay Sky High | Scaffolding Manufacturer & Supplier in Thane, Mumbai',
    template: '%s | Bombay Sky High',
  },
  description:
    'Bombay Sky High - Leading scaffolding manufacturer and supplier in Thane, Navi Mumbai, Kalyan-Dombivli. Cuplock scaffolding, MS scaffolding, rental services across MMR.',
  keywords: [
    'scaffolding manufacturer',
    'scaffolding supplier Thane',
    'scaffolding Navi Mumbai',
    'cuplock scaffolding',
    'MS scaffolding',
    'rental scaffolding',
    'scaffolding Kalyan Dombivli',
    'Bombay Sky High',
  ],
  authors: [{ name: 'Bombay Sky High' }],
  creator: 'Bombay Sky High',
  publisher: 'Bombay Sky High',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Bombay Sky High',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
