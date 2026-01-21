import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
} from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  return (
    <footer className="bg-dark text-slate-350 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-[1200px] mx-auto px-5 pb-10">
        {/* About Section */}
        <div className="lg:col-span-1">
          <h3 className="text-white text-xl mb-5">🏗️ Bombay Sky High</h3>
          <p className="leading-7 mb-5">
            India&apos;s trusted scaffolding supplier providing premium quality products and rental
            services for construction projects of all sizes.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="w-10 h-10 bg-dark-light rounded-full flex items-center justify-center text-slate-350 transition-all hover:bg-primary hover:text-dark"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-dark-light rounded-full flex items-center justify-center text-slate-350 transition-all hover:bg-primary hover:text-dark"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-dark-light rounded-full flex items-center justify-center text-slate-350 transition-all hover:bg-primary hover:text-dark"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-dark-light rounded-full flex items-center justify-center text-slate-350 transition-all hover:bg-primary hover:text-dark"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-lg mb-5">Quick Links</h4>
          <ul className="list-none space-y-3">
            <li>
              <Link href="/" className="text-slate-350 no-underline transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-slate-350 no-underline transition-colors hover:text-primary">
                Products
              </Link>
            </li>
            <li>
              <Link href="/#services" className="text-slate-350 no-underline transition-colors hover:text-primary">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-slate-350 no-underline transition-colors hover:text-primary">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-white text-lg mb-5">Products</h4>
          <ul className="list-none space-y-3">
            <li>
              <Link href="/products#scaffolding-products" className="text-slate-350 no-underline transition-colors hover:text-primary">
                Scaffolding Props
              </Link>
            </li>
            <li>
              <Link href="/products#scaffolding-products" className="text-slate-350 no-underline transition-colors hover:text-primary">
                Cuplock System
              </Link>
            </li>
            <li>
              <Link href="/products#h-frames" className="text-slate-350 no-underline transition-colors hover:text-primary">
                H-Frame Scaffolding
              </Link>
            </li>
            <li>
              <Link href="/products#formwork" className="text-slate-350 no-underline transition-colors hover:text-primary">
                Formwork Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white text-lg mb-5">Contact Info</h4>
          <ul className="list-none space-y-3">
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary w-5" />
              Mumbai, Maharashtra, India
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faPhone} className="text-primary w-5" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faEnvelope} className="text-primary w-5" />
              info@bombayskyhigh.com
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faClock} className="text-primary w-5" />
              Mon-Sat: 9AM - 6PM
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-dark-light py-5 text-center">
        <p>© 2026 Bombay Sky High. All Rights Reserved. | Designed with ❤️ in India</p>
      </div>
    </footer>
  )
}
