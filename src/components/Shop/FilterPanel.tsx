import { PRODUCT_CATEGORIES, type ProductCategory, type SortOption } from '../../cms/types'
import type { ShopFilterState } from '../../context/ShopFilterContext'
import PriceRangeFilter from './PriceRangeFilter'

const categoryFilters: (ProductCategory | 'Todos')[] = ['Todos', ...PRODUCT_CATEGORIES]

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor-preco', label: 'Menor Preço' },
  { value: 'mais-vendidos', label: 'Mais Vendidos' },
]

interface FilterPanelProps {
  filters: ShopFilterState
  priceMin: number
  priceMax: number
  onCategoryChange: (category: ProductCategory | 'Todos') => void
  onMinPriceChange: (value: number) => void
  onMaxPriceChange: (value: number) => void
  onSortChange: (sort: SortOption) => void
  variant?: 'sheet' | 'sidebar'
}

export default function FilterPanel({
  filters,
  priceMin,
  priceMax,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSortChange,
  variant = 'sheet',
}: FilterPanelProps) {
  const pillClass = variant === 'sidebar' ? 'shop__pill shop__pill--sidebar' : 'shop__pill shop__pill--sheet'

  return (
    <div className={`filter-panel filter-panel--${variant}`}>
      <div className="filter-panel__section">
        <span className="shop__filter-label">Categoria</span>
        <div className="shop__sheet-pills" role="group" aria-label="Filtrar por categoria">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${pillClass} ${filters.category === cat ? 'shop__pill--active' : ''}`}
              onClick={() => onCategoryChange(cat)}
              aria-pressed={filters.category === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-panel__section">
        <span className="shop__filter-label">Faixa de preço</span>
        <PriceRangeFilter
          min={priceMin}
          max={priceMax}
          minValue={filters.minPrice}
          maxValue={filters.maxPrice}
          onMinChange={onMinPriceChange}
          onMaxChange={onMaxPriceChange}
        />
      </div>

      <div className="filter-panel__section">
        <label className="shop__filter-label" htmlFor={`shop-sort-${variant}`}>
          Ordenar por
        </label>
        <select
          id={`shop-sort-${variant}`}
          className="shop__sort-select shop__sort-select--panel"
          value={filters.sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

