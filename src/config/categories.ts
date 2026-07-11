import type { ProductCategory } from '../cms/types'

export interface CategoryMeta {
  slug: string
  name: ProductCategory
  /** Rótulo de exibição (pode ser mais amigável que o enum) */
  label: string
  shortDescription: string
  /** Conteúdo SEO / orientação — só o que a loja pode afirmar */
  seoIntro: string
  seoTips: string[]
  /** Foto de um produto real da categoria */
  image: string
}

/** Imagens de categorias = produtos reais do catálogo (evita stock genérico). */
const categoryProductImages = {
  whey: '/images/products/whey-protein-concentrado-900g-dark-whey.jpg',
  creatina: '/images/products/creatina-monohidratada-300g-pura.jpg',
  preTreino: '/images/products/evora-vulcan-300g.jpg',
  hipercaloricos: '/images/products/captain-gainer-3kg.jpg',
  aminoacidos: '/images/products/beta-alanina-pure-integralmedica-123g.jpg',
  vitaminas: '/images/products/vitapure-super-60cp.jpg',
  snacks: '/images/products/protein-crisp-bar-45g.jpg',
  acessorios: '/images/products/galao-dark-2-2-l.jpg',
} as const

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: 'whey-protein',
    name: 'Whey Protein',
    label: 'Whey Protein',
    shortDescription: 'Proteína pro dia a dia de treino — escolha com orientação, sem chute.',
    seoIntro:
      'Whey protein e outras proteínas da Nascimento Suplementos. Ajudamos você a escolher o formato e o sabor que fazem sentido pro seu objetivo e rotina — sem pressão.',
    seoTips: [
      'Diga se prefere concentrado, isolado, beef ou proteína de ovo.',
      'Combine com creatina se o foco for força e consistência no treino.',
      'Em dúvida de dose ou horário? Peça orientação no WhatsApp.',
    ],
    image: categoryProductImages.whey,
  },
  {
    slug: 'creatina',
    name: 'Creatina',
    label: 'Creatina',
    shortDescription: 'Força e performance. A gente te ajuda a achar a opção certa pro seu uso.',
    seoIntro:
      'Creatina monohidratada, Crealkaline, Darkness e outras opções para quem treina com foco em força e performance. Na loja, orientamos uso simples e contínuo — sem complicar.',
    seoTips: [
      'Uso diário costuma ser mais importante do que “fase de carga” complexa.',
      'Pergunte se monohidratada, Crealkaline ou outra opção encaixa melhor.',
      'Combine com whey se quiser montar um kit básico.',
    ],
    image: categoryProductImages.creatina,
  },
  {
    slug: 'pre-treino',
    name: 'Pré-Treino',
    label: 'Pré-Treino',
    shortDescription: 'Energia e foco no treino. Tem dúvida de dose ou tipo? Pergunte antes de comprar.',
    seoIntro:
      'Pré-treinos Darkness, Demons Lab, Integralmédica e mais. Nem todo mundo precisa da fórmula mais forte — por isso orientamos antes de vender, para você não gastar à toa nem passar do ponto.',
    seoTips: [
      'Conte se você é sensível à cafeína.',
      'Evite usar tarde da noite se o sono for prioridade.',
      'Prefere estímulo leve ou sem cafeína? Peça opção moderada ou Vasculor.',
    ],
    image: categoryProductImages.preTreino,
  },
  {
    slug: 'hipercaloricos',
    name: 'Hipercalóricos',
    label: 'Hipercalóricos',
    shortDescription: 'Ganho de massa com alto aporte calórico — com orientação da loja.',
    seoIntro:
      'Hipercalóricos e mass gainers para quem busca ganho de peso e volume. Montamos combinações com creatina e pré-treino quando faz sentido.',
    seoTips: [
      'Refeição completa continua sendo a base do ganho de massa.',
      'Hipercalórico é complemento — não substitui alimentação.',
      'Peça indicação se estiver montando a rotina do zero.',
    ],
    image: categoryProductImages.hipercaloricos,
  },
  {
    slug: 'aminoacidos',
    name: 'Aminoácidos',
    label: 'Aminoácidos',
    shortDescription: 'Beta-alanina, glutamina e mais para complementar a rotina de treino.',
    seoIntro:
      'Aminoácidos e isolados para quem quer suporte extra na recuperação e na performance. A gente orienta o que faz sentido pro seu caso.',
    seoTips: [
      'Não são obrigatórios pra todo mundo — pergunte antes de montar o kit.',
      'Combine com whey e creatina se quiser uma base completa.',
      'Dúvida de dose? Chame no WhatsApp.',
    ],
    image: categoryProductImages.aminoacidos,
  },
  {
    slug: 'vitaminas-minerais',
    name: 'Vitaminas',
    label: 'Vitaminas & Minerais',
    shortDescription: 'Suporte nutricional. Oriente-se para não gastar com o que você não precisa.',
    seoIntro:
      'Vitaminas, multivitamínicos e coenzima Q10 para complementar a alimentação. A ideia é orientar: nem todo suplemento “de prateleira” é prioridade pro seu caso.',
    seoTips: [
      'Suplemento não substitui avaliação profissional quando há carência ou condição de saúde.',
      'Multivitamínico e Coq-10 estão entre as opções da loja.',
      'Dúvida entre opções? Chame no WhatsApp.',
    ],
    image: categoryProductImages.vitaminas,
  },
  {
    slug: 'snacks',
    name: 'Snacks',
    label: 'Snacks & Barras',
    shortDescription: 'Barras e snacks proteicos para o dia a dia.',
    seoIntro:
      'Snacks e barras proteicas para quem quer praticidade entre refeições ou no pós-treino — sem complicar a rotina.',
    seoTips: [
      'Confira sabores e estoque no WhatsApp.',
      'Ideal para levar na bolsa ou no trabalho.',
      'Combine com whey se quiser mais proteína no dia.',
    ],
    image: categoryProductImages.snacks,
  },
  {
    slug: 'acessorios',
    name: 'Acessórios',
    label: 'Acessórios',
    shortDescription: 'Galões, coqueteleiras e itens pra facilitar o treino.',
    seoIntro:
      'Acessórios para hidratação e preparo de shake: galões e coqueteleiras das marcas que você já encontra na loja.',
    seoTips: [
      'Galão ajuda a manter a hidratação ao longo do dia.',
      'Coqueteleira facilita o preparo do whey e pré-treino.',
      'Pergunte no WhatsApp se tiver dúvida de tamanho.',
    ],
    image: categoryProductImages.acessorios,
  },
]

export const categoryBySlug = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c]),
) as Record<string, CategoryMeta>

export const slugByCategory = Object.fromEntries(
  CATEGORIES.map((c) => [c.name, c.slug]),
) as Record<ProductCategory, string>

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categoryBySlug[slug]
}

export function getCategorySlug(category: ProductCategory): string {
  return slugByCategory[category]
}
