import type { Product } from './types'
import { enrichProduct } from './productMeta'

/** Catálogo Nascimento Suplementos — preços e textos do iFood (atualizado). */
const rawProducts = [
  {
    id: 'coqueteleira-integral-transparente',
    name: 'Coqueteleira Integral Transparente',
    price: 30,
    category: 'Acessórios',
    image: '/images/products/coqueteleira-integral-transparente.jpg',
    shortDescription: 'A Coqueteleira é a escolha ideal para quem busca praticidade e eficiência na rotina de suplementação e hidratação.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 86,
  },
  {
    id: 'galao-dark-2-2-l',
    name: 'Galão Dark 2,2 L',
    price: 40,
    category: 'Acessórios',
    image: '/images/products/galao-dark-2-2-l.jpg',
    shortDescription: 'Uma boa hidratação é essencial para a saúde, o crescimento muscular e o bom desempenho em qualquer modalidade esportiva.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 85,
  },
  {
    id: 'galao-integral-2-2-l',
    name: 'Galão Integral 2,2 L',
    price: 40,
    category: 'Acessórios',
    image: '/images/products/galao-integral-2-2-l.jpg',
    shortDescription: 'Uma boa hidratação é essencial para a saúde, o crescimento muscular e o bom desempenho em qualquer modalidade esportiva.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 84,
  },
  {
    id: 'beta-alanina-pure-integralmedica-123g',
    name: 'Beta Alanina Pure integralmedica 123g',
    price: 80,
    category: 'Aminoácidos',
    image: '/images/products/beta-alanina-pure-integralmedica-123g.jpg',
    shortDescription: 'O Que É Beta Alanina? O seu objetivo é reduzir a fadiga para levar o seu corpo ao limite? Com a Beta Alanina Integralmédica você consegue melhorar o seu…',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 83,
  },
  {
    id: 'glutamine-isolates-300-integralmedica',
    name: 'Glutamine Isolates - 300 Integralmedica',
    price: 90,
    category: 'Aminoácidos',
    image: '/images/products/glutamine-isolates-300-integralmedica.jpg',
    shortDescription: 'O Que É Glutamina ? Glutamina Integralmédica é uma peça chave para quem procura melhorar seu sistema imunológico e digestivo.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 77,
  },
  {
    id: 'crealkaline-300g-100-pura',
    name: 'Crealkaline 300g, 100% Pura',
    price: 82,
    category: 'Creatina',
    image: '/images/products/crealkaline-300g-100-pura.jpg',
    shortDescription: 'A Crealkaline é uma versão distinta e autêntica de creatina, notável pelo seu ph equilibrado.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 82,
  },
  {
    id: 'creasuper-500g-100-pura',
    name: 'Creasuper 500g, 100% Pura',
    price: 115,
    category: 'Creatina',
    image: '/images/products/creasuper-500g-100-pura.jpg',
    shortDescription: 'A Creature 100% pursa é um suplemento destinado ao ganho de volume e massa muscular, aumento da força e melhoria do desempenho durante os treinos.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 73,
  },
  {
    id: 'creatina-canibal-300g-100-pura',
    name: 'Creatina Canibal 300g 100% Pura',
    price: 82,
    category: 'Creatina',
    image: '/images/products/creatina-canibal-300g-100-pura.jpg',
    shortDescription: 'Benefícios: É um dos suplementos mais indicados para atletas e praticantes de atividade física com o objetivo de ganhar energia, potência nos treinos, melhorar…',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 81,
  },
  {
    id: 'creatina-monohidratada-300g-pura',
    name: 'Creatina Monohidratada 300g Pura',
    price: 79.2,
    category: 'Creatina',
    image: '/images/products/creatina-monohidratada-300g-pura.jpg',
    shortDescription: 'Creatina Monohidratada Shark Pro Nossa Creatina Monohidratada Shark Pro é a escolha ideal para impulsionar seu desempenho atlético e atingir novos patamares…',
    badge: 'Mais Vendido',
    stockStatus: 'Em estoque',
    salesRank: 100,
  },
  {
    id: 'creatine-darkness-300g-100-pura',
    name: 'Creatine Darkness 300g 100% Pura',
    price: 82,
    category: 'Creatina',
    image: '/images/products/creatine-darkness-300g-100-pura.jpg',
    shortDescription: 'Pra Que Serve Creatine Darkness? A creatina é um dos suplementos mais estudados atualmente no mundo inteiro, por diversos benefícios para a saúde como a…',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 80,
  },
  {
    id: 'canibal-mass-3kg',
    name: 'Canibal Mass 3kg',
    price: 140,
    category: 'Hipercalóricos',
    image: '/images/products/canibal-mass-3kg.jpg',
    shortDescription: 'Canibal Mass , é a massa que contém apenas proteínas de alto valor biológico ( whey protein), e combina dois tipos de carboidratos maltodextrina e waxymaize,…',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 66,
  },
  {
    id: 'captain-gainer-3kg',
    name: 'Captain Gainer 3kg',
    price: 238.9,
    category: 'Hipercalóricos',
    image: '/images/products/captain-gainer-3kg.jpg',
    shortDescription: 'Captain Gainer é mais que um hipercalórico comum — é o único com a exclusiva Muscle Matrix, uma matriz inteligente desenvolvida para ganhos rápidos e eficazes…',
    badge: 'Oferta',
    stockStatus: 'Em estoque',
    salesRank: 92,
  },
  {
    id: 'crazy-clown-300g-halloween-orange',
    name: 'Crazy Clown 300g Halloween Orange',
    price: 152.72,
    category: 'Pré-Treino',
    image: '/images/products/crazy-clown-300g-halloween-orange.jpg',
    shortDescription: 'Transforme Seus Treinos com Crazy Clown! O que faz do Crazy Clown a escolha ideal para seus treinos? Energia Explosiva: Com alta concentração de L-Tirosina,…',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 64,
  },
  {
    id: 'nitropro-dragon-90cp',
    name: 'Nitropro Dragon 90cp',
    price: 110,
    category: 'Pré-Treino',
    image: '/images/products/nitropro-dragon-90cp.jpg',
    shortDescription: 'Nitropro Dragon é um suplemento vasodilatador contendo 3000mg de arginina, precursor do óxido nítrico.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 74,
  },
  {
    id: 'p-w-crack-300-g-nova-embalagem',
    name: 'P W - Crack - 300 G Nova Embalagem',
    price: 145,
    category: 'Pré-Treino',
    image: '/images/products/p-w-crack-300-g-nova-embalagem.jpg',
    shortDescription: 'O Crack é um pré-treino hardcore que oferece foco extremo, energia intensa e ainda conta com a presença da L-Carnitina Carnipure, um eficiente queimador de…',
    badge: 'Mais Vendido',
    stockStatus: 'Em estoque',
    salesRank: 98,
  },
  {
    id: 'p-w-psichotic-dragon-500g',
    name: 'P W - Psichotic Dragon - 500g',
    price: 199,
    category: 'Pré-Treino',
    image: '/images/products/p-w-psichotic-dragon-500g.jpg',
    shortDescription: 'O Psichotic Dragon é um pré workout projetado para levar você aos confins de seus treinos! Ele apresenta uma formulação completa, repleta de ingredientes que…',
    badge: 'Premium',
    stockStatus: 'Em estoque',
    salesRank: 94,
  },
  {
    id: 'pre-treino-viking-300g',
    name: 'Pre Treino Viking 300g',
    price: 159.92,
    category: 'Pré-Treino',
    image: '/images/products/pre-treino-viking-300g.jpg',
    shortDescription: 'O Que É: Viking é o pré treino para aqueles que querem algo mais no seu treino.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 63,
  },
  {
    id: 'pre-treino-insane-clown-350g-demons-lab',
    name: 'Pré treino Insane Clown 350g Demons Lab',
    price: 146,
    category: 'Pré-Treino',
    image: '/images/products/pre-treino-insane-clown-350g-demons-lab.jpg',
    shortDescription: 'Lançamento Pré-treino é basicamente uma fonte de energia extra para os seus treinos, com a função de dar mais energia, acelerar o metabolismo e…',
    badge: 'Lançamento',
    stockStatus: 'Em estoque',
    salesRank: 95,
  },
  {
    id: 'pre-treino-prime-md-300g',
    name: 'Pré-Treino Prime Md 300g',
    price: 128,
    category: 'Pré-Treino',
    image: '/images/products/pre-treino-prime-md-300g.jpg',
    shortDescription: 'Pré-Treino Prime Md Integralmedica: Pré-Treino com energia, foco e desempenho O Pré-Treino Prime Md Integralmedica é um Pré-Treino completo desenvolvido para…',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 70,
  },
  {
    id: 'sache-psichotic-dragon-10g-frutas-vermelhas',
    name: 'Sache Psichotic Dragon 10g Frutas Vermelhas',
    price: 10,
    category: 'Pré-Treino',
    image: '/images/products/sache-psichotic-dragon-10g-frutas-vermelhas.jpg',
    shortDescription: 'O Psichotic Dragon é um pré workout projetado para levar você aos confins de seus treinos! Ele apresenta uma formulação completa, repleta de ingredientes que…',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 91,
  },
  {
    id: 'v9-pump-pre-workout-pre-treino-300g',
    name: 'V9-Pump Pre Workout - Pré Treino 300g',
    price: 130,
    category: 'Pré-Treino',
    image: '/images/products/v9-pump-pre-workout-pre-treino-300g.jpg',
    shortDescription: 'Eleve seu Treino para Outro Patamar com V9 Pump Shark Pro.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 69,
  },
  {
    id: 'vasculor-muscle-pump-volumizer-300g',
    name: 'Vasculor Muscle Pump Volumizer 300g',
    price: 130,
    category: 'Pré-Treino',
    image: '/images/products/vasculor-muscle-pump-volumizer-300g.jpg',
    shortDescription: 'Vasculor é um pré-treino desenvolvido com ativos que maximizam o fluxo sanguíneo e o transporte de nutrientes essenciais para o tecido muscular.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 68,
  },
  {
    id: 'vasculor-muscle-pump-volumizer-sem-cafeina-300g',
    name: 'Vasculor Muscle Pump Volumizer Sem Cafeína 300g',
    price: 130,
    category: 'Pré-Treino',
    image: '/images/products/vasculor-muscle-pump-volumizer-sem-cafeina-300g.jpg',
    shortDescription: 'O pré-treino vasodilatador Vasculor é um suplemento feito com ativos que maximizam o fluxo sanguíneo e o pump muscular, favorecendo o transporte de oxigênio e…',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 67,
  },
  {
    id: 'evora-pw-150g',
    name: 'Évora Pw 150g',
    price: 86,
    category: 'Pré-Treino',
    image: '/images/products/evora-pw-150g.jpg',
    shortDescription: 'A combinação dos ativos da formula de Évora Pw criam as condições físicas e mentais adequadas para a realização dos treinos mais intensos que você possa…',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 79,
  },
  {
    id: 'evora-pw-300g',
    name: 'Évora Pw 300g',
    price: 120,
    category: 'Pré-Treino',
    image: '/images/products/evora-pw-300g.jpg',
    shortDescription: 'A combinação dos ativos da formula de Évora Pw criam as condições físicas e mentais adequadas para a realização dos treinos mais intensos que você possa…',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 72,
  },
  {
    id: 'evora-vulcan-300g',
    name: 'Évora Vulcan 300g',
    price: 134,
    category: 'Pré-Treino',
    image: '/images/products/evora-vulcan-300g.jpg',
    shortDescription: 'O que é o pré-treino Évora Vulcan? O Évora Vulcan é um pré-treino desenvolvido com uma combinação estratégica de ativos voltados para a ativação de energia…',
    badge: 'Lançamento',
    stockStatus: 'Em estoque',
    salesRank: 96,
  },
  {
    id: 'evora-xt-300g',
    name: 'Évora Xt 300g',
    price: 126,
    category: 'Pré-Treino',
    image: '/images/products/evora-xt-300g.jpg',
    shortDescription: 'Évora Xt é uma edição limitada e especial do já conhecido Evora Pw.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 71,
  },
  {
    id: 'lancamento-alfajor-sabor-caramelo-e-flor-de-sal-50g',
    name: 'Lançamento Alfajor sabor Caramelo e Flor de Sal 50g',
    price: 11.7,
    category: 'Snacks',
    image: '/images/products/lancamento-alfajor-sabor-caramelo-e-flor-de-sal-50g.jpg',
    shortDescription: 'A mesma experiência gastronômica da pasta bestseller na versão alfajor! O nosso La Fajor sabor Caramelo com Flor de Sal será a sua melhor companhia quando…',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 89,
  },
  {
    id: 'protein-crisp-bar-45g',
    name: 'Protein Crisp Bar 45g',
    price: 13,
    category: 'Snacks',
    image: '/images/products/protein-crisp-bar-45g.jpg',
    shortDescription: 'Deu vontade de comer doce sem sair da dieta? Protein Crisp Integralmédica é a barra de proteína com 13 g de proteína e baixa caloria. .',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 88,
  },
  {
    id: 'vitamina-coq-10-demons-lab-30cps',
    name: 'Vitamina - Coq-10 Demons Lab 30cps',
    price: 104,
    category: 'Vitaminas',
    image: '/images/products/vitamina-coq-10-demons-lab-30cps.jpg',
    shortDescription: 'A Coenzima Q10 (Coq10) é um nutriente vital produzido naturalmente pelo corpo e essencial para a produção de energia nas células e proteção antioxidante.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 75,
  },
  {
    id: 'vitapure-super-60cp',
    name: 'Vitapure Super 60cp',
    price: 89,
    category: 'Vitaminas',
    image: '/images/products/vitapure-super-60cp.jpg',
    shortDescription: 'O Vitapure Super da Integralmédica é um suplemento multivitamínico e mineral superconcentrado, formulado para suprir as necessidades diárias de atletas e…',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 78,
  },
  {
    id: '100-whey-psicopatas-900-g-lancamento',
    name: '100% Whey Psicopatas - 900 G Lançamento',
    price: 132,
    category: 'Whey Protein',
    image: '/images/products/100-whey-psicopatas-900-g-lancamento.jpg',
    shortDescription: 'Novo 100% Whey Psichopaths Performance Extrema para Atletas de Alta Intensidade A Demons Lab apresenta o 100% Whey Psichopaths, 21g de proteína por porção…',
    badge: 'Lançamento',
    stockStatus: 'Em estoque',
    salesRank: 97,
  },
  {
    id: 'beef-protein-900g-zero-lactose',
    name: 'Beef Protein 900g Zero Lactose',
    price: 185,
    category: 'Whey Protein',
    image: '/images/products/beef-protein-900g-zero-lactose.jpg',
    shortDescription: 'Com fórmulas potentes e ingredientes de qualidade, ela foi feita para quem busca performance de verdade.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 61,
  },
  {
    id: 'gods-100-900g',
    name: 'Gods 100% 900g',
    price: 140,
    category: 'Whey Protein',
    image: '/images/products/gods-100-900g.jpg',
    shortDescription: 'O Que É: O Whey Protein Concentrado é muito utilizada como base para a fabricação de suplementos alimentares, utilizada na indústria alimentícia e…',
    badge: 'Mais Vendido',
    stockStatus: 'Em estoque',
    salesRank: 99,
  },
  {
    id: 'protein-crush-900g',
    name: 'Protein Crush 900g',
    price: 145,
    category: 'Whey Protein',
    image: '/images/products/protein-crush-900g.jpg',
    shortDescription: 'Protein Crush tem melhor absorção e perfil nutricional superior, garantindo ganhos musculares mais eficientes com recuperação mais rápida após os treinos.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 65,
  },
  {
    id: 'proteina-uevo-1kg',
    name: 'Proteína Uêvo 1kg',
    price: 101,
    category: 'Whey Protein',
    image: '/images/products/proteina-uevo-1kg.jpg',
    shortDescription: 'Chegou A Nova Uêvo — A Evolução Da Proteína Da Clara Do Ovo! Mais pureza, mais tecnologia e mais resultado no seu Dia a Dia A nova Uêvo# passa por um Duplo…',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 76,
  },
  {
    id: 'sache-whey-100-40g',
    name: 'Sache Whey 100% 40g',
    price: 10,
    category: 'Whey Protein',
    image: '/images/products/sache-whey-100-40g.jpg',
    shortDescription: 'Oferecendo 26g de proteínas de alto valor biológico por dose, além de 5,8g de Bcaas e vitaminas B12 e B6, esse whey combina nutrição e um sabor inconfundível.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 90,
  },
  {
    id: 'whey-100-integralmedica-pure-refil-900g',
    name: 'Whey 100% Integralmédica Pure Refil 900g',
    price: 165,
    category: 'Whey Protein',
    image: '/images/products/whey-100-integralmedica-pure-refil-900g.jpg',
    shortDescription: 'O Whey 100% Pure Pouch é o suplemento ideal e essencial para quem busca ganho de massa magra e recuperação muscular.',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 62,
  },
  {
    id: 'whey-protein-concentrado-900g-dark-whey',
    name: 'Whey Protein Concentrado 900g - Dark Whey',
    price: 209,
    category: 'Whey Protein',
    image: '/images/products/whey-protein-concentrado-900g-dark-whey.jpg',
    shortDescription: 'O whey protein concentrado Dark Whey é um suplemento proteico de alta qualidade, rico em proteína de soro do leite concentrada, sem adição de outros…',
    badge: 'Premium',
    stockStatus: 'Em estoque',
    salesRank: 93,
  },
  {
    id: 'whey-protein-concentrado-sache-30g',
    name: 'Whey Protein Concentrado Sachê 30g',
    price: 23.89,
    category: 'Whey Protein',
    image: '/images/products/whey-protein-concentrado-sache-30g.jpg',
    shortDescription: 'Whey Protein 100% Pure em Sachê: proteína prática para sua rotina O Whey Protein 100% Pure Integralmedica versão sachê é um Whey Protein concentrado…',
    badge: null,
    stockStatus: 'Em estoque',
    salesRank: 87,
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
