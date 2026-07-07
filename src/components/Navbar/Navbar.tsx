import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BrandLogo from '../BrandLogo/BrandLogo'
import { useCart } from '../../context/CartContext'
import './Navbar.css'

const navLinks = [
  { label: 'Loja', href: '#loja-produtos' },
  { label: 'Categorias', href: '#categorias' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
]

function SearchIcon() {
  return (
    <svg className="navbar__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20L16.5 16.5" strokeLinecap="round" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" strokeLinecap="round" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 6h15l-1.5 9H7.5L6 6z" strokeLinejoin="round" />
      <path d="M6 6L5 3H2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="20" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {open ? (
        <>
          <path d="M6 6l12 12" strokeLinecap="round" />
          <path d="M18 6L6 18" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M4 7h16" strokeLinecap="round" />
          <path d="M4 12h16" strokeLinecap="round" />
          <path d="M4 17h16" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

export default function Navbar() {
  const { itemCount, openDrawer } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#" className="navbar__logo" aria-label="Nascimento Suplementos — Página inicial">
          <BrandLogo variant="navbar" />
        </a>

        <nav className="navbar__nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <label className="navbar__search">
            <SearchIcon />
            <input
              type="search"
              className="navbar__search-input"
              placeholder="Buscar produtos..."
              aria-label="Buscar produtos"
            />
          </label>

          <button type="button" className="navbar__icon-btn" aria-label="Minha conta">
            <UserIcon />
          </button>

          <button
            type="button"
            id="cart-icon-btn"
            className="navbar__icon-btn navbar__icon-btn--cart"
            aria-label={`Carrinho de compras${itemCount > 0 ? `, ${itemCount} itens` : ''}`}
            onClick={openDrawer}
          >
            <CartIcon />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  className="navbar__cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  aria-hidden="true"
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            className="navbar__menu-btn"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="navbar__mobile-menu"
            aria-label="Menu mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar__mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <label className="navbar__mobile-search">
              <SearchIcon />
              <input type="search" placeholder="Buscar produtos..." aria-label="Buscar produtos" />
            </label>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}