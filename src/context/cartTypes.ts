import type { Product, ProductVariant } from '../cms/types'

export interface CartItem {
  lineId: string
  productId: string
  name: string
  price: number
  image: string
  category: string
  quantity: number
  variant?: ProductVariant
}

export interface ToastState {
  message: string
  image?: string
}

export interface CheckoutForm {
  fullName: string
  whatsapp: string
  deliveryType: 'entrega' | 'retirada'
  address: string
  notes: string
}

function buildLineId(productId: string, variant?: ProductVariant): string {
  const parts = [variant?.flavor, variant?.size].filter(Boolean)
  return parts.length > 0 ? `${productId}:${parts.join('|')}` : productId
}

function buildDisplayName(product: Product, variant?: ProductVariant): string {
  const parts = [variant?.flavor, variant?.size].filter(Boolean)
  return parts.length > 0 ? `${product.name} — ${parts.join(' · ')}` : product.name
}

export function productToCartItem(
  product: Product,
  quantity = 1,
  variant?: ProductVariant,
): CartItem {
  return {
    lineId: buildLineId(product.id, variant),
    productId: product.id,
    name: buildDisplayName(product, variant),
    price: product.price,
    image: product.image,
    category: product.category,
    quantity,
    variant,
  }
}

export function calcSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function calcItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}