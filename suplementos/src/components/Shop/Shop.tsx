import { useState, useMemo } from 'react'
import { PRODUCT_CATEGORIES, type ProductCategory, type SortOption } from '../../cms/types'
import { productsCollection, priceBounds, filterProducts } from '../../cms/products'
import { formatPrice } from '../../utils/format'
import ProductCard from '../ProductCard/ProductCard'
import './Shop.css'

const categoryFilters: (ProductCategory | 'Todos')[] = ['Todos', ...PRODUCT_CATEGORIES]

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor-preco', label: 'Menor Preço' },
  { value: 'mais-vendidos', label: 'Mais Vendidos' },
]

export default function Shop() {
  const [category, setCategory] = useState<ProductCategory | 'Todos'>('Todos')
  const [maxPrice, setMaxPrice] = useState(priceBounds.max)
  const [sort, setSort] = useState<SortOption>('relevancia')

  const filteredProducts = useMemo(
    () => filterProducts(productsCollection, category, priceBounds.min, maxPrice, sort),
    [category, maxPrice, sort],
  )

  return (
    <section className="shop" id="loja-produtos" aria-labelledby="shop-title">
      <div className="container">
        <header className="shop__header">
          <div className="shop__eyebrow">
            <span className="shop__eyebrow-line" aria-hidden="true" />
            <span className="shop__eyebrow-text">Loja</span>
          </div>
          <h2 className="shop__title" id="shop-title">
            Nossa Coleção
          </h2>
          <p className="shop__subtitle">
            Suplementos selecionados com rigor científico para resultados reais.
          </p>
        </header>

        <div className="shop__filters" role="search" aria-label="Filtros de produtos">
          <div className="shop__filter-group shop__filter-group--categories">
            <span className="shop__filter-label">Categoria</span>
            <div className="shop__pills" role="group" aria-label="Filtrar por categoria">
              {categoryFilters.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`shop__pill ${category === cat ? 'shop__pill--active' : ''}`}
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="shop__filter-group shop__price-range">
            <span className="shop__filter-label">Faixa de preço</span>
            <div className="shop__price-values">
              <span>
                Até <strong>{formatPrice(maxPrice)}</strong>
              </span>
            </div>
            <input
              type="range"
              className="shop__range-input"
              min={priceBounds.min}
              max={priceBounds.max}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Preço máximo"
            />
          </div>

          <div className="shop__filter-group shop__sort">
            <label className="shop__filter-label" htmlFor="shop-sort">
              Ordenar por
            </label>
            <select
              id="shop-sort"
              className="shop__sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="shop__results">
          <p className="shop__count">
            <strong>{filteredProducts.length}</strong>{' '}
            {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </p>
        </div>

        <div className="shop__grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))
          ) : (
            <div className="shop__empty">
              <p className="shop__empty-title">Nenhum produto encontrado</p>
              <p>Ajuste os filtros para explorar nossa coleção completa.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}