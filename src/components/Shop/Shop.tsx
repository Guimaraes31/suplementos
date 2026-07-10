import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PRODUCT_CATEGORIES, type ProductCategory, type SortOption } from '../../cms/types'
import { productsCollection, priceBounds, filterProducts } from '../../cms/products'
import { useShopFilter } from '../../context/ShopFilterContext'
import { formatPrice } from '../../utils/format'
import ProductCard from '../ProductCard/ProductCard'
import FilterPanel from './FilterPanel'
import './Shop.css'

const categoryFilters: (ProductCategory | 'Todos')[] = ['Todos', ...PRODUCT_CATEGORIES]

const sortLabels: Record<SortOption, string> = {
  relevancia: 'Relevância',
  'menor-preco': 'Menor Preço',
  'mais-vendidos': 'Mais Vendidos',
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
    </svg>
  )
}

function useIsMobileFilter(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : true,
  )

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoint])

  return isMobile
}

export default function Shop() {
  const { filters, updateFilter, clearFilters, setCategory, setQuery } = useShopFilter()
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const isMobileFilter = useIsMobileFilter()

  const filteredProducts = useMemo(
    () => filterProducts(
      productsCollection,
      filters.category,
      filters.minPrice,
      filters.maxPrice,
      filters.sort,
      filters.query,
    ),
    [filters],
  )

  const syncUrl = (next: {
    category?: ProductCategory | 'Todos'
    sort?: SortOption
    query?: string
  }) => {
    const params = new URLSearchParams(searchParams)
    const category = next.category ?? filters.category
    const sort = next.sort ?? filters.sort
    const query = next.query ?? filters.query

    if (category !== 'Todos') params.set('categoria', category)
    else params.delete('categoria')

    if (sort !== 'relevancia') params.set('sort', sort)
    else params.delete('sort')

    if (query.trim()) params.set('q', query.trim())
    else params.delete('q')

    setSearchParams(params, { replace: true })
  }

  const handleCategory = (cat: ProductCategory | 'Todos') => {
    setCategory(cat)
    syncUrl({ category: cat })
  }

  const handleSort = (sort: SortOption) => {
    updateFilter('sort', sort)
    syncUrl({ sort })
  }

  const handleQueryChange = (value: string) => {
    setQuery(value)
    syncUrl({ query: value })
  }

  const handleClear = () => {
    clearFilters()
    setSearchParams({}, { replace: true })
  }

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.category !== 'Todos') count++
    if (filters.minPrice > priceBounds.min || filters.maxPrice < priceBounds.max) count++
    if (filters.sort !== 'relevancia') count++
    if (filters.query.trim()) count++
    return count
  }, [filters])

  const activeTags = useMemo(() => {
    const tags: { id: string; label: string; clear: () => void }[] = []

    if (filters.query.trim()) {
      tags.push({
        id: 'query',
        label: `Busca: ${filters.query}`,
        clear: () => handleQueryChange(''),
      })
    }

    if (filters.category !== 'Todos') {
      tags.push({
        id: 'category',
        label: filters.category,
        clear: () => handleCategory('Todos'),
      })
    }

    if (filters.minPrice > priceBounds.min || filters.maxPrice < priceBounds.max) {
      tags.push({
        id: 'price',
        label: `${formatPrice(filters.minPrice)} — ${formatPrice(filters.maxPrice)}`,
        clear: () => {
          updateFilter('minPrice', priceBounds.min)
          updateFilter('maxPrice', priceBounds.max)
        },
      })
    }

    if (filters.sort !== 'relevancia') {
      tags.push({
        id: 'sort',
        label: sortLabels[filters.sort],
        clear: () => handleSort('relevancia'),
      })
    }

    return tags
  }, [filters, updateFilter])

  useEffect(() => {
    document.body.style.overflow = filterOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [filterOpen])

  return (
    <section
      className={`shop ${filters.category !== 'Todos' ? 'shop--category-active' : ''}`}
      id="loja-produtos"
      aria-labelledby="shop-title"
    >
      <div className="container">
        <header className="shop__header">
          <div className="shop__eyebrow">
            <span className="shop__eyebrow-line" aria-hidden="true" />
            <span className="shop__eyebrow-text">Loja</span>
          </div>
          <h2 className="shop__title" id="shop-title">
            Nossa loja
          </h2>
          <p className="shop__subtitle">
            Whey, creatina, pré-treino e mais — busque, filtre por categoria ou preço. Precisa de indicação? Chame no WhatsApp.
          </p>
        </header>

        <div className="shop__trust" aria-label="Benefícios da loja">
          <span className="shop__trust-item">Orientação antes de comprar</span>
          <span className="shop__trust-sep" aria-hidden="true" />
          <span className="shop__trust-item">Preço justo</span>
          <span className="shop__trust-sep" aria-hidden="true" />
          <span className="shop__trust-item">Entrega rápida · Zona Sul</span>
        </div>

        <label className="shop__search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20L16.5 16.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            className="shop__search-input"
            placeholder="Buscar por nome, categoria ou benefício..."
            value={filters.query}
            onChange={(e) => handleQueryChange(e.target.value)}
            aria-label="Buscar produtos na loja"
          />
        </label>

        <div className="shop__toolbar">
          <button
            type="button"
            className="shop__filter-btn"
            onClick={() => setFilterOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={filterOpen}
          >
            <FilterIcon />
            <span>Filtrar</span>
            {activeFilterCount > 0 && (
              <span className="shop__filter-badge" aria-label={`${activeFilterCount} filtros ativos`}>
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="shop__pills-scroll" role="group" aria-label="Filtrar por categoria">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`shop__pill ${filters.category === cat ? 'shop__pill--active' : ''}`}
                onClick={() => handleCategory(cat)}
                aria-pressed={filters.category === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {activeTags.length > 0 && (
          <motion.div
            className="shop__active-filters"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span className="shop__active-label">Filtros ativos</span>
            <div className="shop__active-tags">
              {activeTags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  className="shop__active-tag"
                  onClick={tag.clear}
                  aria-label={`Remover filtro: ${tag.label}`}
                >
                  {tag.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              ))}
            </div>
            <button type="button" className="shop__clear-all" onClick={handleClear}>
              Limpar filtros
            </button>
          </motion.div>
        )}

        <div className="shop__results">
          <p className="shop__count">
            <strong>{filteredProducts.length}</strong>{' '}
            {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            {filters.query.trim() ? ` para “${filters.query.trim()}”` : ''}
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
              <p>Ajuste a busca ou os filtros para explorar a loja.</p>
              <button type="button" className="shop__empty-reset" onClick={handleClear}>
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              className="shop__filter-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setFilterOpen(false)}
              aria-hidden="true"
            />

            <motion.aside
              className="shop__filter-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Filtros de produtos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="shop__filter-panel-inner"
                initial={isMobileFilter ? { y: '100%' } : { x: '100%' }}
                animate={isMobileFilter ? { y: 0 } : { x: 0 }}
                exit={isMobileFilter ? { y: '100%' } : { x: '100%' }}
                transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              >
                <div className="shop__filter-handle" aria-hidden="true" />

                <header className="shop__filter-header">
                  <div>
                    <span className="shop__filter-eyebrow">Refinar busca</span>
                    <h3 className="shop__filter-title">Filtros</h3>
                  </div>
                  <button
                    type="button"
                    className="shop__filter-close"
                    onClick={() => setFilterOpen(false)}
                    aria-label="Fechar filtros"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                    </svg>
                  </button>
                </header>

                <div className="shop__filter-body">
                  <FilterPanel
                    filters={filters}
                    priceMin={priceBounds.min}
                    priceMax={priceBounds.max}
                    onCategoryChange={handleCategory}
                    onMinPriceChange={(v) => updateFilter('minPrice', v)}
                    onMaxPriceChange={(v) => updateFilter('maxPrice', v)}
                    onSortChange={handleSort}
                    variant={isMobileFilter ? 'sheet' : 'sidebar'}
                  />
                </div>

                <footer className="shop__filter-footer">
                  <button type="button" className="shop__filter-clear" onClick={handleClear}>
                    Limpar
                  </button>
                  <button type="button" className="shop__filter-apply" onClick={() => setFilterOpen(false)}>
                    Ver {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
                  </button>
                </footer>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}