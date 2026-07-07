import { motion } from 'framer-motion'
import './Benefits.css'

const benefits = [
  {
    title: 'Qualidade Certificada',
    description: 'Cada lote passa por análise laboratorial independente. Transparência total em composição e pureza.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Curadoria Especializada',
    description: 'Seleção rigorosa de marcas e fórmulas. Apenas o que entregamos com confiança aos nossos clientes.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2L12 17l-6.3 4 2.3-7.2-6-4.6h7.6L12 2z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Resultados Reais',
    description: 'Fórmulas com dosagens eficazes, baseadas em evidência científica. Performance que você sente no treino.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 16l4-6 4 3 8-10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 20h16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Atendimento Premium',
    description: 'Consultoria personalizada e entrega ágil na Zona Sul. Suporte de quem entende do assunto.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2C8 2 5 5 5 9c0 5 3 8 7 11 4-3 7-6 7-11 0-4-3-7-7-7z" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="2.5" />
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
            <span className="benefits__eyebrow-text">Diferenciais</span>
          </div>
          <h2 className="benefits__title" id="benefits-title">
            Por que escolher a Nascimento
          </h2>
          <p className="benefits__subtitle">
            Mais do que suplementos — uma experiência de excelência para quem leva performance a sério.
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
              <div className="benefit-card__icon">{benefit.icon}</div>
              <h3 className="benefit-card__title">{benefit.title}</h3>
              <p className="benefit-card__desc">{benefit.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}