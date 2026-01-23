import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBox,
  faPhone,
  faShieldAlt,
  faTruckFast,
  faHandHoldingDollar,
  faTools,
  faHeadset,
  faCertificate,
  faCheckCircle,
  faEnvelope,
  faThLarge,
  faIndustry,
  faWarehouse,
  faMapMarkerAlt,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import FeatureCard from '@/components/FeatureCard'
import ProductCard from '@/components/ProductCard'
import TestimonialCard from '@/components/TestimonialCard'

// SEO Metadata for Homepage
export const metadata: Metadata = {
  title: 'Bombay Sky High | Scaffolding Manufacturer & Supplier in Thane, Mumbai',
  description:
    'Bombay Sky High is a leading scaffolding manufacturer and supplier in Thane, Navi Mumbai, Kalyan-Dombivli. We offer Cuplock scaffolding, MS scaffolding, rental scaffolding services across Ulhasnagar, Bhiwandi, Mira-Bhayandar, Vasai-Virar & Panvel.',
  keywords: [
    'scaffolding manufacturer Thane',
    'scaffolding supplier Navi Mumbai',
    'cuplock scaffolding Kalyan Dombivli',
    'MS scaffolding Ulhasnagar',
    'rental scaffolding Bhiwandi',
    'scaffolding supply Mira-Bhayandar',
    'scaffolding company Vasai-Virar',
    'scaffolding rental Panvel',
    'Bombay Sky High',
    'construction scaffolding Maharashtra',
  ],
  openGraph: {
    title: 'Bombay Sky High | Premium Scaffolding Solutions in Mumbai & Thane Region',
    description:
      'Leading scaffolding manufacturer and supplier serving Thane, Navi Mumbai, Kalyan-Dombivli, and surrounding areas. Quality Cuplock & MS scaffolding with rental options.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Bombay Sky High',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
}

// Service areas for local SEO
const serviceAreas = [
  'Thane',
  'Kalyan-Dombivli',
  'Navi Mumbai',
  'Ulhasnagar',
  'Bhiwandi-Nizampur',
  'Mira-Bhayandar',
  'Vasai-Virar',
  'Panvel',
]

// Core services offered
const services = [
  {
    icon: faIndustry,
    title: 'Scaffolding Manufacturing',
    description:
      'State-of-the-art manufacturing facility producing high-quality scaffolding systems. Our in-house production ensures consistent quality and competitive pricing for construction projects across Thane and Mumbai region.',
  },
  {
    icon: faTruckFast,
    title: 'Scaffolding Supply',
    description:
      'Reliable scaffolding supply services to Navi Mumbai, Kalyan-Dombivli, and surrounding areas. We maintain large inventory stocks for immediate dispatch to your construction site.',
  },
  {
    icon: faWarehouse,
    title: 'Rental Scaffolding',
    description:
      'Cost-effective scaffolding rental options for short-term and long-term projects in Ulhasnagar, Bhiwandi-Nizampur, and Mira-Bhayandar. Flexible rental plans to suit your project timeline.',
  },
  {
    icon: faShieldAlt,
    title: 'Cuplock Scaffolding',
    description:
      'Premium Cuplock scaffolding systems known for quick assembly and enhanced safety. Ideal for high-rise construction projects in Vasai-Virar and Panvel with superior load-bearing capacity.',
  },
  {
    icon: faTools,
    title: 'MS Scaffolding',
    description:
      'Heavy-duty MS (Mild Steel) scaffolding for industrial and commercial construction. Durable, rust-resistant, and engineered for maximum worker safety on challenging project sites.',
  },
  {
    icon: faCertificate,
    title: 'Quality Assurance',
    description:
      'All scaffolding products undergo rigorous quality testing and comply with Indian safety standards. ISO certified manufacturing ensures every product meets construction industry requirements.',
  },
]

const featuredProducts = [
  {
    title: 'Adjustable Steel Props',
    description: 'Heavy-duty adjustable props for reliable construction support in Thane & Mumbai',
    image: '/images/AdjustableSteelProps.jpg',
    badge: 'Best Seller',
  },
  {
    title: 'Cuplock Scaffolding System',
    description: 'Fast assembly cuplock system for high-rise projects in Navi Mumbai',
    image: '/images/cuplok-system.jpg',
    badge: 'Popular',
  },
  {
    title: 'Steel Scaffolding Pipes',
    description: 'Durable MS pipes for sturdy scaffolding structures in Kalyan-Dombivli',
    image: '/images/steel-scaffolding-pipes.jpg',
  },
  {
    title: 'H-Frame Scaffolding',
    description: 'Easy-to-assemble H-frame systems for construction in Vasai-Virar',
    image: '/images/h-frame-scaffolding.jpg',
  },
]

const testimonials = [
  {
    text: 'Bombay Sky High has been our trusted scaffolding partner for 5 years. Their quality products and timely delivery to our Thane project site have never disappointed us. Highly recommended for any construction company!',
    authorName: 'Rajesh Sharma',
    authorRole: 'Project Manager, ABC Constructions, Thane',
    initials: 'RS',
  },
  {
    text: 'Excellent rental scaffolding services and competitive pricing. The team delivered to our Navi Mumbai site promptly and provided great technical support. Best scaffolding supplier in the Mumbai metropolitan region!',
    authorName: 'Priya Kapoor',
    authorRole: 'Director, Kapoor Builders, Navi Mumbai',
    initials: 'PK',
  },
  {
    text: 'We ordered cuplock scaffolding for our high-rise project in Kalyan. The quality exceeded our expectations and the support team was incredibly helpful throughout the entire project duration.',
    authorName: 'Amit Mehta',
    authorRole: 'CEO, Skyline Infrastructure, Kalyan-Dombivli',
    initials: 'AM',
  },
]

// Why choose us features
const whyChooseUs = [
  {
    icon: faShieldAlt,
    title: 'Premium Quality Materials',
    description:
      'All scaffolding products manufactured using high-grade steel with rigorous quality checks ensuring maximum safety and durability for construction sites.',
  },
  {
    icon: faTruckFast,
    title: 'Fast Delivery Across MMR',
    description:
      'Efficient logistics network ensuring timely delivery to Thane, Navi Mumbai, Kalyan-Dombivli, Ulhasnagar, Bhiwandi, and all Mumbai Metropolitan Region areas.',
  },
  {
    icon: faHandHoldingDollar,
    title: 'Competitive Pricing',
    description:
      'Best value scaffolding solutions with transparent pricing. Both purchase and rental options available to suit your project budget and requirements.',
  },
  {
    icon: faHeadset,
    title: 'Expert Technical Support',
    description:
      'Experienced team providing technical guidance to help you choose the right scaffolding solutions. Available for site visits and consultations.',
  },
]

export default function HomePage() {
  return (
    <main itemScope itemType="https://schema.org/LocalBusiness">
      <meta itemProp="name" content="Bombay Sky High" />
      <meta itemProp="description" content="Leading scaffolding manufacturer and supplier in Thane, Mumbai region" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark to-dark-light text-white pt-40 pb-24 px-5 text-center relative overflow-hidden hero-pattern">
        <div className="relative max-w-[900px] mx-auto">
          <span className="inline-block bg-primary/20 text-primary px-5 py-2 rounded-full text-sm mb-6 border border-primary/30">
            🏆 Trusted Scaffolding Manufacturer in Thane & Mumbai Region
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight">
            Leading Scaffolding Manufacturer & Supplier
          </h1>
          <p className="text-lg text-slate-350 mb-9 max-w-[700px] mx-auto">
            Bombay Sky High is your trusted partner for premium Cuplock scaffolding, MS scaffolding, 
            and rental scaffolding services. Serving construction projects across Thane, Kalyan-Dombivli, 
            Navi Mumbai, Ulhasnagar, Bhiwandi-Nizampur, Mira-Bhayandar, Vasai-Virar & Panvel.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            <Link
              href="/products"
              className="btn-gradient text-dark px-7 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <FontAwesomeIcon icon={faBox} /> View Products
            </Link>
            <Link
              href="/request-quote"
              className="bg-transparent text-white px-7 py-4 rounded-lg font-semibold border-2 border-primary inline-flex items-center gap-2 transition-all hover:bg-primary/10"
            >
              <FontAwesomeIcon icon={faPhone} /> Get Free Quote
            </Link>
          </div>
          <div className="flex justify-center gap-8 md:gap-16 flex-wrap pt-10 border-t border-white/10">
            <div className="text-center">
              <span className="block text-3xl md:text-4xl font-extrabold text-primary">15+</span>
              <span className="text-sm text-slate-350">Years Experience</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl md:text-4xl font-extrabold text-primary">500+</span>
              <span className="text-sm text-slate-350">Projects Completed</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl md:text-4xl font-extrabold text-primary">8+</span>
              <span className="text-sm text-slate-350">Cities Served</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl md:text-4xl font-extrabold text-primary">10K+</span>
              <span className="text-sm text-slate-350">Products Delivered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-5 bg-white" id="services" aria-labelledby="services-heading">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Our Scaffolding Services
          </span>
          <h2 id="services-heading" className="text-3xl text-dark mb-4">
            Comprehensive Scaffolding Solutions for Construction Projects
          </h2>
          <p className="text-slate-450 text-lg max-w-[700px] mx-auto">
            From manufacturing to supply and rental, Bombay Sky High offers end-to-end scaffolding 
            services across Thane, Navi Mumbai, and the entire Mumbai Metropolitan Region.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {services.map((service, index) => (
            <FeatureCard key={index} {...service} />
          ))}
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-16 px-5 bg-slate-50" aria-labelledby="areas-heading">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Areas We Serve
            </span>
            <h2 id="areas-heading" className="text-3xl text-dark mb-4">
              Scaffolding Supply & Rental Services Across Mumbai Metropolitan Region
            </h2>
            <p className="text-slate-450 text-lg max-w-[700px] mx-auto">
              Bombay Sky High delivers premium scaffolding solutions to construction sites throughout 
              Thane district and surrounding cities with prompt delivery and installation support.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-[900px] mx-auto">
            {serviceAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow border border-slate-100"
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary mb-2" />
                <h3 className="text-dark font-semibold text-sm md:text-base">{area}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-5 bg-white text-center" aria-labelledby="products-heading">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Our Products
          </span>
          <h2 id="products-heading" className="text-3xl text-dark mb-4">
            Premium Scaffolding Products for Every Construction Need
          </h2>
          <p className="text-slate-450 text-lg max-w-[600px] mx-auto">
            Explore our range of high-quality Cuplock scaffolding, MS scaffolding, adjustable props, 
            and scaffolding accessories available for purchase and rental.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto px-5 md:px-10 mb-10">
          {featuredProducts.map((product, index) => (
            <ProductCard key={index} {...product} showLink />
          ))}
        </div>
        <Link
          href="/products"
          className="btn-gradient text-dark px-7 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-all hover:-translate-y-0.5"
        >
          <FontAwesomeIcon icon={faThLarge} /> View All Scaffolding Products
        </Link>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-5 bg-slate-50" id="why-choose-us" aria-labelledby="why-heading">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Why Bombay Sky High
            </span>
            <h2 id="why-heading" className="text-3xl text-dark mb-4">
              Trusted Scaffolding Partner for Construction Companies
            </h2>
            <p className="text-slate-450 text-lg max-w-[700px] mx-auto">
              With over 15 years of experience serving the Mumbai Metropolitan Region, we understand 
              what construction projects need for safe and efficient scaffolding solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-5">
                  <div className="icon-gradient w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={item.icon} className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl text-dark font-semibold mb-3">{item.title}</h3>
                    <p className="text-slate-450 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-5 bg-white" id="about" aria-labelledby="about-heading">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-[1200px] mx-auto items-center">
          <div>
            <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              About Bombay Sky High
            </span>
            <h2 id="about-heading" className="text-3xl text-dark mb-5">
              Your Reliable Scaffolding Manufacturing Partner Since 2010
            </h2>
            <p className="text-slate-450 text-lg mb-6 leading-7">
              Bombay Sky High is a premier scaffolding manufacturer and supplier based in the Mumbai 
              Metropolitan Region. With over 15 years of experience, we have established ourselves 
              as a trusted partner for construction companies, contractors, and builders across Thane, 
              Navi Mumbai, Kalyan-Dombivli, and surrounding areas.
            </p>
            <p className="text-slate-450 text-lg mb-6 leading-7">
              Our manufacturing facility produces high-quality Cuplock scaffolding, MS scaffolding, 
              and adjustable props that meet Indian safety standards. Whether you need scaffolding 
              for a residential project in Mira-Bhayandar or a commercial high-rise in Panvel, 
              we have the right solutions for your construction needs.
            </p>
            <ul className="list-none mb-8 space-y-3">
              {[
                'ISO Certified Manufacturing Facility',
                'Delivery Across Mumbai Metropolitan Region',
                'Technical Support & Site Consultation',
                'Flexible Purchase & Rental Options',
              ].map((item, index) => (
                <li key={index} className="py-2 text-slate-550">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-primary mr-3" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="btn-gradient text-dark px-7 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              Contact Our Team <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
              alt="Scaffolding construction site in Thane Mumbai region - Bombay Sky High"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-5 bg-slate-50" aria-labelledby="testimonials-heading">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Client Testimonials
          </span>
          <h2 id="testimonials-heading" className="text-3xl text-dark mb-4">
            What Construction Companies Say About Us
          </h2>
          <p className="text-slate-450 text-lg max-w-[600px] mx-auto">
            Trusted by leading builders and contractors across Thane, Navi Mumbai, and MMR region
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-gradient py-20 px-5 text-center" aria-labelledby="cta-heading">
        <div className="max-w-[800px] mx-auto">
          <h2 id="cta-heading" className="text-3xl text-white mb-4">
            Need Scaffolding for Your Construction Project?
          </h2>
          <p className="text-slate-350 text-lg mb-9">
            Get in touch with Bombay Sky High today for a free quote on scaffolding products and 
            rental services. We deliver across Thane, Navi Mumbai, Kalyan-Dombivli, Ulhasnagar, 
            Bhiwandi, Mira-Bhayandar, Vasai-Virar, and Panvel.
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

      {/* Local SEO Content Section */}
      <section className="py-16 px-5 bg-white" aria-labelledby="local-seo-heading">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <h2 id="local-seo-heading" className="text-2xl text-dark mb-4">
              Scaffolding Services Across Mumbai Metropolitan Region
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <article className="p-5 bg-slate-50 rounded-lg">
              <h3 className="text-lg font-semibold text-dark mb-2">Scaffolding in Thane</h3>
              <p className="text-slate-450 text-sm">
                Premium scaffolding manufacturing and supply services for residential, commercial, 
                and industrial construction projects in Thane city and surrounding areas.
              </p>
            </article>
            <article className="p-5 bg-slate-50 rounded-lg">
              <h3 className="text-lg font-semibold text-dark mb-2">Scaffolding in Navi Mumbai</h3>
              <p className="text-slate-450 text-sm">
                Quick delivery of Cuplock scaffolding and MS scaffolding to construction sites 
                across Vashi, Nerul, Kharghar, Panvel, and other Navi Mumbai nodes.
              </p>
            </article>
            <article className="p-5 bg-slate-50 rounded-lg">
              <h3 className="text-lg font-semibold text-dark mb-2">Scaffolding in Kalyan-Dombivli</h3>
              <p className="text-slate-450 text-sm">
                Affordable scaffolding rental and purchase options for construction companies 
                and contractors in Kalyan, Dombivli, and KDMC region.
              </p>
            </article>
            <article className="p-5 bg-slate-50 rounded-lg">
              <h3 className="text-lg font-semibold text-dark mb-2">Scaffolding in Vasai-Virar</h3>
              <p className="text-slate-450 text-sm">
                Complete scaffolding solutions including H-frame, Cuplock systems, and adjustable 
                props for growing construction projects in Vasai-Virar region.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
