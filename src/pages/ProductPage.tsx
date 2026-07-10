import { useEffect, useState, type MouseEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProductById, getRelatedProducts } from '../cms/products'
import { getCategorySlug } from '../config/categories'
import { categoryPath, shopPath } from '../config/navigation'
import { storeConfig } from '../config/store'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import ProductCard from '../components/ProductCard/ProductCard'
import SafeImage from '../components/SafeImage/SafeImage'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './pages.css'
import './ProductPage.css'

export default function ProductPage() {
  const { id = '' } = useParams()
  const product = getProductById(id)
  const { addItem } = useCart()

  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>(product?.flavors?.[0])
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.sizes?.[0])
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    if (!product) return
    setSelectedFlavor(product.flavors?.[0])
    setSelectedSize(product.sizes?.[0])
  }, [product])

  useDocumentTitle(
    product
      ? `${product.name} | Nascimento Suplementos`
      : 'Produto | Nascimento Suplementos',
    product
      ? `${product.shortDescription} Compre com orientação na Nascimento Suplementos — Zona Sul SP.`
      : undefined,
  )

  if (!product) {
    return <Navigate to="/loja" replace />
  }

  const isOutOfStock = product.stockStatus === 'Esgotado'
  const isLowStock = product.stockStatus === 'Últimas unidades'
  const related = getRelatedProducts(product, 4)
  const categorySlug = getCategorySlug(product.category)

  const waMsg = encodeURIComponent(
    `Olá! Tenho interesse no produto *${product.name}* (${formatPrice(product.price)}). Quero orientação antes de comprar.`,
  )

  const handleAdd = (e?: MouseEvent) => {
    e?.preventDefault()
    if (isOutOfStock) return
    setIsAdding(true)
    addItem(product, undefined, {
      flavor: selectedFlavor,
      size: selectedSize,
    })
    window.setTimeout(() => setIsAdding(false), 480)
  }

  return (
    <section className="page-section product-page" aria-labelledby="product-page-title">
      <div className="container">
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link to={shopPath()}>Loja</Link>
          <span aria-hidden="true">/</span>
          <Link to={categoryPath(categorySlug)}>{product.category}</Link>
          <span aria-hidden="true">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-page__layout">
          <motion.div
            className="product-page__gallery"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {product.badge && (
              <span className={`product-page__badge ${product.badge === 'Oferta' ? 'product-page__badge--oferta' : ''}`}>
                {product.badge}
              </span>
            )}
            <SafeImage
              className="product-page__image"
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              loading="eager"
            />
          </motion.div>

          <motion.div
            className="product-page__info"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <p className="product-page__category">
              <Link to={categoryPath(categorySlug)}>{product.category}</Link>
            </p>
            <h1 className="product-page__title" id="product-page-title">
              {product.name}
            </h1>

            <div className="product-page__stock-row">
              <span
                className={`product-page__stock ${isLowStock ? 'product-page__stock--low' : ''} ${isOutOfStock ? 'product-page__stock--out' : ''}`}
              >
                {product.stockStatus}
              </span>
            </div>

            <p className="product-page__short">{product.shortDescription}</p>

            <div className="product-page__price-block">
              <span className="product-page__price">{formatPrice(product.price)}</span>
              <span className="product-page__price-note">Confirme disponibilidade e pagamento no WhatsApp</span>
            </div>

            {product.flavors && product.flavors.length > 0 && (
              <div className="product-page__selector">
                <span className="product-page__selector-label">Sabor</span>
                <div className="product-page__options" role="group" aria-label="Selecionar sabor">
                  {product.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      type="button"
                      className={`product-page__option ${selectedFlavor === flavor ? 'product-page__option--active' : ''}`}
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
              <div className="product-page__selector">
                <span className="product-page__selector-label">Tamanho</span>
                <div className="product-page__options" role="group" aria-label="Selecionar tamanho">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`product-page__option ${selectedSize === size ? 'product-page__option--active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="product-page__actions">
              <button
                type="button"
                className={`product-page__add ${isAdding ? 'product-page__add--adding' : ''}`}
                disabled={isOutOfStock}
                onClick={handleAdd}
              >
                {isOutOfStock ? 'Indisponível' : 'Adicionar ao carrinho'}
              </button>
              <a
                href={`https://wa.me/${storeConfig.whatsapp}?text=${waMsg}`}
                className="product-page__wa"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir orientação deste produto
              </a>
            </div>

            <div className="product-page__trust">
              <span>Orientação antes de comprar</span>
              <span aria-hidden="true">·</span>
              <span>Entrega ou retirada na Zona Sul</span>
              <span aria-hidden="true">·</span>
              <span>Pix e combinações no WhatsApp</span>
            </div>
          </motion.div>
        </div>

        <div className="product-page__details">
          <div className="product-page__detail-card">
            <h2 className="product-page__detail-title">Descrição</h2>
            <p className="product-page__detail-text">
              {product.shortDescription} Produto disponível na Nascimento Suplementos
              (Jardim São Carlos, Zona Sul). Se precisar de indicação de uso, combinação com outros
              suplementos ou sabor, fale com a loja — a gente orienta antes de vender.
            </p>
          </div>

          {product.benefits.length > 0 && (
            <div className="product-page__detail-card">
              <h2 className="product-page__detail-title">Pontos principais</h2>
              <ul className="product-page__benefits">
                {product.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="product-page__detail-card">
            <h2 className="product-page__detail-title">Como comprar</h2>
            <ol className="product-page__steps">
              <li>Adicione ao carrinho ou chame no WhatsApp com o nome do produto.</li>
              <li>Escolha entrega ou retirada na loja (Rua Henrique Guilherme Nicolini, 126).</li>
              <li>Combine pagamento (ex.: Pix) e horário no atendimento.</li>
            </ol>
          </div>
        </div>

        {related.length > 0 && (
          <div className="product-page__related">
            <div className="product-page__related-header">
              <h2 className="product-page__related-title">Você também pode gostar</h2>
              <Link to={categoryPath(categorySlug)} className="product-page__related-link">
                Ver mais em {product.category}
              </Link>
            </div>
            <div className="product-page__related-grid">
              {related.map((item, i) => (
                <ProductCard key={item.id} product={item} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
