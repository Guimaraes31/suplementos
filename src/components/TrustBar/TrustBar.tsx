import { motion } from 'framer-motion'
import './TrustBar.css'

const trustItems = [
  {
    value: '+15.000',
    label: 'clientes atendidos',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" strokeLinecap="round" />
        <path d="M14 14c3 0 6 2 6 6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: 'Entrega rápida',
    label: 'em São Paulo',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 12h14l-2-6H5L3 12z" strokeLinejoin="round" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M17 12v5h3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: '6x sem juros',
    label: 'no cartão de crédito',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M6 15h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: 'Testados',
    label: 'em laboratório',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M9 3h6v5l5 9a2 2 0 01-2 2H6a2 2 0 01-2-2l5-9V3z" strokeLinejoin="round" />
        <path d="M9 8h6" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Diferenciais da loja">
      <div className="container">
        <div className="trust-bar__grid">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              className="trust-bar__item"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] as const }}
            >
              <div className="trust-bar__icon">{item.icon}</div>
              <div className="trust-bar__text">
                <span className="trust-bar__value">{item.value}</span>
                <span className="trust-bar__label">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}