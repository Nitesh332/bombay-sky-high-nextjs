import Link from 'next/link'
import type { Metadata } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { locations, getLocationsByRegion } from '@/lib/locations'

export const metadata: Metadata = {
  title: 'Scaffolding Services Across Mumbai & MMR | All Locations | Bombay Sky High',
  description:
    'Bombay Sky High provides scaffolding services across Mumbai, Thane, Navi Mumbai, and MMR region. Find scaffolding supply, rental, and manufacturing services in your area. 25+ locations served.',
  keywords: [
    'scaffolding Mumbai',
    'scaffolding Thane',
    'scaffolding Navi Mumbai',
    'scaffolding MMR',
    'scaffolding supplier locations',
    'scaffolding near me',
    'scaffolding company Mumbai',
    'Bombay Sky High locations',
  ],
  openGraph: {
    title: 'Scaffolding Services Across Mumbai & MMR | Bombay Sky High',
    description:
      'Find Bombay Sky High scaffolding services in your area. We serve 25+ locations across Mumbai, Thane, Navi Mumbai, and MMR region.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Bombay Sky High',
  },
  alternates: {
    canonical: '/locations',
  },
}

const regions = [
  'South Mumbai',
  'Western Suburbs',
  'Central Mumbai',
  'Eastern Suburbs',
  'Thane & MMR',
] as const

export default function LocationsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark to-dark-light text-white pt-36 pb-16 px-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-[1200px] mx-auto text-center">
          <span className="inline-block bg-primary/20 text-primary px-5 py-2 rounded-full text-sm mb-6 border border-primary/30">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
            {locations.length}+ Locations Served
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight">
            Scaffolding Services Across Mumbai & MMR Region
          </h1>
          <p className="text-lg text-slate-300 mb-8 max-w-[700px] mx-auto">
            Bombay Sky High provides premium scaffolding manufacturing, supply, and rental 
            services across Mumbai, Thane, Navi Mumbai, and the entire Mumbai Metropolitan Region.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
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
              <FontAwesomeIcon icon={faPhone} /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Locations by Region */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-[1200px] mx-auto">
          {regions.map((region) => {
            const regionLocations = getLocationsByRegion(region)
            if (regionLocations.length === 0) return null

            return (
              <div key={region} className="mb-12 last:mb-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="icon-gradient w-10 h-10 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white" />
                  </div>
                  <h2 className="text-2xl text-dark font-bold">{region}</h2>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">
                    {regionLocations.length} locations
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {regionLocations.map((location) => (
                    <Link
                      key={location.slug}
                      href={`/locations/${location.slug}`}
                      className="bg-slate-50 p-4 rounded-lg hover:bg-primary/5 hover:border-primary/20 border border-transparent transition-all group"
                    >
                      <h3 className="text-dark font-semibold group-hover:text-primary transition-colors">
                        {location.name}
                      </h3>
                      <p className="text-slate-400 text-sm">{location.pincode}</p>
                      <span className="text-primary text-sm inline-flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* All Locations Grid */}
      <section className="py-16 px-5 bg-slate-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Complete Coverage
            </span>
            <h2 className="text-3xl text-dark font-bold mb-4">
              All Scaffolding Service Locations
            </h2>
            <p className="text-slate-500 text-lg max-w-[600px] mx-auto">
              Click on any location to view detailed scaffolding services available in that area
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-slate-100"
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary mb-2" />
                <h3 className="text-dark font-medium text-sm">{location.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl text-dark font-bold mb-4">
              Scaffolding Services Available at All Locations
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Scaffolding Manufacturing',
                desc: 'In-house manufacturing of Cuplock scaffolding, MS scaffolding, adjustable props, and all scaffolding components with strict quality control.',
              },
              {
                title: 'Scaffolding Supply',
                desc: 'Ready stock of all scaffolding products with quick delivery to your construction site. Bulk orders and wholesale pricing available.',
              },
              {
                title: 'Rental Scaffolding',
                desc: 'Flexible scaffolding rental options for short-term and long-term projects. Cost-effective solutions for budget-conscious projects.',
              },
            ].map((service, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-xl text-dark font-semibold mb-3">{service.title}</h3>
                <p className="text-slate-500">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-gradient py-20 px-5 text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-3xl text-white font-bold mb-4">
            Can&apos;t Find Your Location?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            We deliver scaffolding across the entire Mumbai Metropolitan Region. 
            Contact us to check availability in your area and get a free quote.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/contact"
              className="bg-white text-dark px-7 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faEnvelope} /> Contact Us
            </Link>
            <a
              href="tel:+917039683427"
              className="bg-transparent text-white px-7 py-4 rounded-lg font-semibold border-2 border-white inline-flex items-center gap-2 transition-all hover:bg-white hover:text-dark"
            >
              <FontAwesomeIcon icon={faPhone} /> +91 70396 83427
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
