import { useRef, useState, useEffect, useCallback, type PointerEvent as ReactPointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { getBestSellers } from '../../cms/products'
import { shopPath } from '../../config/navigation'
import ProductCard from '../ProductCard/ProductCard'
import './MaisVendidos.css'

export default function MaisVendidos() {
  const bestSellers = useMemo(() => getBestSellers(6), [])
  const trackRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
    moved: false,
    pointerId: -1,
  })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const updateScrollState = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const { scrollLeft, scrollWidth, clientWidth } = track
    setCanScrollLeft(scrollLeft > 4)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4)
    const maxScroll = scrollWidth - clientWidth
    setProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    updateScrollState()
    track.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      track.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector('.mais-vendidos__slide') as HTMLElement | null
    const amount = card ? card.offsetWidth + 16 : trackRef.current.clientWidth * 0.8
    trackRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return
    const track = trackRef.current
    if (!track) return
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScroll: track.scrollLeft,
      moved: false,
      pointerId: e.pointerId,
    }
    track.setPointerCapture(e.pointerId)
    setIsDragging(true)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    const track = trackRef.current
    if (!drag.active || !track) return
    const dx = e.clientX - drag.startX
    if (Math.abs(dx) > 4) {
      drag.moved = true
      e.preventDefault()
    }
    track.scrollLeft = drag.startScroll - dx
  }

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    const track = trackRef.current
    if (!drag.active) return
    if (track && drag.pointerId === e.pointerId) {
      try {
        track.releasePointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
    }
    // Evita clique acidental no card após arrastar
    if (drag.moved) {
      const blockClick = (ev: Event) => {
        ev.preventDefault()
        ev.stopPropagation()
        track?.removeEventListener('click', blockClick, true)
      }
      track?.addEventListener('click', blockClick, true)
      window.setTimeout(() => track?.removeEventListener('click', blockClick, true), 80)
    }
    dragRef.current.active = false
    dragRef.current.moved = false
    setIsDragging(false)
  }

  return (
    <section className="mais-vendidos" id="mais-vendidos" aria-labelledby="mais-vendidos-title">
      <div className="mais-vendidos__glow" aria-hidden="true" />

      <div className="container">
        <header className="mais-vendidos__header">
          <div className="mais-vendidos__header-content">
            <div className="mais-vendidos__eyebrow">
              <span className="mais-vendidos__eyebrow-line" aria-hidden="true" />
              <span className="mais-vendidos__eyebrow-text">Destaques</span>
            </div>
            <h2 className="mais-vendidos__title" id="mais-vendidos-title">
              Mais vendidos
            </h2>
            <p className="mais-vendidos__subtitle">
              Os produtos que mais saem na loja — deslize para o lado ou use as setas.
            </p>
          </div>

          <div className="mais-vendidos__nav">
            <Link to={shopPath({ sort: 'mais-vendidos' })} className="mais-vendidos__all-link">
              Ver loja
            </Link>
            <button
              type="button"
              className="mais-vendidos__nav-btn"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Anterior"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="mais-vendidos__nav-btn"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Próximo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </header>

        <div className="mais-vendidos__track-wrap">
          <div
            className={`mais-vendidos__track ${isDragging ? 'mais-vendidos__track--dragging' : ''}`}
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            role="region"
            aria-label="Produtos em destaque — deslize para o lado"
          >
            {bestSellers.map((product, i) => (
              <div key={product.id} className="mais-vendidos__slide">
                {/* animate=false: evita jank de Framer no scroll mobile */}
                <ProductCard product={product} index={i} featured animate={false} />
              </div>
            ))}
          </div>

          <div className="mais-vendidos__progress" aria-hidden="true">
            <div
              className="mais-vendidos__progress-fill"
              style={{ transform: `scaleX(${Math.max(0.18, progress || 0.18)})` }}
            />
          </div>

          <div className="mais-vendidos__nav mais-vendidos__nav--mobile">
            <button
              type="button"
              className="mais-vendidos__nav-btn"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Anterior"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="mais-vendidos__nav-btn"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Próximo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
