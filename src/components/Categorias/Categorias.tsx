import { motion } from 'framer-motion'
import { images } from '../../assets/images'
import SafeImage from '../SafeImage/SafeImage'
import './Categorias.css'

const categories = [
  {
    name: 'Whey Protein',
    description: 'Proteínas de alta absorção para recuperação e ganho muscular.',
    image: images.categories.whey,
    slug: 'whey-protein',
  },
  {
    name: 'Creatina',
    description: 'Pureza farmacêutica para força, potência e performance.',
    image: images.categories.creatina,
    slug: 'creatina',
  },
  {
    name: 'Pré-Treino',
    description: 'Energia limpa e foco absoluto para treinos intensos.',
    image: images.categories.preTreino,
    slug: 'pre-treino',
  },
  {
    name: 'Pós-Treino',
    description: 'Recuperação acelerada com fórmulas de composição ideal.',
    image: images.categories.posTreino,
    slug: 'pos-treino',
  },
  {
    name: 'Vitaminas & Minerais',
    description: 'Suporte nutricional completo para saúde e bem-estar.',
    image: images.categories.vitaminas,
    slug: 'vitaminas-minerais',
  },
  {
    name: 'Packs Especiais',
    description: 'Combinações exclusivas com o melhor custo-benefício.',
    image: images.categories.packs,
    slug: 'packs-especiais',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] as const },
  }),
}

export default function Categorias() {
  return (
    <section className="categorias" id="categorias" aria-labelledby="categorias-title">
      <div className="container">
        <header className="categorias__header">
          <div className="categorias__header-content">
            <div className="categorias__eyebrow">
              <span className="categorias__eyebrow-line" aria-hidden="true" />
              <span className="categorias__eyebrow-text">Coleção</span>
            </div>
            <h2 className="categorias__title" id="categorias-title">
              Categorias
            </h2>
            <p className="categorias__subtitle">
              Selecione a categoria ideal para seus objetivos de performance.
            </p>
          </div>
          <a href="#loja-produtos" className="categorias__view-all">
            Ver todos os produtos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </header>

        <div className="categorias__grid">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="category-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
            >
              <div className="category-card__image-wrap">
                <span className="category-card__number" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <SafeImage
                  className="category-card__image"
                  src={cat.image}
                  alt={cat.name}
                  width={400}
                  height={300}
                  loading="lazy"
                />
              </div>
              <div className="category-card__body">
                <h3 className="category-card__name">{cat.name}</h3>
                <p className="category-card__desc">{cat.description}</p>
                <span className="category-card__link">
                  <span className="category-card__link-line" aria-hidden="true" />
                  Explorar
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}