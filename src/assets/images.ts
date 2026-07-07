/**
 * Imagens locais — cada arquivo corresponde ao produto/categoria indicado.
 * Fonte: Pexels (uso livre). Atualize via scripts/download-images.ps1
 */
export const images = {
  brand: {
    logo: '/images/brand/logo.png',
    heroEmblem: '/images/brand/hero-emblem.png',
  },

  /** @deprecated use brand.heroEmblem */
  hero: '/images/brand/hero-emblem.png',

  categories: {
    /** Pote de whey com scoop e pó */
    whey: '/images/categories/whey.jpg',
    /** Creatina monohidratada em pote */
    creatina: '/images/categories/creatina.jpg',
    /** Pré-treino — pote vermelho sobre haltere */
    preTreino: '/images/categories/pre-treino.jpg',
    /** Pós-treino — preparo de shake com pó */
    posTreino: '/images/categories/pos-treino.jpg',
    /** Vitaminas e cápsulas em bowls */
    vitaminas: '/images/categories/vitaminas.jpg',
    /** Pack — atleta com pote de proteína */
    packs: '/images/categories/packs.jpg',
  },

  products: {
    /** Whey isolate — pote branco com scoop */
    wheyGold: '/images/products/whey-gold.jpg',
    /** Whey concentrado — pote com pó derramado */
    wheyConcentrado: '/images/products/whey-concentrado.jpg',
    /** Proteína vegetal — pó verde (spirulina/plant) */
    wheyVegan: '/images/products/whey-vegan.jpg',
    /** Creatina monohidratada */
    creatinaMono: '/images/products/creatina-mono.jpg',
    /** Creatina HCL — cápsulas brancas */
    creatinaHcl: '/images/products/creatina-hcl.jpg',
    /** Pré-treino Fury — pote sobre haltere */
    preFury: '/images/products/pre-fury.jpg',
    /** Pré-treino Focus — cápsulas de energia */
    preFocus: '/images/products/pre-focus.jpg',
    /** Pós-treino — shake na academia */
    posRecovery: '/images/products/pos-recovery.jpg',
    /** BCAA — pó branco com scoop */
    bcaa: '/images/products/bcaa.jpg',
    /** Multivitamínico — cápsulas e suplementos variados */
    multi: '/images/products/multi.jpg',
    /** Vitamina D3 — cápsulas amarelas */
    vitaminaD3: '/images/products/vitamina-d3.jpg',
    /** Omega 3 — cápsulas e óleo na colher */
    omega3: '/images/products/omega3.jpg',
    /** Pack massa — múltiplas garrafas premium */
    packMassa: '/images/products/pack-massa.jpg',
    /** Pack cutting — atleta com suplementos */
    packCutting: '/images/products/pack-cutting.jpg',
    /** Pack iniciante — garrafa de suplemento com água */
    packIniciante: '/images/products/pack-iniciante.jpg',
    /** ZMA — cápsulas brancas em bowl */
    zma: '/images/products/zma.jpg',
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