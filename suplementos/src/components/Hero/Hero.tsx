import { motion } from 'framer-motion'
import { images } from '../../assets/images'
import './Hero.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] as const },
  }),
}

export default function Hero() {
  return (
    <section className="hero" id="loja" aria-label="Destaque principal">
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
            <span className="hero__eyebrow-text">São Paulo · Zona Sul</span>
          </motion.div>

          <motion.h1
            className="hero__title"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
          >
            Performance elevada.
            <br />
            <em>Qualidade incomparável.</em>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
          >
            Suplementos de alta performance, selecionados com rigor científico
            para quem exige o melhor em cada treino.
          </motion.p>

          <motion.div
            className="hero__cta-group"
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
          >
            <a href="#loja-produtos" className="hero__cta">
              Explorar Loja
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#sobre" className="hero__cta-secondary">
              Conheça nossa história
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.4, 0, 0.2, 1] as const }}
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
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="hero__emblem-accent hero__emblem-accent--left">
              <span className="hero__emblem-accent-label">Desde</span>
              <span className="hero__emblem-accent-value">2018</span>
            </div>
            <div className="hero__emblem-accent hero__emblem-accent--right">
              <span className="hero__emblem-accent-label">Pureza</span>
              <span className="hero__emblem-accent-value">100%</span>
            </div>
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