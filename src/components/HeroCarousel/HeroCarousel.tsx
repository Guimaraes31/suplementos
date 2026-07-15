import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { images } from '../../assets/images'
import { productPath } from '../../config/navigation'
import './HeroCarousel.css'

const INTERVAL_MS = 5000

/** Banner promocional full-bleed (arte pronta da loja) */
type BannerSlide = {
  id: string
  image: string
  alt: string
  to: string
  label: string
}

const slides: BannerSlide[] = [
  {
    id: 'banner-insane-clown',
    image: images.banners.insaneClown,
    alt: 'Pré-treino Insane Clown Demons Lab — 3 sabores, design holográfico',
    to: productPath('pre-treino-insane-clown-350g-demons-lab'),
    label: 'Ver produto Insane Clown',
  },
  {
    id: 'banner-gods-100',
    image: images.banners.gods100,
    alt: 'Gods 100% Whey concentrado Canibal Inc sabor morango — novo lançamento',
    to: productPath('gods-100-900g'),
    label: 'Ver produto Gods 100% Whey',
  },
  {
    id: 'banner-creatina-darkness',
    image: images.banners.creatinaDarkness,
    alt: 'Creatina Darkness 300g — pure creatine monohydrate',
    to: productPath('creatine-darkness-300g-100-pura'),
    label: 'Ver produto Creatina Darkness',
  },
]

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [progressKey, setProgressKey] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [compactLoad, setCompactLoad] = useState(false)
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

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setCompactLoad(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!compactLoad) return
    const next = slides[(index + 1) % slides.length]
    const img = new Image()
    img.src = next.image
  }, [compactLoad, index])

  return (
    <section
      id="inicio"
      className={[
        'hero-carousel',
        'hero-carousel--banners-only',
        playing && !reduceMotion ? 'hero-carousel--playing' : '',
        reduceMotion ? 'hero-carousel--reduced' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-roledescription="carousel"
      aria-label="Promoções da loja"
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
          const shouldLoad = compactLoad
            ? active
            : active || Math.abs(i - index) <= 1 || i === 0
          return (
            <article
              key={slide.id}
              className={`hero-slide hero-slide--banner ${active ? 'hero-slide--active' : ''}`}
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${slides.length}`}
              aria-hidden={active ? undefined : true}
            >
              <BannerSlideView slide={slide} isFirst={i === 0} shouldLoad={shouldLoad} active={active} />
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

function BannerSlideView({
  slide,
  isFirst,
  shouldLoad,
  active,
}: {
  slide: BannerSlide
  isFirst: boolean
  shouldLoad: boolean
  active: boolean
}) {
  return (
    <div className="hero-slide__banner">
      <Link to={slide.to} className="hero-slide__banner-link" aria-label={slide.label}>
        {shouldLoad ? (
          <img
            className="hero-slide__banner-img"
            src={slide.image}
            alt={slide.alt}
            width={1824}
            height={560}
            sizes="100vw"
            loading={active || isFirst ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={active || isFirst ? 'high' : 'low'}
          />
        ) : (
          <div className="hero-slide__banner-placeholder" aria-hidden="true" />
        )}
        <span className="hero-slide__banner-cta">
          Comprar agora
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </div>
  )
}
