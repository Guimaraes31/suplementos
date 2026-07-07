import { useRef } from 'react'
import { motion } from 'framer-motion'
import { getBestSellers } from '../../cms/products'
import ProductCard from '../ProductCard/ProductCard'
import './MaisVendidos.css'

const bestSellers = getBestSellers(6)

export default function MaisVendidos() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return
    const amount = trackRef.current.clientWidth * 0.8
    trackRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="mais-vendidos" id="mais-vendidos" aria-labelledby="mais-vendidos-title">
      <div className="container">
        <header className="mais-vendidos__header">
          <div className="mais-vendidos__header-content">
            <div className="mais-vendidos__eyebrow">
              <span className="mais-vendidos__eyebrow-line" aria-hidden="true" />
              <span className="mais-vendidos__eyebrow-text">Destaques</span>
            </div>
            <h2 className="mais-vendidos__title" id="mais-vendidos-title">
              Mais Vendidos
            </h2>
            <p className="mais-vendidos__subtitle">
              Os favoritos de quem exige performance e qualidade em São Paulo.
            </p>
          </div>

          <div className="mais-vendidos__nav" aria-hidden="true">
            <button
              type="button"
              className="mais-vendidos__nav-btn"
              onClick={() => scroll('left')}
              aria-label="Anterior"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="mais-vendidos__nav-btn"
              onClick={() => scroll('right')}
              aria-label="Próximo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </header>

        <motion.div
          className="mais-vendidos__track-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mais-vendidos__track mais-vendidos__track--carousel" ref={trackRef}>
            {bestSellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}