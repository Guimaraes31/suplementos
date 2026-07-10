import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { storeConfig } from '../../config/store'
import './Benefits.css'

function BenefitIcon({ children }: { children: ReactNode }) {
  return (
    <div className="benefit-card__icon">
      <span className="benefit-card__icon-ring" aria-hidden="true" />
      {children}
    </div>
  )
}

const benefits = [
  {
    title: 'Orientação de verdade',
    description:
      'Não vendemos no escuro. Ajudamos você a escolher o que faz sentido pro seu objetivo — sem pressão e sem desperdício de dinheiro.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2L12 17l-6.3 4 2.3-7.2-6-4.6h7.6L12 2z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Atendimento especializado',
    description:
      'Tire dúvidas por WhatsApp ou na loja. Quem treina e se cuida merece indicação honesta, não só um preço no balcão.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Preço justo',
    description:
      'Marcas conhecidas, valores transparentes e combinações que cabem no bolso. Foque no resultado — a gente cuida da escolha.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <path d="M12 2v20M8 6h8a3 3 0 010 6H8a3 3 0 000 6h8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Entrega rápida',
    description:
      'Peça pelo site, WhatsApp ou iFood. Loja em Jardim São Carlos, Zona Sul — prática para quem mora e treina na região.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <path d="M3 7h11v10H3z" strokeLinejoin="round" />
        <path d="M14 10h4l3 3v4h-7V10z" strokeLinejoin="round" />
        <circle cx="7" cy="17" r="1.5" />
        <circle cx="18" cy="17" r="1.5" />
      </svg>
    ),
  },
]

export default function Benefits() {
  return (
    <section className="benefits" id="sobre" aria-labelledby="benefits-title">
      <div className="container">
        <header className="benefits__header">
          <div className="benefits__eyebrow">
            <span className="benefits__eyebrow-line" aria-hidden="true" />
            <span className="benefits__eyebrow-text">Por que a Nascimento</span>
          </div>
          <h2 className="benefits__title" id="benefits-title">
            Por que escolher a Nascimento Suplementos
          </h2>
          <p className="benefits__subtitle">
            {storeConfig.tagline} — atendimento especializado, preço justo e entrega rápida na Zona Sul de São Paulo.
          </p>
        </header>

        <div className="benefits__grid">
          {benefits.map((benefit, i) => (
            <motion.article
              key={benefit.title}
              className="benefit-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] as const }}
            >
              <BenefitIcon>{benefit.icon}</BenefitIcon>
              <h3 className="benefit-card__title">{benefit.title}</h3>
              <p className="benefit-card__desc">{benefit.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
