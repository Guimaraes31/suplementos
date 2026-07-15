import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Shop from '../components/Shop/Shop'
import { useShopFilter } from '../context/ShopFilterContext'
import type { ProductCategory, SortOption } from '../cms/types'
import { PRODUCT_CATEGORIES } from '../cms/types'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './pages.css'

function parseCategory(value: string | null): ProductCategory | 'Todos' {
  if (!value) return 'Todos'
  if (value === 'Todos') return 'Todos'
  return (PRODUCT_CATEGORIES as readonly string[]).includes(value)
    ? (value as ProductCategory)
    : 'Todos'
}

function parseSort(value: string | null): SortOption {
  if (value === 'menor-preco' || value === 'mais-vendidos' || value === 'relevancia') return value
  return 'relevancia'
}

export default function ShopPage() {
  const [searchParams] = useSearchParams()
  const { applyFilters } = useShopFilter()

  useDocumentTitle(
    'Loja | Nascimento Suplementos',
    'Compre whey, creatina, pré-treino e mais na Nascimento Suplementos. Filtre por categoria, busque e peça orientação no WhatsApp.',
  )

  useEffect(() => {
    applyFilters({
      category: parseCategory(searchParams.get('categoria')),
      sort: parseSort(searchParams.get('sort')),
      query: searchParams.get('q') ?? '',
    })
  }, [searchParams, applyFilters])

  return (
    <section className="page-section shop-page">
      <div className="container shop-page__top">
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Início</Link>
          <span aria-hidden="true">/</span>
          <span>Loja</span>
        </nav>
      </div>
      <Shop />
    </section>
  )
}
