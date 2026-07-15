export const NAV_LINKS = [
  { id: 'inicio', label: 'Início', to: '/' },
  { id: 'loja', label: 'Loja', to: '/loja' },
  { id: 'categorias', label: 'Categorias', to: '/categorias' },
  { id: 'mais-vendidos', label: 'Mais Vendidos', to: '/#mais-vendidos' },
  { id: 'sobre', label: 'Sobre Nós', to: '/#sobre' },
  { id: 'contato', label: 'Contato', to: '/#contato' },
] as const

export type NavLinkId = (typeof NAV_LINKS)[number]['id']

/** Seções âncora só existem na home (ordem de aparição na página) */
export const HOME_SECTION_IDS = ['inicio', 'mais-vendidos', 'sobre', 'depoimentos', 'especialista', 'contato'] as const

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number]

/** Seções sem link próprio no header herdam o destaque do item mais próximo */
export const SCROLL_SECTION_TO_NAV: Record<HomeSectionId, NavLinkId> = {
  inicio: 'inicio',
  'mais-vendidos': 'mais-vendidos',
  sobre: 'sobre',
  depoimentos: 'sobre',
  especialista: 'contato',
  contato: 'contato',
}

export function getScrollSpyOffset(extra = 12): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--site-top-height').trim()
  const base = Number.parseFloat(raw)
  return (Number.isFinite(base) ? base : 116) + extra
}

export function resolveNavLinkFromScrollSection(sectionId: string): NavLinkId | '' {
  if (!sectionId) return 'inicio'
  return SCROLL_SECTION_TO_NAV[sectionId as HomeSectionId] ?? ''
}

export function scrollToSection(id: string, behavior: ScrollBehavior = 'smooth') {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior, block: 'start' })
  }
}

export function productPath(id: string) {
  return `/produto/${id}`
}

export function categoryPath(slug: string) {
  return `/categoria/${slug}`
}

export function shopPath(params?: { q?: string; categoria?: string; sort?: string }) {
  if (!params) return '/loja'
  const search = new URLSearchParams()
  if (params.q) search.set('q', params.q)
  if (params.categoria && params.categoria !== 'Todos') search.set('categoria', params.categoria)
  if (params.sort && params.sort !== 'relevancia') search.set('sort', params.sort)
  const qs = search.toString()
  return qs ? `/loja?${qs}` : '/loja'
}
