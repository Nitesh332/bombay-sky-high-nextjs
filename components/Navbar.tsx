'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-dark fixed w-full top-0 z-[1000] shadow-lg">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center px-5 py-4">
        <Link href="/" className="flex items-center no-underline text-white text-2xl font-bold">
          <span className="text-3xl mr-2">🏗️</span>
          <span className="logo-gradient">Bombay Sky High</span>
        </Link>

        <button
          className="md:hidden bg-transparent border-none text-white text-2xl cursor-pointer"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>

        <nav
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row absolute md:relative top-full left-0 right-0 md:top-auto bg-dark md:bg-transparent p-5 md:p-0 gap-4 md:gap-8 items-center border-t border-dark-light md:border-none`}
        >
          <Link
            href="/"
            className={`${
              isActive('/') ? 'text-primary' : 'text-slate-300'
            } no-underline font-medium transition-colors hover:text-primary`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`${
              isActive('/products') ? 'text-primary' : 'text-slate-300'
            } no-underline font-medium transition-colors hover:text-primary`}
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/#services"
            className="text-slate-300 no-underline font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/#about"
            className="text-slate-300 no-underline font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`${
              isActive('/contact') ? 'text-primary' : 'text-slate-300'
            } no-underline font-medium transition-colors hover:text-primary`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="btn-gradient text-dark px-5 py-2 rounded-full font-bold transition-all hover:scale-105 hover:shadow-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Quote
          </Link>
        </nav>
      </div>
    </header>
  )
}
