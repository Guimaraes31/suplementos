export const PRODUCT_CATEGORIES = [
  'Whey Protein',
  'Creatina',
  'Pré-Treino',
  'Hipercalóricos',
  'Aminoácidos',
  'Vitaminas',
  'Snacks',
  'Acessórios',
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export type ProductBadge =
  | 'Mais Vendido'
  | 'Lançamento'
  | 'Premium'
  | 'Oferta'
  | null

export type StockStatus = 'Em estoque' | 'Últimas unidades' | 'Esgotado'

export type SortOption = 'relevancia' | 'menor-preco' | 'mais-vendidos'

/**
 * Framer CMS Collection: "Products"
 * Fields: Name, Price, Category, Image, Short Description, Badge, Stock Status,
 * Benefits, Flavors, Sizes
 */
export interface Product {
  id: string
  name: string
  price: number
  category: ProductCategory
  image: string
  shortDescription: string
  badge: ProductBadge
  stockStatus: StockStatus
  salesRank: number
  benefits: string[]
  flavors?: string[]
  sizes?: string[]
}

export interface ProductFilters {
  category: ProductCategory | 'Todos'
  minPrice: number
  maxPrice: number
  sort: SortOption
}

export interface ProductVariant {
  flavor?: string
  size?: string
}
