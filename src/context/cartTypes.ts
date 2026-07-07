import type { Product } from '../cms/types'

export interface CartItem {
  productId: string
  name: string
  price: number
  image: string
  category: string
  quantity: number
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

export function productToCartItem(product: Product, quantity = 1): CartItem {
  return {
    productId: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category,
    quantity,
  }
}

export function calcSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function calcItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}