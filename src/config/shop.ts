/** Limites de preço do catálogo — evita importar products.ts no boot da home */
export const SHOP_PRICE_BOUNDS = {
  min: 10,
  max: 239,
} as const