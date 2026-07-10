import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Product } from '../../cms/types'
import { useCart } from '../../context/CartContext'
import { formatPrice, formatInstallment } from '../../utils/format'
import SafeImage from '../SafeImage/SafeImage'
import './ProductQuickView.css'

interface ProductQuickViewProps {
  product: Product | null
  onClose: () => void
}

export default function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const { addItem } = useCart()
  const isOpen = product !== null
  const isOutOfStock = product?.stockStatus === 'Esgotado'
  const isLowStock = product?.stockStatus === 'Últimas unidades'

  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>()
  const [selectedSize, setSelectedSize] = useState<string | undefined>()

  useEffect(() => {
    if (!product) return
    setSelectedFlavor(product.flavors?.[0])
    setSelectedSize(product.sizes?.[0])
  }, [product])

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 900 : true,
  )

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleAdd = () => {
    if (!product || isOutOfStock) return
    addItem(product, undefined, {
      flavor: selectedFlavor,
      size: selectedSize,
    })
    onClose()
  }

  const handleViewDetails = () => {
    if (!product) return
    onClose()
    requestAnimationFrame(() => {
      const el = document.getElementById(`product-${product.id}`)
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          <motion.div
            className="quick-view__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            className="quick-view"
            role="dialog"
            aria-modal="true"
            aria-label={`Visualização rápida: ${product.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="quick-view__panel"
              initial={isMobile ? { y: '100%' } : { y: 24, scale: 0.97, opacity: 0 }}
              animate={isMobile ? { y: 0 } : { y: 0, scale: 1, opacity: 1 }}
              exit={isMobile ? { y: '100%' } : { y: 16, scale: 0.98, opacity: 0 }}
              transition={{ type: 'spring', damping: 34, stiffness: 340 }}
            >
              <div className="quick-view__handle" aria-hidden="true" />

              <button
                type="button"
                className="quick-view__close"
                onClick={onClose}
                aria-label="Fechar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>

              <div className="quick-view__layout">
                <div className="quick-view__image-wrap">
                  {product.badge && (
                    <span className={`quick-view__badge ${product.badge === 'Oferta' ? 'quick-view__badge--oferta' : ''}`}>
                      {product.badge}
                    </span>
                  )}
                  <SafeImage
                    className="quick-view__image"
                    src={product.image}
                    alt={product.name}
                    width={480}
                    height={480}
                  />
                </div>

                <div className="quick-view__content">
                  <div className="quick-view__scroll">
                    <span className="quick-view__category">{product.category}</span>
                    <h2 className="quick-view__name">{product.name}</h2>
                    <p className="quick-view__desc">{product.shortDescription}</p>

                    {product.benefits.length > 0 && (
                      <ul className="quick-view__benefits">
                        {product.benefits.map((benefit) => (
                          <li key={benefit} className="quick-view__benefit">
                            <span className="quick-view__benefit-dot" aria-hidden="true" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    )}

                    {product.flavors && product.flavors.length > 0 && (
                      <div className="quick-view__selector">
                        <span className="quick-view__selector-label">Sabor</span>
                        <div className="quick-view__options" role="group" aria-label="Selecionar sabor">
                          {product.flavors.map((flavor) => (
                            <button
                              key={flavor}
                              type="button"
                              className={`quick-view__option ${selectedFlavor === flavor ? 'quick-view__option--active' : ''}`}
                              onClick={() => setSelectedFlavor(flavor)}
                              aria-pressed={selectedFlavor === flavor}
                            >
                              {flavor}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.sizes && product.sizes.length > 0 && (
                      <div className="quick-view__selector">
                        <span className="quick-view__selector-label">Tamanho</span>
                        <div className="quick-view__options" role="group" aria-label="Selecionar tamanho">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              type="button"
                              className={`quick-view__option ${selectedSize === size ? 'quick-view__option--active' : ''}`}
                              onClick={() => setSelectedSize(size)}
                              aria-pressed={selectedSize === size}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="quick-view__meta">
                      <span
                        className={`quick-view__stock ${isLowStock ? 'quick-view__stock--low' : ''} ${isOutOfStock ? 'quick-view__stock--out' : ''}`}
                      >
                        {isLowStock && <span className="quick-view__stock-pulse" aria-hidden="true" />}
                        {product.stockStatus}
                      </span>
                    </div>

                    <div className="quick-view__pricing">
                      <span className="quick-view__price">{formatPrice(product.price)}</span>
                      <span className="quick-view__installment">{formatInstallment(product.price)}</span>
                    </div>
                  </div>

                  <div className="quick-view__actions">
                    <button
                      type="button"
                      className="quick-view__add-btn"
                      disabled={isOutOfStock}
                      onClick={handleAdd}
                    >
                      {isOutOfStock ? 'Indisponível' : 'Adicionar ao Carrinho'}
                    </button>
                    <button
                      type="button"
                      className="quick-view__details-btn"
                      onClick={handleViewDetails}
                    >
                      Ver detalhes completos
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}