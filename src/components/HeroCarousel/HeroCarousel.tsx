import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { images } from '../../assets/images'
import { storeConfig } from '../../config/store'
import { shopPath } from '../../config/navigation'
import './HeroCarousel.css'

const INTERVAL_MS = 5000

const whatsappOrientacao = `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(
  'Olá! Quero orientação para escolher o suplemento certo pro meu objetivo.',
)}`

type BrandSlide = {
  kind: 'brand'
  id: string
  eyebrow: string
  title: string
  titleAccent: string
  subtitle: string
  primaryCta: { label: string; to: string }
  secondaryCta: { label: string; href: string }
  emblem: string
  emblemAlt: string
  chips: { label: string; value: string }[]
}

type ProductSlide = {
  kind: 'product'
  id: string
  badge: string
  title: string
  titleAccent: string
  subtitle: string
  cta: string
  to: string
  bgImage: string
  productImage: string
  productAlt: string
  /** Segundo pote (ex.: combo whey + creatina) */
  productImageSecondary?: string
  productAltSecondary?: string
  /** Potes com fundo claro / isolados */
  cutout?: boolean
  promoSeal?: string
}

type Slide = BrandSlide | ProductSlide

const slides: Slide[] = [
  {
    kind: 'brand',
    id: 'brand',
    eyebrow: 'Jardim São Carlos · Zona Sul, SP',
    title: 'O suplemento certo.',
    titleAccent: 'A orientação certa.',
    subtitle: `${storeConfig.tagline}. Atendimento especializado, preço justo e entrega rápida — whey, creatina, pré-treino e mais, das marcas que você confia.`,
    primaryCta: { label: 'Ver produtos', to: shopPath() },
    secondaryCta: { label: 'Pedir orientação', href: whatsappOrientacao },
    emblem: images.brand.heroEmblem,
    emblemAlt: 'Emblema Nascimento Suplementos',
    chips: [
      { label: 'Zona Sul', value: 'SP' },
      { label: 'Entrega', value: 'Rápida' },
    ],
  },
  {
    kind: 'product',
    id: 'creatina',
    badge: 'Mais pedido',
    title: 'Creatina monohidratada.',
    titleAccent: 'Base do shape.',
    subtitle:
      'O clássico que não sai de moda. Tire dúvida de dose e rotina no WhatsApp — sem gastar à toa.',
    cta: 'Ver creatinas',
    to: shopPath({ categoria: 'Creatina' }),
    bgImage: images.categories.creatina,
    productImage: images.heroProducts.creatina,
    productAlt: 'Pote de creatina monohidratada',
    cutout: true,
  },
  {
    kind: 'product',
    id: 'whey',
    badge: 'Performance',
    title: 'Whey de verdade.',
    titleAccent: 'Sem chute na compra.',
    subtitle:
      'Isolado e concentrado para o seu objetivo. Orientação antes de vender — monte o stack certo pro seu treino.',
    cta: 'Ver whey protein',
    to: shopPath({ categoria: 'Whey Protein' }),
    bgImage: images.categories.whey,
    productImage: images.heroProducts.whey,
    productAlt: 'Pote de whey protein concentrado',
    cutout: true,
  },
  {
    kind: 'product',
    id: 'combo',
    badge: 'Combo inteligente',
    title: 'Whey + creatina.',
    titleAccent: 'Kit essencial.',
    subtitle:
      'Comece com o essencial e peça orientação para ajustar doses e rotina. Prefere frete ou retirada? Combinamos no WhatsApp.',
    cta: 'Montar meu kit',
    to: shopPath({ sort: 'mais-vendidos' }),
    bgImage: images.categories.packs,
    productImage: images.heroProducts.whey,
    productAlt: 'Pote de whey protein',
    productImageSecondary: images.heroProducts.creatina,
    productAltSecondary: 'Pote de creatina monohidratada',
    cutout: true,
    promoSeal: 'Cupom / frete · confira no WhatsApp',
  },
]

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [progressKey, setProgressKey] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const touchX = useRef<number | null>(null)

  const goTo = useCallback((i: number) => {
    setIndex((i + slides.length) % slides.length)
    setProgressKey((k) => k + 1)
  }, [])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Autoplay contínuo — não pausa no hover (pedido do cliente)
  useEffect(() => {
    if (reduceMotion || !playing) return

    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
      setProgressKey((k) => k + 1)
    }, INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [playing, index, reduceMotion])

  useEffect(() => {
    const onVis = () => setPlaying(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <section
      id="inicio"
      className={`hero-carousel ${playing && !reduceMotion ? 'hero-carousel--playing' : ''} ${reduceMotion ? 'hero-carousel--reduced' : ''}`}
      aria-roledescription="carousel"
      aria-label="Destaques da loja"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          next()
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          prev()
        }
      }}
      onTouchStart={(e) => {
        touchX.current = e.changedTouches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1))
      }}
    >
      <div className="hero-carousel__viewport">
        {slides.map((slide, i) => {
          const active = i === index
          // Carrega o ativo e vizinhos para o swipe não “piscar”
          const shouldLoad = active || Math.abs(i - index) <= 1 || i === 0
          return (
            <article
              key={slide.id}
              className={`hero-slide hero-slide--${slide.kind} ${active ? 'hero-slide--active' : ''}`}
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${slides.length}`}
              aria-hidden={active ? undefined : true}
            >
              {slide.kind === 'brand' ? (
                <BrandSlideView slide={slide} isFirst={i === 0} shouldLoad={shouldLoad} />
              ) : (
                <ProductSlideView slide={slide} isFirst={i === 0} shouldLoad={shouldLoad} active={active} />
              )}
            </article>
          )
        })}

        <button
          type="button"
          className="hero-carousel__nav hero-carousel__nav--prev"
          onClick={prev}
          aria-label="Slide anterior"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="hero-carousel__nav hero-carousel__nav--next"
          onClick={next}
          aria-label="Próximo slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="hero-carousel__dots" role="tablist" aria-label="Selecionar slide">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              className={`hero-carousel__dot ${i === index ? 'hero-carousel__dot--active' : ''}`}
              aria-label={`Ir para slide ${i + 1}`}
              aria-selected={i === index}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <div className="hero-carousel__progress" aria-hidden="true">
          <div
            key={progressKey}
            className={`hero-carousel__progress-bar ${playing && !reduceMotion ? 'hero-carousel__progress-bar--run' : ''}`}
          />
        </div>
      </div>
    </section>
  )
}

function BrandSlideView({
  slide,
  isFirst,
  shouldLoad,
}: {
  slide: BrandSlide
  isFirst: boolean
  shouldLoad: boolean
}) {
  const TitleTag = isFirst ? 'h1' : 'h2'

  return (
    <div className="hero-slide__brand">
      <div className="hero-slide__brand-glow" aria-hidden="true" />
      <div className="hero-slide__brand-ring hero-slide__brand-ring--outer" aria-hidden="true" />
      <div className="hero-slide__brand-ring hero-slide__brand-ring--inner" aria-hidden="true" />

      <div className="container hero-slide__grid">
        <div className="hero-slide__copy">
          <div className="hero-slide__eyebrow">
            <span className="hero-slide__eyebrow-line" aria-hidden="true" />
            <span className="hero-slide__eyebrow-text">{slide.eyebrow}</span>
          </div>

          <TitleTag className="hero-slide__title">
            {slide.title}
            <br />
            <em>{slide.titleAccent}</em>
          </TitleTag>

          <p className="hero-slide__sub">{slide.subtitle}</p>

          <div className="hero-slide__cta-group">
            <Link to={slide.primaryCta.to} className="hero-slide__cta">
              {slide.primaryCta.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href={slide.secondaryCta.href}
              className="hero-slide__cta-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {slide.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="hero-slide__visual hero-slide__visual--emblem">
          <div className="hero-slide__emblem-stage">
            <div className="hero-slide__emblem-glow" aria-hidden="true" />
            <div className="hero-slide__emblem-ring" aria-hidden="true" />
            {shouldLoad ? (
              <img
                className="hero-slide__emblem"
                src={slide.emblem}
                alt={slide.emblemAlt}
                width={480}
                height={480}
                loading={isFirst ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={isFirst ? 'high' : 'auto'}
              />
            ) : (
              <div className="hero-slide__emblem" aria-hidden="true" />
            )}
            {slide.chips.map((chip, idx) => (
              <div
                key={chip.label}
                className={`hero-slide__chip hero-slide__chip--${idx === 0 ? 'left' : 'right'}`}
              >
                <span className="hero-slide__chip-label">{chip.label}</span>
                <span className="hero-slide__chip-value">{chip.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductSlideView({
  slide,
  isFirst,
  shouldLoad,
  active,
}: {
  slide: ProductSlide
  isFirst: boolean
  shouldLoad: boolean
  active: boolean
}) {
  const TitleTag = isFirst ? 'h1' : 'h2'
  const isDuo = Boolean(slide.productImageSecondary)
  const cutoutClass = slide.cutout ? ' hero-slide__product-img--cutout' : ''

  return (
    <div className="hero-slide__product">
      <div className="hero-slide__media" aria-hidden="true">
        {shouldLoad ? (
          <img
            src={slide.bgImage}
            alt=""
            width={800}
            height={450}
            loading={active || isFirst ? 'eager' : 'lazy'}
            decoding="async"
          />
        ) : null}
        <div className="hero-slide__shade" />
      </div>

      <div className="container hero-slide__grid">
        <div className="hero-slide__copy">
          <span className="hero-slide__badge">{slide.badge}</span>
          {slide.promoSeal ? (
            <span className="hero-slide__seal">{slide.promoSeal}</span>
          ) : null}

          <TitleTag className="hero-slide__title">
            {slide.title}
            <br />
            <em>{slide.titleAccent}</em>
          </TitleTag>

          <p className="hero-slide__sub">{slide.subtitle}</p>

          <Link to={slide.to} className="hero-slide__cta">
            {slide.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="hero-slide__visual hero-slide__visual--product">
          <div className={`hero-slide__product-stage${isDuo ? ' hero-slide__product-stage--duo' : ''}`}>
            <div className="hero-slide__product-glow" aria-hidden="true" />
            <div className="hero-slide__product-halo hero-slide__product-halo--outer" aria-hidden="true" />
            <div className="hero-slide__product-halo hero-slide__product-halo--inner" aria-hidden="true" />
            <div className="hero-slide__product-float">
              <div className={`hero-slide__product-scale${isDuo ? ' hero-slide__product-scale--duo' : ''}`}>
                {shouldLoad ? (
                  <>
                    <img
                      className={`hero-slide__product-img${cutoutClass}${isDuo ? ' hero-slide__product-img--primary' : ''}`}
                      src={slide.productImage}
                      alt={slide.productAlt}
                      width={520}
                      height={520}
                      loading={active || isFirst ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    {slide.productImageSecondary ? (
                      <img
                        className={`hero-slide__product-img${cutoutClass} hero-slide__product-img--secondary`}
                        src={slide.productImageSecondary}
                        alt={slide.productAltSecondary ?? ''}
                        width={420}
                        height={420}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                  </>
                ) : null}
                <span className="hero-slide__product-shine" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
