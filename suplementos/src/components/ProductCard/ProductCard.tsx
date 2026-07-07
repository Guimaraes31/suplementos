import { useRef } from 'react'
import { motion } from 'framer-motion'
import type { Product } from '../../cms/types'
import { useCart } from '../../context/CartContext'
import { formatPrice, formatInstallment } from '../../utils/format'
import SafeImage from '../SafeImage/SafeImage'
import './ProductCard.css'

interface ProductCardProps {
  product: Product
  index?: number
  animate?: boolean
}

export default function ProductCard({ product, index = 0, animate = true }: ProductCardProps) {
  const { addItem } = useCart()
  const imageRef = useRef<HTMLDivElement>(null)
  const isOutOfStock = product.stockStatus === 'Esgotado'
  const isLowStock = product.stockStatus === 'Últimas unidades'

  const handleAdd = () => {
    const rect = imageRef.current?.getBoundingClientRect()
    addItem(product, rect)
  }

  const card = (
    <article
      className={`product-card ${isOutOfStock ? 'product-card--out-of-stock' : ''}`}
    >
      <div className="product-card__image-wrap" ref={imageRef}>
        {product.badge && (
          <span className={`product-card__badge ${product.badge === 'Oferta' ? 'product-card__badge--oferta' : ''}`}>
            {product.badge}
          </span>
        )}
        <span
          className={`product-card__stock ${isLowStock ? 'product-card__stock--low' : ''} ${isOutOfStock ? 'product-card__stock--out' : ''}`}
        >
          {product.stockStatus}
        </span>
        <SafeImage
          className="product-card__image"
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          loading="lazy"
        />
        <div className="product-card__overlay">
          <button
            type="button"
            className="product-card__add-btn"
            disabled={isOutOfStock}
            onClick={handleAdd}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            {isOutOfStock ? 'Indisponível' : 'Adicionar ao Carrinho'}
          </button>
        </div>
      </div>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.shortDescription}</p>
        <div className="product-card__pricing">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <span className="product-card__installment">{formatInstallment(product.price)}</span>
        </div>
      </div>
    </article>
  )

  if (!animate) return card

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] as const }}
    >
      {card}
    </motion.div>
  )
}