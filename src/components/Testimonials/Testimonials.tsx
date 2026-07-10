import { motion } from 'framer-motion'
import { storeConfig } from '../../config/store'
import './Testimonials.css'

const channels = [
  {
    title: 'WhatsApp',
    description:
      'Peça orientação e finalize o pedido com atendimento humano. Conte seu objetivo — a gente ajuda a montar o que faz sentido.',
    cta: 'Chamar no WhatsApp',
    href: `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent('Olá! Quero orientação para escolher suplementos.')}`,
    external: true,
  },
  {
    title: 'iFood',
    description:
      'Peça com delivery: whey, creatina, pré-treino, barrinhas, pasta de amendoim e outros suplementos das melhores marcas.',
    cta: 'Pedir no iFood',
    href: storeConfig.ifood,
    external: true,
  },
  {
    title: 'Loja física',
    description: `${storeConfig.addressShort}. ${storeConfig.hoursDisplay}. Orientação e degustação na hora.`,
    cta: 'Ver no mapa',
    href: 'https://www.google.com/maps/search/?api=1&query=Rua+Henrique+Guilherme+Nicolini+126+Jardim+S%C3%A3o+Carlos+S%C3%A3o+Paulo',
    external: true,
  },
  {
    title: 'Instagram',
    description:
      'Dicas, lançamentos e bastidores da loja. Acompanhe o dia a dia de quem orienta antes de vender.',
    cta: storeConfig.instagramHandle,
    href: storeConfig.instagram,
    external: true,
  },
]

function ChannelCard({ item }: { item: (typeof channels)[number] }) {
  return (
    <article className="testimonial-card channel-card">
      <h3 className="testimonial-card__name channel-card__title">{item.title}</h3>
      <p className="testimonial-card__quote channel-card__desc">{item.description}</p>
      <a
        href={item.href}
        className="channel-card__link"
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
      >
        {item.cta}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </article>
  )
}

export default function Testimonials() {
  return (
    <section className="testimonials" id="depoimentos" aria-labelledby="testimonials-title">
      <div className="container">
        <header className="testimonials__header">
          <div className="testimonials__eyebrow">
            <span className="testimonials__eyebrow-line" aria-hidden="true" />
            <span className="testimonials__eyebrow-text">Como comprar</span>
          </div>
          <h2 className="testimonials__title" id="testimonials-title">
            Escolha o jeito mais fácil pra você
          </h2>
          <p className="testimonials__subtitle">
            WhatsApp, iFood ou loja em Jardim São Carlos — sempre com orientação especializada.
          </p>
        </header>

        <div className="testimonials__grid testimonials__grid--channels">
          {channels.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] as const }}
            >
              <ChannelCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
