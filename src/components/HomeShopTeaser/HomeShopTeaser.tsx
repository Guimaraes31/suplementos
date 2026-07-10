import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CATEGORIES } from '../../config/categories'
import { shopPath, categoryPath } from '../../config/navigation'
import './HomeShopTeaser.css'

export default function HomeShopTeaser() {
  return (
    <section className="home-teaser" id="loja-teaser" aria-labelledby="home-teaser-title">
      <div className="container">
        <header className="home-teaser__header">
          <div className="home-teaser__eyebrow">
            <span className="home-teaser__eyebrow-line" aria-hidden="true" />
            <span className="home-teaser__eyebrow-text">Comprar</span>
          </div>
          <h2 className="home-teaser__title" id="home-teaser-title">
            Encontre o suplemento certo
          </h2>
          <p className="home-teaser__subtitle">
            Explore a loja completa ou entre por categoria. Em dúvida, peça orientação antes de comprar.
          </p>
        </header>

        <div className="home-teaser__pills" role="list">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              role="listitem"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link to={categoryPath(cat.slug)} className="home-teaser__pill">
                {cat.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="home-teaser__actions">
          <Link to={shopPath()} className="home-teaser__cta">
            Ver loja completa
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link to="/categorias" className="home-teaser__cta-secondary">
            Ver todas as categorias
          </Link>
        </div>
      </div>
    </section>
  )
}
