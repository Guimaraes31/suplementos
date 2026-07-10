import { Link, Navigate, useParams } from 'react-router-dom'
import { getCategoryBySlug } from '../config/categories'
import { productsCollection, filterProducts } from '../cms/products'
import { shopPath, categoryPath } from '../config/navigation'
import { storeConfig } from '../config/store'
import ProductCard from '../components/ProductCard/ProductCard'
import SafeImage from '../components/SafeImage/SafeImage'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { priceBounds } from '../cms/products'
import './pages.css'

export default function CategoryPage() {
  const { slug = '' } = useParams()
  const category = getCategoryBySlug(slug)

  useDocumentTitle(
    category
      ? `${category.label} | Nascimento Suplementos — Zona Sul SP`
      : 'Categoria | Nascimento Suplementos',
    category
      ? `${category.seoIntro} Jardim São Carlos, Zona Sul.`
      : undefined,
  )

  if (!category) {
    return <Navigate to="/categorias" replace />
  }

  const products = filterProducts(
    productsCollection,
    category.name,
    priceBounds.min,
    priceBounds.max,
    'relevancia',
  )

  const waMsg = encodeURIComponent(
    `Olá! Quero orientação sobre produtos de ${category.label}.`,
  )

  return (
    <section className="page-section category-page" aria-labelledby="category-page-title">
      <div className="container">
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link to="/categorias">Categorias</Link>
          <span aria-hidden="true">/</span>
          <span>{category.label}</span>
        </nav>

        <div className="category-page__hero">
          <div className="category-page__hero-image-wrap">
            <SafeImage
              className="category-page__hero-image"
              src={category.image}
              alt={category.label}
              width={640}
              height={400}
              loading="eager"
            />
          </div>
          <div className="category-page__hero-content">
            <p className="page-eyebrow">Categoria</p>
            <h1 className="category-page__title" id="category-page-title">
              {category.label}
            </h1>
            <p className="category-page__intro">{category.seoIntro}</p>
            <ul className="category-page__tips">
              {category.seoTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            <div className="category-page__actions">
              <Link to={shopPath({ categoria: category.name })} className="page-btn page-btn--primary">
                Filtrar na loja
              </Link>
              <a
                href={`https://wa.me/${storeConfig.whatsapp}?text=${waMsg}`}
                className="page-btn page-btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir orientação
              </a>
            </div>
          </div>
        </div>

        <div className="category-page__products">
          <div className="category-page__products-header">
            <h2 className="category-page__products-title">
              {products.length} {products.length === 1 ? 'produto' : 'produtos'}
            </h2>
            <Link to={categoryPath(category.slug)} className="category-page__anchor-note" hidden>
              {category.label}
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="category-page__grid">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <p className="page-empty">Nenhum produto nesta categoria no momento.</p>
          )}
        </div>
      </div>
    </section>
  )
}
