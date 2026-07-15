import { lazy, Suspense, useRef, useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../../cms/types'
import { productPath } from '../../config/navigation'
import { useCart } from '../../context/CartContext'
import { formatPrice, formatInstallment } from '../../utils/format'
import SafeImage from '../SafeImage/SafeImage'
import './ProductCard.css'

const ProductCardMotion = lazy(() => import('./ProductCardMotion'))

interface ProductCardProps {
  product: Product
  index?: number
  animate?: boolean
  featured?: boolean
}

export default function ProductCard({ product, index = 0, animate = true, featured = false }: ProductCardProps) {
  const { addItem } = useCart()
  const imageRef = useRef<HTMLDivElement>(null)
  const [isAdding, setIsAdding] = useState(false)
  const isOutOfStock = product.stockStatus === 'Esgotado'
  const isLowStock = product.stockStatus === 'Últimas unidades'
  const showStock = isLowStock || isOutOfStock
  const to = productPath(product.id)

  const handleAdd = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isOutOfStock) return
    const rect = imageRef.current?.getBoundingClientRect()
    setIsAdding(true)
    addItem(product, rect)
    window.setTimeout(() => setIsAdding(false), 480)
  }

  const card = (
    <Link
      id={`product-${product.id}`}
      to={to}
      className={`product-card ${isOutOfStock ? 'product-card--out-of-stock' : ''} ${featured ? 'product-card--featured' : ''}`}
      aria-label={`Ver detalhes de ${product.name}`}
    >
      <div
        className={`product-card__image-wrap ${isAdding ? 'product-card__image-wrap--flash' : ''}`}
        ref={imageRef}
      >
        {product.badge && (
          <span className={`product-card__badge ${product.badge === 'Oferta' ? 'product-card__badge--oferta' : ''}`}>
            {product.badge}
          </span>
        )}
        <SafeImage
          className="product-card__image"
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          loading="lazy"
          sizes="(max-width: 480px) 50vw, (max-width: 1100px) 33vw, 280px"
        />
        <div className="product-card__overlay" aria-hidden="true">
          <button
            type="button"
            className={`product-card__add-btn ${isAdding ? 'product-card__add-btn--adding' : ''}`}
            disabled={isOutOfStock}
            onClick={handleAdd}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            {isOutOfStock ? 'Indisponível' : 'Adicionar'}
          </button>
        </div>
      </div>

      <div className="product-card__body">
        <div className="product-card__meta-row">
          <span className="product-card__category">{product.category}</span>
          {showStock && (
            <span
              className={`product-card__stock-pill ${isLowStock ? 'product-card__stock-pill--low' : ''} ${isOutOfStock ? 'product-card__stock-pill--out' : ''}`}
            >
              {isLowStock && <span className="product-card__stock-dot" aria-hidden="true" />}
              {product.stockStatus}
            </span>
          )}
        </div>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.shortDescription}</p>
        <div className="product-card__pricing">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <span className="product-card__installment">{formatInstallment(product.price)}</span>
        </div>
      </div>

      <span className="product-card__tap-hint" aria-hidden="true">Ver produto</span>
    </Link>
  )

  if (!animate) return card

  return (
    <Suspense fallback={card}>
      <ProductCardMotion index={index}>{card}</ProductCardMotion>
    </Suspense>
  )
}