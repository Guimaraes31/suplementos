import { useState, useEffect, type FormEvent } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import BrandLogo from '../BrandLogo/BrandLogo'
import { useCart } from '../../context/CartContext'
import { NAV_LINKS, HOME_SECTION_IDS, shopPath } from '../../config/navigation'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import './Navbar.css'

function SearchIcon() {
  return (
    <svg className="navbar__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20L16.5 16.5" strokeLinecap="round" />
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

function linkIsActive(pathname: string, hash: string, linkTo: string, scrollId: string) {
  if (linkTo === '/') {
    return pathname === '/' && (!hash || hash === '#inicio')
  }
  if (linkTo.startsWith('/#')) {
    const section = linkTo.slice(2)
    return pathname === '/' && (hash === `#${section}` || scrollId === section)
  }
  if (linkTo === '/loja') {
    return pathname === '/loja' || pathname.startsWith('/produto/')
  }
  if (linkTo === '/categorias') {
    return pathname === '/categorias' || pathname.startsWith('/categoria/')
  }
  return pathname === linkTo
}

export default function Navbar() {
  const { itemCount, openDrawer } = useCart()
  const navigate = useNavigate()
  const { pathname, hash } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const onHome = pathname === '/'
  const scrollId = useScrollSpy(onHome ? HOME_SECTION_IDS : [], 140)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, hash])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const q = searchValue.trim()
    navigate(shopPath({ q: q || undefined }))
    setMenuOpen(false)
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--menu-open' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="Nascimento Suplementos — Página inicial">
          <BrandLogo variant="navbar" />
        </Link>

        <nav className="navbar__nav" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => {
            const active = linkIsActive(pathname, hash, link.to, scrollId)
            return (
              <NavLink
                key={link.id}
                to={link.to}
                className={`navbar__link ${active ? 'navbar__link--active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="navbar__actions">
          <form className="navbar__search" onSubmit={handleSearch} role="search">
            <SearchIcon />
            <input
              type="search"
              className="navbar__search-input"
              placeholder="Buscar produtos..."
              aria-label="Buscar produtos"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>

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
          <>
            <motion.div
              className="navbar__mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              className="navbar__mobile-menu"
              aria-label="Menu mobile"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="navbar__mobile-menu-inner">
                <span className="navbar__mobile-eyebrow">Menu</span>
                {NAV_LINKS.map((link, i) => {
                  const active = linkIsActive(pathname, hash, link.to, scrollId)
                  return (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        to={link.to}
                        className={`navbar__mobile-link ${active ? 'navbar__mobile-link--active' : ''}`}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="navbar__mobile-link-num" aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
                <form className="navbar__mobile-search" onSubmit={handleSearch} role="search">
                  <SearchIcon />
                  <input
                    type="search"
                    placeholder="Buscar produtos..."
                    aria-label="Buscar produtos"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </form>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
