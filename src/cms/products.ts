import type { Product } from './types'
import { enrichProduct } from './productMeta'
import { images } from '../assets/images'

const rawProducts = [
  {
    id: 'whey-gold-isolate',
    name: 'Whey Gold Isolate 900g',
    price: 189.9,
    category: 'Whey Protein',
    image: images.products.wheyGold,
    shortDescription: 'Whey isolado de absorção rápida — um dos mais pedidos para pós-treino.',
    badge: 'Mais Vendido',
    stockStatus: 'Em estoque',
    salesRank: 98,
  },
  {
    id: 'whey-concentrado-premium',
    name: 'Whey Concentrado Premium 1kg',
    price: 149.9,
    category: 'Whey Protein',
    image: images.products.wheyConcentrado,
    shortDescription: 'Whey concentrado para o dia a dia de treino e recuperação.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 72,
  },
  {
    id: 'whey-vegan-plant',
    name: 'Whey Vegan Plant 800g',
    price: 169.9,
    category: 'Whey Protein',
    image: images.products.wheyVegan,
    shortDescription: 'Proteína vegetal — opção para quem prefere fórmula plant-based.',
    badge: 'Lançamento',
    stockStatus: 'Em estoque',
    salesRank: 65,
  },
  {
    id: 'creatina-monohidratada',
    name: 'Creatina Monohidratada 300g',
    price: 89.9,
    category: 'Creatina',
    image: images.products.creatinaMono,
    shortDescription: 'Creatina monohidratada — base clássica para força e performance no treino.',
    badge: 'Mais Vendido',
    stockStatus: 'Em estoque',
    salesRank: 95,
  },
  {
    id: 'creatina-hcl',
    name: 'Creatina HCL 120 cápsulas',
    price: 119.9,
    category: 'Creatina',
    image: images.products.creatinaHcl,
    shortDescription: 'Creatina HCL em cápsulas — prática para quem prefere não medir pó.',
    badge: 'Premium',
    stockStatus: 'Últimas unidades',
    salesRank: 58,
  },
  {
    id: 'pre-treino-fury',
    name: 'Pré-Treino Fury Black 300g',
    price: 129.9,
    category: 'Pré-Treino',
    image: images.products.preFury,
    shortDescription: 'Pré-treino para energia e intensidade — pergunte se combina com seu perfil.',
    badge: 'Lançamento',
    stockStatus: 'Em estoque',
    salesRank: 81,
  },
  {
    id: 'pre-treino-focus',
    name: 'Pré-Treino Focus Energy',
    price: 99.9,
    category: 'Pré-Treino',
    image: images.products.preFocus,
    shortDescription: 'Pré-treino de estímulo moderado — boa porta de entrada se você está começando.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 54,
  },
  {
    id: 'pos-treino-recovery',
    name: 'Pós-Treino Recovery Plus',
    price: 109.9,
    category: 'Pós-Treino',
    image: images.products.posRecovery,
    shortDescription: 'Pós-treino para reposição e recuperação após treinos pesados.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 67,
  },
  {
    id: 'bcaa-pos-treino',
    name: 'BCAA 2:1:1 Recovery',
    price: 79.9,
    category: 'Pós-Treino',
    image: images.products.bcaa,
    shortDescription: 'BCAA para quem quer aminoácidos no pós-treino ou ao longo do dia.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 48,
  },
  {
    id: 'multivitaminico-athlete',
    name: 'Multivitamínico Athlete',
    price: 69.9,
    category: 'Vitaminas',
    image: images.products.multi,
    shortDescription: 'Multivitamínico de uso diário para complementar a alimentação.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 61,
  },
  {
    id: 'vitamina-d3-k2',
    name: 'Vitamina D3 + K2',
    price: 49.9,
    category: 'Vitaminas',
    image: images.products.vitaminaD3,
    shortDescription: 'Vitamina D3 com K2 — suporte nutricional popular na rotina de treino.',
    badge: 'Mais Vendido',
    stockStatus: 'Em estoque',
    salesRank: 88,
  },
  {
    id: 'omega-3-ultra',
    name: 'Omega 3 Ultra Pure',
    price: 89.9,
    category: 'Vitaminas',
    image: images.products.omega3,
    shortDescription: 'Ômega 3 com EPA e DHA — complemento clássico da rotina alimentar.',
    badge: 'Premium',
    stockStatus: 'Em estoque',
    salesRank: 55,
  },
  {
    id: 'pack-massa-muscular',
    name: 'Pack Massa Muscular',
    price: 349.9,
    category: 'Packs',
    image: images.products.packMassa,
    shortDescription: 'Kit whey + creatina + pré-treino para quem busca ganho de massa.',
    badge: 'Oferta',
    stockStatus: 'Em estoque',
    salesRank: 76,
  },
  {
    id: 'pack-cutting',
    name: 'Pack Cutting Definição',
    price: 299.9,
    category: 'Packs',
    image: images.products.packCutting,
    shortDescription: 'Kit com whey isolate, BCAA e termogênico para fase de definição.',
    badge: null,
    stockStatus: 'Últimas unidades',
    salesRank: 63,
  },
  {
    id: 'pack-iniciante',
    name: 'Pack Iniciante Premium',
    price: 249.9,
    category: 'Packs',
    image: images.products.packIniciante,
    shortDescription: 'Kit para quem está começando — menos dúvida e melhor custo-benefício.',
    badge: 'Mais Vendido',
    stockStatus: 'Em estoque',
    salesRank: 91,
  },
  {
    id: 'zma-night',
    name: 'ZMA Night Recovery',
    price: 59.9,
    category: 'Vitaminas',
    image: images.products.zma,
    shortDescription: 'ZMA com zinco, magnésio e B6 — uso noturno comum na rotina de treino.',
    badge: null,
    stockStatus: 'Esgotado',
    salesRank: 42,
  },
] as const

export const productsCollection: Product[] = rawProducts.map((p) => enrichProduct(p))

export const priceBounds = {
  min: Math.min(...productsCollection.map((p) => p.price)),
  max: Math.max(...productsCollection.map((p) => p.price)),
}

export function getBestSellers(limit = 6): Product[] {
  return [...productsCollection]
    .filter((p) => p.stockStatus !== 'Esgotado')
    .sort((a, b) => b.salesRank - a.salesRank)
    .slice(0, limit)
}

export function getProductById(id: string): Product | undefined {
  return productsCollection.find((p) => p.id === id)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return productsCollection
    .filter((p) => p.id !== product.id && p.category === product.category && p.stockStatus !== 'Esgotado')
    .sort((a, b) => b.salesRank - a.salesRank)
    .slice(0, limit)
}

export function searchProducts(query: string, products: Product[] = productsCollection): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return products
  return products.filter((p) => {
    const haystack = [
      p.name,
      p.category,
      p.shortDescription,
      p.badge ?? '',
      ...(p.benefits ?? []),
      ...(p.flavors ?? []),
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
}

export function filterProducts(
  products: Product[],
  category: Product['category'] | 'Todos',
  minPrice: number,
  maxPrice: number,
  sort: 'relevancia' | 'menor-preco' | 'mais-vendidos',
  query = '',
): Product[] {
  let result = products.filter(
    (p) =>
      (category === 'Todos' || p.category === category) &&
      p.price >= minPrice &&
      p.price <= maxPrice,
  )

  if (query.trim()) {
    result = searchProducts(query, result)
  }

  switch (sort) {
    case 'menor-preco':
      result = [...result].sort((a, b) => a.price - b.price)
      break
    case 'mais-vendidos':
      result = [...result].sort((a, b) => b.salesRank - a.salesRank)
      break
    default:
      result = [...result].sort((a, b) => {
        if (a.stockStatus === 'Esgotado' && b.stockStatus !== 'Esgotado') return 1
        if (b.stockStatus === 'Esgotado' && a.stockStatus !== 'Esgotado') return -1
        return b.salesRank - a.salesRank
      })
  }

  return result
}