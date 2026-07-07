import { motion } from 'framer-motion'
import { images } from '../../assets/images'
import SafeImage from '../SafeImage/SafeImage'
import './Testimonials.css'

const testimonials = [
  {
    quote: 'A qualidade dos produtos é incomparável. O whey isolate dissolve perfeitamente e o sabor é refinado — nada daquela textura artificial comum.',
    name: 'Rafael Mendes',
    role: 'Atleta · Moema, SP',
    image: images.testimonials.rafael,
  },
  {
    quote: 'Indico a Nascimento para todos os meus alunos. A curadoria é impecável e o atendimento transmite confiança real. Loja de verdade.',
    name: 'Camila Rocha',
    role: 'Personal Trainer · Vila Mariana',
    image: images.testimonials.camila,
  },
  {
    quote: 'Entrega rápida na Zona Sul e embalagem premium. O pack iniciante foi perfeito para montar minha rotina com produtos de qualidade.',
    name: 'Lucas Ferreira',
    role: 'Crossfit Athlete · Brooklin',
    image: images.testimonials.lucas,
  },
  {
    quote: 'Finalmente uma loja que prioriza transparência. Todos os lotes com laudo e dosagens reais. Isso faz toda diferença nos resultados.',
    name: 'Ana Paula Souza',
    role: 'Nutricionista Esportiva · SP',
    image: images.testimonials.ana,
  },
  {
    quote: 'O pré-treino Fury é o melhor que já usei — energia limpa, sem crash. A Nascimento entende o que atleta de verdade precisa.',
    name: 'Bruno Alves',
    role: 'Atleta · Santo Amaro',
    image: images.testimonials.bruno,
  },
]

function StarRating() {
  return (
    <div className="testimonial-card__stars" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2L12 17l-6.3 4 2.3-7.2-6-4.6h7.6L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <header className="testimonials__header">
          <div className="testimonials__eyebrow">
            <span className="testimonials__eyebrow-line" aria-hidden="true" />
            <span className="testimonials__eyebrow-text">Depoimentos</span>
          </div>
          <h2 className="testimonials__title" id="testimonials-title">
            O que nossos clientes dizem
          </h2>
        </header>

        <div className="testimonials__grid">
          {testimonials.map((item, i) => (
            <motion.blockquote
              key={item.name}
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] as const }}
            >
              <StarRating />
              <p className="testimonial-card__quote">{item.quote}</p>
              <footer className="testimonial-card__author">
                <SafeImage
                  className="testimonial-card__avatar"
                  src={item.image}
                  alt=""
                  width={44}
                  height={44}
                  loading="lazy"
                />
                <div className="testimonial-card__info">
                  <cite className="testimonial-card__name">{item.name}</cite>
                  <span className="testimonial-card__role">{item.role}</span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}