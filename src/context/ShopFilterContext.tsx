import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ProductCategory, SortOption } from '../cms/types'
import { SHOP_PRICE_BOUNDS } from '../config/shop'

export interface ShopFilterState {
  category: ProductCategory | 'Todos'
  minPrice: number
  maxPrice: number
  sort: SortOption
  query: string
}

interface ShopFilterContextValue {
  filters: ShopFilterState
  setCategory: (category: ProductCategory | 'Todos') => void
  setMinPrice: (value: number) => void
  setMaxPrice: (value: number) => void
  setSort: (sort: SortOption) => void
  setQuery: (query: string) => void
  updateFilter: <K extends keyof ShopFilterState>(key: K, value: ShopFilterState[K]) => void
  clearFilters: () => void
  /** Aplica filtros parciais de uma vez (ex.: query string da URL) */
  applyFilters: (partial: Partial<ShopFilterState>) => void
}

const defaultFilters = (): ShopFilterState => ({
  category: 'Todos',
  minPrice: SHOP_PRICE_BOUNDS.min,
  maxPrice: SHOP_PRICE_BOUNDS.max,
  sort: 'relevancia',
  query: '',
})

const ShopFilterContext = createContext<ShopFilterContextValue | null>(null)

export function ShopFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<ShopFilterState>(defaultFilters)

  const updateFilter = useCallback(<K extends keyof ShopFilterState>(key: K, value: ShopFilterState[K]) => {
    setFilters((f) => ({ ...f, [key]: value }))
  }, [])

  const setCategory = useCallback((category: ProductCategory | 'Todos') => {
    updateFilter('category', category)
  }, [updateFilter])

  const clearFilters = useCallback(() => setFilters(defaultFilters()), [])

  const applyFilters = useCallback((partial: Partial<ShopFilterState>) => {
    setFilters((f) => ({ ...f, ...partial }))
  }, [])

  const value = useMemo<ShopFilterContextValue>(
    () => ({
      filters,
      setCategory,
      setMinPrice: (v) => updateFilter('minPrice', v),
      setMaxPrice: (v) => updateFilter('maxPrice', v),
      setSort: (s) => updateFilter('sort', s),
      setQuery: (q) => updateFilter('query', q),
      updateFilter,
      clearFilters,
      applyFilters,
    }),
    [filters, setCategory, clearFilters, updateFilter, applyFilters],
  )

  return (
    <ShopFilterContext.Provider value={value}>
      {children}
    </ShopFilterContext.Provider>
  )
}

export function useShopFilter() {
  const ctx = useContext(ShopFilterContext)
  if (!ctx) throw new Error('useShopFilter must be used within ShopFilterProvider')
  return ctx
}
