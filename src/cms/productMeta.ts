import type { Product, ProductCategory } from './types'

type ProductMeta = Pick<Product, 'benefits' | 'flavors' | 'sizes'>

const categoryDefaults: Record<ProductCategory, ProductMeta> = {
  'Whey Protein': {
    benefits: ['Proteína pro treino e recuperação', 'Vários sabores e formatos', 'Peça indicação se estiver em dúvida'],
    flavors: ['Chocolate', 'Baunilha', 'Morango'],
    sizes: ['Sachê', '900g', '1kg'],
  },
  Creatina: {
    benefits: ['Apoio a força e performance', 'Uso diário simples', 'Orientação na loja ou WhatsApp'],
    sizes: ['300g', '500g'],
  },
  'Pré-Treino': {
    benefits: ['Energia e foco no treino', 'Opções com e sem estimulantes fortes', 'Pergunte antes de escolher'],
    flavors: ['Fruit Punch', 'Frutas Vermelhas', 'Limão'],
    sizes: ['150g', '300g', '500g'],
  },
  Hipercalóricos: {
    benefits: ['Alto valor calórico para ganho de massa', 'Combina proteína e carboidrato', 'Ideal com orientação da loja'],
    flavors: ['Chocolate', 'Morango', 'Baunilha'],
    sizes: ['3kg'],
  },
  Aminoácidos: {
    benefits: ['Apoio à recuperação e performance', 'Complementa a rotina de treino', 'Combine com whey e creatina'],
    sizes: ['123g', '300g'],
  },
  Vitaminas: {
    benefits: ['Suporte nutricional do dia a dia', 'Complementa a alimentação', 'Não substitua avaliação profissional'],
    sizes: ['30 cápsulas', '60 cápsulas'],
  },
  Snacks: {
    benefits: ['Praticidade no dia a dia', 'Opção proteica entre refeições', 'Confira sabores disponíveis na loja'],
    flavors: ['Caramelo', 'Chocolate'],
    sizes: ['Unidade'],
  },
  Acessórios: {
    benefits: ['Praticidade no treino e na hidratação', 'Complementa sua rotina de suplementação', 'Peça no WhatsApp se tiver dúvida'],
    sizes: ['Padrão'],
  },
}

const metaById: Partial<Record<string, Partial<ProductMeta>>> = {
  'creatina-monohidratada-300g-pura': {
    benefits: ['Monohidratada clássica', 'Uso diário simples', 'Um dos mais pedidos da loja'],
    sizes: ['300g'],
  },
  'whey-protein-concentrado-900g-dark-whey': {
    benefits: ['Whey concentrado Darkness', 'Boa opção pós-treino', 'Confira sabor e estoque com a loja'],
    sizes: ['900g'],
  },
  'p-w-psichotic-dragon-500g': {
    benefits: ['Pré-treino hardcore', 'Ideal se você busca intensidade', 'Pergunte se é o perfil certo pra você'],
    sizes: ['500g', 'Sachê 10g'],
  },
  'captain-gainer-3kg': {
    benefits: ['Hipercalórico para ganho de massa', 'Alto aporte calórico', 'Bom custo-benefício em 3kg'],
    sizes: ['3kg'],
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
