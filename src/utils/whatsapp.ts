import type { CartItem } from '../context/cartTypes'
import type { CheckoutForm } from '../context/cartTypes'
import { calcSubtotal } from '../context/cartTypes'
import { formatPrice } from './format'
import { storeConfig } from '../config/store'

export function buildWhatsAppOrderUrl(
  items: CartItem[],
  form: CheckoutForm,
): string {
  const subtotal = calcSubtotal(items)
  const lines = [
    '*Novo Pedido — Nascimento Suplementos*',
    '',
    `*Cliente:* ${form.fullName}`,
    `*WhatsApp:* ${form.whatsapp}`,
    `*Entrega:* ${form.deliveryType === 'entrega' ? 'Delivery' : 'Retirada na loja'}`,
  ]

  if (form.deliveryType === 'entrega' && form.address) {
    lines.push(`*Endereço:* ${form.address}`)
  }

  if (form.notes) {
    lines.push(`*Observações:* ${form.notes}`)
  }

  lines.push('', '*Itens do pedido:*')
  items.forEach((item) => {
    lines.push(
      `• ${item.quantity}x ${item.name} — ${formatPrice(item.price * item.quantity)}`,
    )
  })

  lines.push('', `*Subtotal:* ${formatPrice(subtotal)}`)
  lines.push('', '_Pedido enviado pelo site nascimentosuplementos.com.br_')

  const text = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${storeConfig.whatsapp}?text=${text}`
}