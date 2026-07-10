import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { images } from '../../assets/images'
import { storeConfig } from '../../config/store'
import { shopPath } from '../../config/navigation'
import './Hero.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] as const },
  }),
}

function useIsCompactHero(breakpoint = 900) {
  const [compact, setCompact] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : true,
  )

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const update = () => setCompact(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [breakpoint])

  return compact
}

export default function Hero() {
  const compact = useIsCompactHero()

  return (
    <section className="hero" id="inicio" aria-label="Destaque principal">
      <div className="hero__bg-glow" aria-hidden="true" />
      <div className="hero__bg-ring hero__bg-ring--outer" aria-hidden="true" />
      <div className="hero__bg-ring hero__bg-ring--inner" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__content">
          <motion.div
            className="hero__eyebrow"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
          >
            <span className="hero__eyebrow-line" aria-hidden="true" />
            <span className="hero__eyebrow-text">Jardim São Carlos · Zona Sul, SP</span>
          </motion.div>

          <motion.h1
            className="hero__title"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
          >
            O suplemento certo.
            <br />
            <em>A orientação certa.</em>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
          >
            {storeConfig.tagline}. Atendimento especializado, preço justo e entrega rápida —
            whey, creatina, pré-treino e mais, das marcas que você confia.
          </motion.p>

          <motion.div
            className="hero__cta-group"
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
          >
            <Link to={shopPath()} className="hero__cta">
              Ver produtos
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent('Olá! Quero orientação para escolher o suplemento certo pro meu objetivo.')}`}
              className="hero__cta-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir orientação
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] as const }}
        >
          <div className="hero__emblem-stage">
            <div className="hero__emblem-glow" aria-hidden="true" />
            <div className="hero__emblem-ring" aria-hidden="true" />
            <motion.img
              className="hero__emblem"
              src={images.brand.heroEmblem}
              alt="Emblema Nascimento Suplementos"
              width={480}
              height={480}
              loading="eager"
              animate={compact ? { y: 0 } : { y: [0, -8, 0] }}
              transition={
                compact
                  ? { duration: 0 }
                  : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
              }
            />
            {!compact && (
              <>
                <div className="hero__emblem-accent hero__emblem-accent--left">
                  <span className="hero__emblem-accent-label">Zona Sul</span>
                  <span className="hero__emblem-accent-value">SP</span>
                </div>
                <div className="hero__emblem-accent hero__emblem-accent--right">
                  <span className="hero__emblem-accent-label">Entrega</span>
                  <span className="hero__emblem-accent-value">Rápida</span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
