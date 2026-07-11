/**
 * Imagens locais — produtos reais da Nascimento Suplementos.
 * Fotos de catálogo (iFood / loja).
 */
export const images = {
  brand: {
    logo: '/images/brand/logo.webp',
    heroEmblem: '/images/brand/hero-emblem.webp',
  },

  /** @deprecated use brand.heroEmblem */
  hero: '/images/brand/hero-emblem.webp',

  categories: {
    whey: '/images/categories/whey.jpg',
    creatina: '/images/categories/creatina.jpg',
    preTreino: '/images/categories/pre-treino.jpg',
    posTreino: '/images/categories/pos-treino.jpg',
    vitaminas: '/images/categories/vitaminas.jpg',
    packs: '/images/categories/packs.jpg',
  },

  heroProducts: {
    creatina: '/images/products/creatina-monohidratada-300g-pura.jpg',
    whey: '/images/products/whey-protein-concentrado-900g-dark-whey.jpg',
  },

  /** Banners promocionais do carrossel (após o slide principal) */
  banners: {
    insaneClown: '/images/banner/insane-clown.jpg',
    gods100: '/images/banner/gods-100.jpg',
    creatinaDarkness: '/images/banner/creatina-darkness.jpg',
  },

  testimonials: {
    rafael: '/images/testimonials/rafael.jpg',
    camila: '/images/testimonials/camila.jpg',
    lucas: '/images/testimonials/lucas.jpg',
    ana: '/images/testimonials/ana.jpg',
    bruno: '/images/testimonials/bruno.jpg',
  },

  fallback: '/images/categories/whey.jpg',
} as const
