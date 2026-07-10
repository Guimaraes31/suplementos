import type { Product, ProductCategory } from './types'

type ProductMeta = Pick<Product, 'benefits' | 'flavors' | 'sizes'>

const categoryDefaults: Record<ProductCategory, ProductMeta> = {
  'Whey Protein': {
    benefits: ['Proteína pro treino e recuperação', 'Vários sabores e formatos', 'Peça indicação se estiver em dúvida'],
    flavors: ['Chocolate', 'Baunilha', 'Morango'],
    sizes: ['450g', '900g', '1kg'],
  },
  Creatina: {
    benefits: ['Apoio a força e performance', 'Uso diário simples', 'Orientação na loja ou WhatsApp'],
    sizes: ['150g', '300g'],
  },
  'Pré-Treino': {
    benefits: ['Energia e foco no treino', 'Opções com e sem estimulantes fortes', 'Pergunte antes de escolher'],
    flavors: ['Fruit Punch', 'Limão', 'Uva'],
    sizes: ['200g', '300g'],
  },
  'Pós-Treino': {
    benefits: ['Apoio à recuperação', 'Complementa a refeição pós-treino', 'Combine com whey e creatina'],
    flavors: ['Tangerina', 'Frutas Vermelhas'],
    sizes: ['500g', '1kg'],
  },
  Vitaminas: {
    benefits: ['Suporte nutricional do dia a dia', 'Complementa a alimentação', 'Não substitua avaliação profissional'],
    sizes: ['60 cápsulas', '90 cápsulas', '120 cápsulas'],
  },
  Packs: {
    benefits: ['Combinação pronta para começar', 'Bom custo-benefício', 'Menos dúvida na hora de montar o kit'],
    sizes: ['Kit Padrão', 'Kit Completo'],
  },
}

const metaById: Partial<Record<string, Partial<ProductMeta>>> = {
  'whey-gold-isolate': {
    benefits: ['Isolado de rápida absorção', 'Boa opção pós-treino', 'Confira sabor e tamanho com a loja'],
    flavors: ['Chocolate', 'Baunilha', 'Cookies & Cream'],
    sizes: ['450g', '900g'],
  },
  'creatina-monohidratada': {
    benefits: ['Monohidratada clássica', 'Uso diário simples', 'Um dos mais pedidos da loja'],
    sizes: ['150g', '300g'],
  },
  'pre-treino-fury': {
    benefits: ['Mais energia no treino', 'Ideal se você busca intensidade', 'Pergunte se é o perfil certo pra você'],
    flavors: ['Black Energy', 'Limão'],
    sizes: ['200g', '300g'],
  },
  'pack-massa-muscular': {
    benefits: ['Whey + creatina + pré-treino', 'Kit para quem busca ganho de massa', 'Economia em relação a comprar separado'],
    sizes: ['Kit Padrão', 'Kit Completo'],
  },
}

export function enrichProduct<T extends Omit<Product, 'benefits'> & Partial<Pick<Product, 'benefits' | 'flavors' | 'sizes'>>>(
  product: T,
): Product {
  const specific = metaById[product.id]
  const defaults = categoryDefaults[product.category]

  return {
    ...product,
    benefits: product.benefits ?? specific?.benefits ?? defaults.benefits,
    flavors: product.flavors ?? specific?.flavors ?? defaults.flavors,
    sizes: product.sizes ?? specific?.sizes ?? defaults.sizes,
  }
}
