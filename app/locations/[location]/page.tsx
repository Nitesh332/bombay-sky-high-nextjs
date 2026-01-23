import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faCheckCircle,
  faArrowRight,
  faIndustry,
  faTruckFast,
  faShieldAlt,
  faTools,
  faWarehouse,
  faCertificate,
  faBuilding,
  faHardHat,
} from '@fortawesome/free-solid-svg-icons'
import {
  locations,
  getLocationBySlug,
  getAllLocationSlugs,
  getRelatedLocations,
  type LocationData,
} from '@/lib/locations'

// Generate static params for all locations
export async function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({
    location: slug,
  }))
}

// Generate dynamic metadata for each location
export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>
}): Promise<Metadata> {
  const { location: slug } = await params
  const locationData = getLocationBySlug(slug)

  if (!locationData) {
    return {
      title: 'Location Not Found | Bombay Sky High',
      description: 'The requested location page was not found.',
    }
  }

  const { name, region, nearbyAreas, description } = locationData

  const title = `Scaffolding in ${name} | Scaffolding Manufacturer & Supplier | Bombay Sky High`
  const metaDescription = `Looking for scaffolding in ${name}? Bombay Sky High is a leading scaffolding manufacturer & supplier in ${name}, ${region}. Cuplock scaffolding, MS scaffolding, rental services. Serving ${nearbyAreas.slice(0, 3).join(', ')}. Call now!`

  return {
    title,
    description: metaDescription,
    keywords: [
      `scaffolding ${name}`,
      `scaffolding supplier ${name}`,
      `scaffolding manufacturer ${name}`,
      `cuplock scaffolding ${name}`,
      `MS scaffolding ${name}`,
      `rental scaffolding ${name}`,
      `scaffolding on rent ${name}`,
      `construction scaffolding ${region}`,
      `scaffolding company ${name}`,
      'Bombay Sky High',
      ...nearbyAreas.map((area) => `scaffolding ${area}`),
    ],
    openGraph: {
      title: `Scaffolding Services in ${name} | Bombay Sky High`,
      description: metaDescription,
      type: 'website',
      locale: 'en_IN',
      siteName: 'Bombay Sky High',
      url: `/locations/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Scaffolding in ${name} | Bombay Sky High`,
      description: metaDescription,
    },
    alternates: {
      canonical: `/locations/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

// Services offered
const services = [
  {
    icon: faIndustry,
    title: 'Scaffolding Manufacturing',
    description: 'In-house manufacturing of high-quality scaffolding systems with strict quality control.',
  },
  {
    icon: faTruckFast,
    title: 'Scaffolding Supply',
    description: 'Reliable supply of scaffolding materials with quick delivery to your construction site.',
  },
  {
    icon: faWarehouse,
    title: 'Rental Scaffolding',
    description: 'Flexible scaffolding rental options for short-term and long-term project requirements.',
  },
  {
    icon: faShieldAlt,
    title: 'Cuplock Scaffolding',
    description: 'Premium Cuplock systems for fast assembly and superior safety on construction sites.',
  },
  {
    icon: faTools,
    title: 'MS Scaffolding',
    description: 'Heavy-duty MS scaffolding for industrial and commercial construction projects.',
  },
  {
    icon: faCertificate,
    title: 'Safety Compliance',
    description: 'All scaffolding products comply with Indian safety standards and regulations.',
  },
]

// Products offered
const products = [
  'Adjustable Steel Props',
  'Cuplock Scaffolding System',
  'H-Frame Scaffolding',
  'Steel Scaffolding Pipes',
  'Base Plates & U-Heads',
  'Scaffolding Couplers',
  'Scaffolding Planks',
  'Ladder Beam & Brackets',
]

export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>
}) {
  const { location: slug } = await params
  const locationData = getLocationBySlug(slug)

  if (!locationData) {
    notFound()
  }

  const {
    name,
    region,
    pincode,
    nearbyAreas,
    description,
    highlights,
    constructionTypes,
    landmarks,
  } = locationData

  const relatedLocations = getRelatedLocations(slug, 4)

  // JSON-LD structured data for local SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Bombay Sky High',
    description: `Scaffolding manufacturer and supplier in ${name}, ${region}`,
    url: `https://bombayskyhigh.com/locations/${slug}`,
    telephone: '+91-7039683427',
    email: 'info@bombayskyhigh.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: name,
      addressRegion: 'Maharashtra',
      postalCode: pincode,
      addressCountry: 'IN',
    },
    areaServed: [name, ...nearbyAreas],
    priceRange: '$$',
    openingHours: 'Mo-Sa 09:00-18:00',
    sameAs: [
      'https://www.facebook.com/bombayskyhigh',
      'https://www.instagram.com/bombayskyhigh',
    ],
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main itemScope itemType="https://schema.org/LocalBusiness">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-dark to-dark-light text-white pt-36 pb-20 px-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920')] bg-cover bg-center opacity-10" />
          <div className="relative max-w-[1200px] mx-auto">
            <div className="flex items-center gap-2 text-primary mb-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span className="text-sm font-medium">{region}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Scaffolding Manufacturer & Supplier in {name}
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-[800px]">
              Bombay Sky High is your trusted partner for premium scaffolding solutions in {name}. 
              We provide Cuplock scaffolding, MS scaffolding, rental scaffolding, and complete 
              scaffolding supply services for construction projects across {region}.
            </p>
            <div className="flex gap-4 flex-wrap mb-10">
              <Link
                href="/request-quote"
                className="btn-gradient text-dark px-7 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                <FontAwesomeIcon icon={faEnvelope} /> Get Free Quote
              </Link>
              <a
                href="tel:+917039683427"
                className="bg-transparent text-white px-7 py-4 rounded-lg font-semibold border-2 border-primary inline-flex items-center gap-2 transition-all hover:bg-primary/10"
              >
                <FontAwesomeIcon icon={faPhone} /> Call: +91 70396 83427
              </a>
            </div>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/locations" className="hover:text-primary transition-colors">
                    Locations
                  </Link>
                </li>
                <li>/</li>
                <li className="text-primary">{name}</li>
              </ol>
            </nav>
          </div>
        </section>

        {/* About Location Section */}
        <section className="py-16 px-5 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  Scaffolding Services in {name}
                </span>
                <h2 className="text-3xl text-dark font-bold mb-5">
                  Your Trusted Scaffolding Partner in {name}, {region}
                </h2>
                <p className="text-slate-500 text-lg mb-6 leading-relaxed">{description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-primary mt-1 flex-shrink-0"
                      />
                      <span className="text-slate-600">{highlight}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">
                    📍 Pincode: {pincode}
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">
                    🏗️ {region}
                  </span>
                </div>
              </div>
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
                  alt={`Scaffolding construction site in ${name} - Bombay Sky High`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-5 bg-slate-50">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                Our Services
              </span>
              <h2 className="text-3xl text-dark font-bold mb-4">
                Scaffolding Services We Offer in {name}
              </h2>
              <p className="text-slate-500 text-lg max-w-[700px] mx-auto">
                Complete scaffolding solutions for residential, commercial, and industrial 
                construction projects in {name} and surrounding areas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="icon-gradient w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={service.icon} className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl text-dark font-semibold mb-3">{service.title}</h3>
                  <p className="text-slate-500">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Construction Types Section */}
        <section className="py-16 px-5 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  Industry Expertise
                </span>
                <h2 className="text-3xl text-dark font-bold mb-5">
                  Construction Projects We Support in {name}
                </h2>
                <p className="text-slate-500 text-lg mb-6">
                  Our scaffolding solutions cater to diverse construction requirements in {name}. 
                  From residential buildings to industrial facilities, we have the expertise and 
                  inventory to support your project.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {constructionTypes.map((type, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg"
                    >
                      <FontAwesomeIcon icon={faBuilding} className="text-primary" />
                      <span className="text-slate-700 font-medium">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  Products Available
                </span>
                <h2 className="text-3xl text-dark font-bold mb-5">
                  Scaffolding Products in {name}
                </h2>
                <p className="text-slate-500 text-lg mb-6">
                  We maintain ready stock of all scaffolding products for quick delivery to 
                  construction sites in {name} and {nearbyAreas.slice(0, 2).join(', ')}.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {products.map((product, index) => (
                    <div key={index} className="flex items-center gap-2 text-slate-600">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-primary text-sm" />
                      <span>{product}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/products"
                  className="btn-gradient text-dark px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 mt-6 transition-all hover:-translate-y-0.5"
                >
                  View All Products <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Areas Section */}
        <section className="py-16 px-5 bg-slate-50">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                Service Coverage
              </span>
              <h2 className="text-3xl text-dark font-bold mb-4">
                Areas Near {name} We Serve
              </h2>
              <p className="text-slate-500 text-lg max-w-[600px] mx-auto">
                Our scaffolding delivery and services extend to all nearby areas around {name}.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-[800px] mx-auto mb-8">
              {nearbyAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg text-center shadow-sm border border-slate-100"
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary mb-2" />
                  <p className="text-dark font-medium">{area}</p>
                </div>
              ))}
            </div>
            {landmarks.length > 0 && (
              <div className="text-center">
                <p className="text-slate-500">
                  <strong>Key Landmarks:</strong> {landmarks.join(' • ')}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-5 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                Why Bombay Sky High
              </span>
              <h2 className="text-3xl text-dark font-bold mb-4">
                Why Choose Us for Scaffolding in {name}?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: faHardHat,
                  title: '15+ Years Experience',
                  desc: 'Trusted scaffolding expertise in MMR region',
                },
                {
                  icon: faTruckFast,
                  title: 'Fast Delivery',
                  desc: `Quick delivery to ${name} construction sites`,
                },
                {
                  icon: faShieldAlt,
                  title: 'Quality Assured',
                  desc: 'ISO certified scaffolding products',
                },
                {
                  icon: faTools,
                  title: 'Technical Support',
                  desc: 'Expert guidance for your projects',
                },
              ].map((item, index) => (
                <div key={index} className="text-center p-6">
                  <div className="icon-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={item.icon} className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg text-dark font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Locations Section */}
        <section className="py-16 px-5 bg-slate-50">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl text-dark font-bold mb-4">
                Scaffolding Services in Other Locations
              </h2>
              <p className="text-slate-500">
                We also provide scaffolding services across Mumbai and MMR region
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="bg-white p-5 rounded-lg text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-slate-100"
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary mb-2" />
                  <h3 className="text-dark font-semibold">{loc.name}</h3>
                  <p className="text-slate-400 text-sm">{loc.region}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/locations"
                className="text-primary font-semibold inline-flex items-center gap-2 hover:underline"
              >
                View All Locations <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-gradient py-20 px-5 text-center">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-3xl text-white font-bold mb-4">
              Need Scaffolding in {name}?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Get in touch with Bombay Sky High for a free quote on scaffolding products 
              and rental services in {name}, {region}. Fast delivery and competitive prices guaranteed!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/request-quote"
                className="bg-white text-dark px-7 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <FontAwesomeIcon icon={faEnvelope} /> Request Free Quote
              </Link>
              <a
                href="tel:+917039683427"
                className="bg-transparent text-white px-7 py-4 rounded-lg font-semibold border-2 border-white inline-flex items-center gap-2 transition-all hover:bg-white hover:text-dark"
              >
                <FontAwesomeIcon icon={faPhone} /> Call: +91 70396 83427
              </a>
            </div>
          </div>
        </section>

        {/* Local SEO Content */}
        <section className="py-12 px-5 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl text-dark font-bold mb-4">
                About Scaffolding Services in {name}
              </h2>
              <p className="text-slate-500 mb-4">
                Bombay Sky High is a leading scaffolding manufacturer and supplier serving {name} and 
                the entire {region} area. With over 15 years of experience in the construction industry, 
                we have established ourselves as the go-to scaffolding company for builders, contractors, 
                and construction companies in {name}.
              </p>
              <p className="text-slate-500 mb-4">
                Our comprehensive range of scaffolding products includes Cuplock scaffolding systems, 
                MS scaffolding, adjustable steel props, H-frame scaffolding, and all scaffolding 
                accessories. Whether you need scaffolding for a residential building in {name}, 
                a commercial complex near {nearbyAreas[0]}, or an industrial project in the {region} 
                region, we have the right solutions for you.
              </p>
              <p className="text-slate-500">
                We offer both scaffolding sales and rental options to suit your project requirements 
                and budget. Our team ensures timely delivery to construction sites across {name}, 
                {nearbyAreas.slice(0, 3).join(', ')}, and other nearby areas. Contact Bombay Sky High 
                today for the best scaffolding solutions in {name}!
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
