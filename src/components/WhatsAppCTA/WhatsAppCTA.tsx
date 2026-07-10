import { motion } from 'framer-motion'
import { storeConfig } from '../../config/store'
import './WhatsAppCTA.css'

const message = encodeURIComponent(
  'Olá! Quero orientação para escolher o suplemento certo pro meu objetivo.',
)

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3C8.9 21.5 10.4 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 2c4.4 0 8 3.6 8 8 0 1.4-.4 2.7-1 3.8l.6 2.2-2.3-.6c-1 .6-2.2 1-3.3 1-4.4 0-8-3.6-8-8s3.6-8 8-8z" />
    </svg>
  )
}

export default function WhatsAppCTA() {
  return (
    <section className="whatsapp-cta" id="especialista" aria-labelledby="whatsapp-cta-title">
      <div className="whatsapp-cta__glow" aria-hidden="true" />
      <div className="container">
        <motion.div
          className="whatsapp-cta__inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="whatsapp-cta__eyebrow">Fale com a loja</span>
          <h2 className="whatsapp-cta__title" id="whatsapp-cta-title">
            Não sabe o que comprar? A gente te orienta
          </h2>
          <p className="whatsapp-cta__desc">
            {storeConfig.tagline}. Conte seu objetivo no WhatsApp e receba uma indicação honesta —
            sem pressão e sem gastar à toa.
          </p>
          <a
            href={`https://wa.me/${storeConfig.whatsapp}?text=${message}`}
            className="whatsapp-cta__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            Pedir orientação no WhatsApp
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
