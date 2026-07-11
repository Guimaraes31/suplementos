import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CATEGORIES } from '../../config/categories'
import { categoryPath, shopPath } from '../../config/navigation'
import SafeImage from '../SafeImage/SafeImage'
import './Categorias.css'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] as const },
  }),
}

/** Grade de categorias (usada na página /categorias; não fica no home). */
export default function Categorias() {
  return (
    <section className="categorias" id="categorias" aria-labelledby="categorias-title">
      <div className="container">
        <header className="categorias__header">
          <div className="categorias__header-content">
            <div className="categorias__eyebrow">
              <span className="categorias__eyebrow-line" aria-hidden="true" />
              <span className="categorias__eyebrow-text">Categorias</span>
            </div>
            <h2 className="categorias__title" id="categorias-title">
              Compre por objetivo
            </h2>
            <p className="categorias__subtitle">
              Escolha a categoria e veja os produtos. Em dúvida, peça orientação no WhatsApp.
            </p>
          </div>
          <Link to={shopPath()} className="categorias__view-all">
            Ver loja completa
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </header>

        <div className="categorias__grid">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
            >
              <Link
                to={categoryPath(cat.slug)}
                className="category-card"
                aria-label={`Ver produtos de ${cat.label}`}
              >
                <div className="category-card__image-wrap">
                  <span className="category-card__number" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <SafeImage
                    className="category-card__image"
                    src={cat.image}
                    alt={`Produto da categoria ${cat.label}`}
                    width={522}
                    height={391}
                    loading="lazy"
                    sizes="(max-width: 479px) 45vw, (max-width: 1023px) 40vw, 360px"
                  />
                </div>
                <div className="category-card__body">
                  <h3 className="category-card__name">{cat.label}</h3>
                  <p className="category-card__desc">{cat.shortDescription}</p>
                  <span className="category-card__link">
                    <span className="category-card__link-line" aria-hidden="true" />
                    Ver produtos
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
