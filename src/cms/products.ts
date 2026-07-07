import type { Product } from './types'
import { images } from '../assets/images'

export const productsCollection: Product[] = [
  {
    id: 'whey-gold-isolate',
    name: 'Whey Gold Isolate 900g',
    price: 189.9,
    category: 'Whey Protein',
    image: images.products.wheyGold,
    shortDescription: 'Isolado ultra-filtrado com 27g de proteína por dose. Absorção rápida e sabor refinado.',
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
    shortDescription: 'Blend premium de concentração ideal para ganho muscular e recuperação diária.',
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
    shortDescription: 'Proteína vegetal completa com aminoácidos essenciais. Fórmula clean e digestível.',
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
    shortDescription: 'Pureza farmacêutica certificada. Força, potência e performance comprovadas.',
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
    shortDescription: 'Alta solubilidade e absorção superior. Sem necessidade de fase de carga.',
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
    shortDescription: 'Energia limpa e foco absoluto. Cafeína microencapsulada para liberação gradual.',
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
    shortDescription: 'Estimulante moderado com beta-alanina e citrulina para pumps intensos.',
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
    shortDescription: 'Recuperação acelerada com carboidratos de alto índice e eletrólitos.',
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
    shortDescription: 'Aminoácidos essenciais para reduzir fadiga e preservar massa magra.',
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
    shortDescription: 'Complexo completo formulado para atletas de alta performance.',
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
    shortDescription: 'Sinergia ideal para imunidade, ossos e absorção de cálcio.',
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
    shortDescription: 'Óleo de peixe destilado molecularmente. EPA e DHA em concentração máxima.',
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
    shortDescription: 'Whey + Creatina + Pré-Treino. Combinação exclusiva para hipertrofia.',
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
    shortDescription: 'Whey Isolate + BCAA + Termogênico. Definição muscular com suporte completo.',
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
    shortDescription: 'Seleção curada para quem está começando. Qualidade premium, preço inteligente.',
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
    shortDescription: 'Zinco, magnésio e B6 para sono reparador e recuperação noturna.',
    badge: null,
    stockStatus: 'Esgotado',
    salesRank: 42,
  },
]

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

export function filterProducts(
  products: Product[],
  category: Product['category'] | 'Todos',
  minPrice: number,
  maxPrice: number,
  sort: 'relevancia' | 'menor-preco' | 'mais-vendidos',
): Product[] {
  let result = products.filter(
    (p) =>
      (category === 'Todos' || p.category === category) &&
      p.price >= minPrice &&
      p.price <= maxPrice,
  )

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