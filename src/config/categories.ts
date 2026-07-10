import { images } from '../assets/images'
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
  image: string
}

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: 'whey-protein',
    name: 'Whey Protein',
    label: 'Whey Protein',
    shortDescription: 'Proteína pro dia a dia de treino — escolha com orientação, sem chute.',
    seoIntro:
      'Whey protein é um dos suplementos mais pedidos na Nascimento. Ajudamos você a escolher o formato e o sabor que fazem sentido pro seu objetivo e rotina — sem pressão.',
    seoTips: [
      'Diga se prefere concentrado, isolado ou plant-based.',
      'Combine com creatina se o foco for força e consistência no treino.',
      'Em dúvida de dose ou horário? Peça orientação no WhatsApp.',
    ],
    image: images.categories.whey,
  },
  {
    slug: 'creatina',
    name: 'Creatina',
    label: 'Creatina',
    shortDescription: 'Força e performance. A gente te ajuda a achar a opção certa pro seu uso.',
    seoIntro:
      'Creatina monohidratada e outras opções para quem treina com foco em força e performance. Na loja, orientamos uso simples e contínuo — sem complicar.',
    seoTips: [
      'Uso diário costuma ser mais importante do que “fase de carga” complexa.',
      'Pergunte se cápsula ou pó encaixa melhor na sua rotina.',
      'Combine com whey se quiser montar um kit básico.',
    ],
    image: images.categories.creatina,
  },
  {
    slug: 'pre-treino',
    name: 'Pré-Treino',
    label: 'Pré-Treino',
    shortDescription: 'Energia e foco no treino. Tem dúvida de dose ou tipo? Pergunte antes de comprar.',
    seoIntro:
      'Pré-treinos para energia e foco. Nem todo mundo precisa da fórmula mais forte — por isso orientamos antes de vender, para você não gastar à toa nem passar do ponto.',
    seoTips: [
      'Conte se você é sensível à cafeína.',
      'Evite usar tarde da noite se o sono for prioridade.',
      'Prefere estímulo leve? Peça opção moderada.',
    ],
    image: images.categories.preTreino,
  },
  {
    slug: 'pos-treino',
    name: 'Pós-Treino',
    label: 'Pós-Treino',
    shortDescription: 'Recuperação depois do treino — combine com o resto da sua rotina.',
    seoIntro:
      'Pós-treino e aminoácidos para quem quer fechar o treino com suporte extra. Montamos combinações com whey e creatina quando faz sentido.',
    seoTips: [
      'Refeição completa continua sendo a base da recuperação.',
      'BCAA e recovery são complementos — não obrigatórios pra todo mundo.',
      'Peça indicação se estiver montando a rotina do zero.',
    ],
    image: images.categories.posTreino,
  },
  {
    slug: 'vitaminas-minerais',
    name: 'Vitaminas',
    label: 'Vitaminas & Minerais',
    shortDescription: 'Suporte nutricional. Oriente-se para não gastar com o que você não precisa.',
    seoIntro:
      'Vitaminas, minerais e ômega 3 para complementar a alimentação. A ideia é orientar: nem todo suplemento “de prateleira” é prioridade pro seu caso.',
    seoTips: [
      'Suplemento não substitui avaliação profissional quando há carência ou condição de saúde.',
      'Multivitamínico, D3 e ômega 3 estão entre os mais pedidos.',
      'Dúvida entre opções? Chame no WhatsApp.',
    ],
    image: images.categories.vitaminas,
  },
  {
    slug: 'packs-especiais',
    name: 'Packs',
    label: 'Packs Especiais',
    shortDescription: 'Combinações prontas com bom custo-benefício. Ideal se você quer começar simples.',
    seoIntro:
      'Packs e kits para quem quer menos dúvida na hora de montar a rotina: massa, definição ou iniciante. Bom ponto de partida com orientação da loja.',
    seoTips: [
      'Ideal se você não quer escolher item por item.',
      'Podemos ajustar o kit no WhatsApp conforme seu objetivo.',
      'Compare com comprar separado se preferir montar do zero.',
    ],
    image: images.categories.packs,
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
