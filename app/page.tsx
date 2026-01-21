import Link from 'next/link'
import Image from 'next/image'
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
} from '@fortawesome/free-solid-svg-icons'
import FeatureCard from '@/components/FeatureCard'
import ProductCard from '@/components/ProductCard'
import TestimonialCard from '@/components/TestimonialCard'

const features = [
  {
    icon: faShieldAlt,
    title: 'Premium Quality',
    description:
      'All our scaffolding products are manufactured using high-grade steel and undergo rigorous quality checks to ensure maximum safety and durability.',
  },
  {
    icon: faTruckFast,
    title: 'Fast Delivery',
    description:
      'With our efficient logistics network, we ensure timely delivery of scaffolding materials to your construction site anywhere in India.',
  },
  {
    icon: faHandHoldingDollar,
    title: 'Competitive Pricing',
    description:
      'Get the best value for your investment with our competitive pricing on all scaffolding products, sales and rental options available.',
  },
  {
    icon: faTools,
    title: 'Rental Services',
    description:
      'Flexible scaffolding rental options for short-term and long-term projects. Save costs without compromising on quality.',
  },
  {
    icon: faHeadset,
    title: 'Expert Support',
    description:
      'Our experienced team provides technical guidance and support to help you choose the right scaffolding solutions for your project.',
  },
  {
    icon: faCertificate,
    title: 'Certified Products',
    description:
      'All products comply with Indian and international safety standards, ensuring your workforce remains safe at all heights.',
  },
]

const featuredProducts = [
  {
    title: 'Adjustable Steel Props',
    description: 'Heavy-duty adjustable props for reliable construction support',
    image: '/images/AdjustableSteelProps.jpg',
    badge: 'Best Seller',
  },
  {
    title: 'Cuplock Scaffolding System',
    description: 'Fast assembly cuplock system for efficient scaffolding',
    image: '/images/cuplok-system.jpg',
    badge: 'Popular',
  },
  {
    title: 'Steel Scaffolding Pipes',
    description: 'Durable MS pipes for sturdy scaffolding structures',
    image: '/images/steel-scaffolding-pipes.jpg',
  },
  {
    title: 'H-Frame Scaffolding',
    description: 'Easy-to-assemble H-frame systems for all projects',
    image: '/images/h-frame-scaffolding.jpg',
  },
]

const testimonials = [
  {
    text: 'Bombay Sky High has been our trusted scaffolding partner for 5 years. Their quality products and timely delivery have never disappointed us. Highly recommended!',
    authorName: 'Rajesh Sharma',
    authorRole: 'Project Manager, ABC Constructions',
    initials: 'RS',
  },
  {
    text: 'Excellent rental services and competitive pricing. The team is very professional and always ready to help with technical queries. Best scaffolding supplier in Mumbai!',
    authorName: 'Priya Kapoor',
    authorRole: 'Director, Kapoor Builders',
    initials: 'PK',
  },
  {
    text: 'We ordered cuplock scaffolding for our high-rise project. The quality exceeded our expectations and the support team was incredibly helpful throughout.',
    authorName: 'Amit Mehta',
    authorRole: 'CEO, Skyline Infrastructure',
    initials: 'AM',
  },
]

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark to-dark-light text-white pt-40 pb-24 px-5 text-center relative overflow-hidden hero-pattern">
        <div className="relative max-w-[900px] mx-auto">
          <span className="inline-block bg-primary/20 text-primary px-5 py-2 rounded-full text-sm mb-6 border border-primary/30">
            🏆 Trusted by 500+ Construction Companies
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight">
            Premium Scaffolding Solutions for Every Project
          </h1>
          <p className="text-lg text-slate-350 mb-9 max-w-[700px] mx-auto">
            India&apos;s leading supplier of high-quality scaffolding materials, adjustable props,
            cuplock systems & formwork accessories. Safe, durable & cost-effective solutions.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            <Link
              href="/products"
              className="btn-gradient text-dark px-7 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <FontAwesomeIcon icon={faBox} /> View Products
            </Link>
            <Link
              href="/contact"
              className="bg-transparent text-white px-7 py-4 rounded-lg font-semibold border-2 border-primary inline-flex items-center gap-2 transition-all hover:bg-primary/10"
            >
              <FontAwesomeIcon icon={faPhone} /> Request Quote
            </Link>
          </div>
          <div className="flex justify-center gap-16 flex-wrap pt-10 border-t border-white/10">
            <div className="text-center">
              <span className="block text-4xl font-extrabold text-primary">15+</span>
              <span className="text-sm text-slate-350">Years Experience</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-extrabold text-primary">500+</span>
              <span className="text-sm text-slate-350">Happy Clients</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-extrabold text-primary">10K+</span>
              <span className="text-sm text-slate-350">Products Delivered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-5 bg-white" id="services">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-3xl text-dark mb-4">Why Choose Bombay Sky High?</h2>
          <p className="text-slate-450 text-lg max-w-[600px] mx-auto">
            We deliver excellence in scaffolding solutions with unmatched quality and service
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-5 bg-slate-50 text-center">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Our Products
          </span>
          <h2 className="text-3xl text-dark mb-4">Featured Scaffolding Products</h2>
          <p className="text-slate-450 text-lg max-w-[600px] mx-auto">
            Explore our wide range of high-quality scaffolding materials and equipment
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
          <FontAwesomeIcon icon={faThLarge} /> View All Products
        </Link>
      </section>

      {/* About Section */}
      <section className="py-20 px-5 bg-slate-50" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-[1200px] mx-auto items-center">
          <div>
            <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              About Us
            </span>
            <h2 className="text-3xl text-dark mb-5">Building Trust Since 2010</h2>
            <p className="text-slate-450 text-lg mb-6 leading-7">
              Bombay Sky High is a leading supplier of premium scaffolding products and services in
              India. With over 15 years of experience, we have established ourselves as a trusted
              partner for construction companies, contractors, and builders across the nation.
            </p>
            <ul className="list-none mb-8 space-y-3">
              {[
                'ISO Certified Manufacturing',
                'Pan-India Delivery Network',
                '24/7 Customer Support',
                'Flexible Rental Options',
              ].map((item, index) => (
                <li key={index} className="py-2 text-slate-550">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-primary mr-3" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="btn-gradient text-dark px-7 py-4 rounded-lg font-semibold inline-block transition-all hover:-translate-y-0.5"
            >
              Learn More About Us
            </Link>
          </div>
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
              alt="Scaffolding Construction"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-5 bg-white">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl text-dark mb-4">What Our Clients Say</h2>
          <p className="text-slate-450 text-lg max-w-[600px] mx-auto">
            Trusted by leading construction companies across India
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-gradient py-20 px-5 text-center">
        <div>
          <h2 className="text-3xl text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-slate-350 text-lg mb-9">
            Get in touch with us today for a free quote on scaffolding products and rental services
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/contact"
              className="bg-white text-dark px-7 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faEnvelope} /> Contact Us
            </Link>
            <a
              href="tel:+919876543210"
              className="bg-transparent text-white px-7 py-4 rounded-lg font-semibold border-2 border-white inline-flex items-center gap-2 transition-all hover:bg-white hover:text-dark"
            >
              <FontAwesomeIcon icon={faPhone} /> Call Now
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
