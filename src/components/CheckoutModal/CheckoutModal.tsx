import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import type { CheckoutForm } from '../../context/cartTypes'
import { formatPrice } from '../../utils/format'
import { buildWhatsAppOrderUrl } from '../../utils/whatsapp'
import { storeConfig } from '../../config/store'
import SafeImage from '../SafeImage/SafeImage'
import './CheckoutModal.css'

const initialForm: CheckoutForm = {
  fullName: '',
  whatsapp: '',
  deliveryType: 'entrega',
  address: '',
  notes: '',
}

export default function CheckoutModal() {
  const { items, subtotal, isCheckoutOpen, closeCheckout, clearCart } = useCart()
  const [form, setForm] = useState<CheckoutForm>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({})

  const update = <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof CheckoutForm, string>> = {}
    if (!form.fullName.trim()) next.fullName = 'Informe seu nome completo'
    if (!form.whatsapp.trim()) next.whatsapp = 'Informe seu WhatsApp'
    if (form.deliveryType === 'entrega' && !form.address.trim()) {
      next.address = 'Informe o endereço de entrega'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleConfirm = () => {
    if (!validate() || items.length === 0) return

    const url = buildWhatsAppOrderUrl(items, form)
    window.open(url, '_blank', 'noopener,noreferrer')
    clearCart()
    setForm(initialForm)
    closeCheckout()
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleConfirm()
  }

  return (
    <AnimatePresence>
      {isCheckoutOpen && items.length > 0 && (
        <>
          <motion.div
            className="checkout__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCheckout}
            aria-hidden="true"
          />

          <motion.div
            className="checkout"
            role="dialog"
            aria-label="Finalizar compra"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="checkout__panel"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }}
            >
              <div className="checkout__form-side">
                <header className="checkout__header">
                  <div>
                    <p className="checkout__eyebrow">Checkout</p>
                    <h2 className="checkout__title">Finalizar Compra</h2>
                  </div>
                  <button
                    type="button"
                    className="checkout__close"
                    onClick={closeCheckout}
                    aria-label="Fechar checkout"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                    </svg>
                  </button>
                </header>

                <form className="checkout__form" onSubmit={handleSubmit} noValidate>
                  <div className="checkout__field">
                    <label className="checkout__label" htmlFor="checkout-name">Nome completo</label>
                    <input
                      id="checkout-name"
                      className="checkout__input"
                      type="text"
                      placeholder="Seu nome completo"
                      value={form.fullName}
                      onChange={(e) => update('fullName', e.target.value)}
                    />
                    {errors.fullName && <span className="checkout__error">{errors.fullName}</span>}
                  </div>

                  <div className="checkout__field">
                    <label className="checkout__label" htmlFor="checkout-whatsapp">WhatsApp</label>
                    <input
                      id="checkout-whatsapp"
                      className="checkout__input"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={form.whatsapp}
                      onChange={(e) => update('whatsapp', e.target.value)}
                    />
                    {errors.whatsapp && <span className="checkout__error">{errors.whatsapp}</span>}
                  </div>

                  <div className="checkout__field">
                    <span className="checkout__label">Forma de recebimento</span>
                    <div className="checkout__delivery-options">
                      <button
                        type="button"
                        className={`checkout__delivery-btn ${form.deliveryType === 'entrega' ? 'checkout__delivery-btn--active' : ''}`}
                        onClick={() => update('deliveryType', 'entrega')}
                      >
                        Entrega
                      </button>
                      <button
                        type="button"
                        className={`checkout__delivery-btn ${form.deliveryType === 'retirada' ? 'checkout__delivery-btn--active' : ''}`}
                        onClick={() => update('deliveryType', 'retirada')}
                      >
                        Retirada na loja
                      </button>
                    </div>
                    <p className="checkout__hint">
                      {form.deliveryType === 'entrega'
                        ? 'Entrega sob consulta no WhatsApp (prazo e frete conforme região, prioridade Zona Sul). Você também pode pedir no iFood.'
                        : `Retire na loja em horário de funcionamento (${storeConfig.hoursDisplay}).`}
                    </p>
                  </div>

                  {form.deliveryType === 'entrega' && (
                    <div className="checkout__field">
                      <label className="checkout__label" htmlFor="checkout-address">Endereço de entrega</label>
                      <input
                        id="checkout-address"
                        className="checkout__input"
                        type="text"
                        placeholder="Rua, número, bairro, CEP"
                        value={form.address}
                        onChange={(e) => update('address', e.target.value)}
                      />
                      {errors.address && <span className="checkout__error">{errors.address}</span>}
                    </div>
                  )}

                  {form.deliveryType === 'retirada' && (
                    <p className="checkout__hint">
                      Endereço: <strong>{storeConfig.address}</strong>
                    </p>
                  )}

                  <div className="checkout__field">
                    <span className="checkout__label">Pagamento</span>
                    <p className="checkout__hint">
                      O pedido é confirmado no WhatsApp. Formas combinadas no atendimento — Pix é a mais comum.
                      Valores de frete (se houver) e disponibilidade são confirmados antes de finalizar.
                    </p>
                  </div>

                  <div className="checkout__field">
                    <label className="checkout__label" htmlFor="checkout-notes">Observações (opcional)</label>
                    <textarea
                      id="checkout-notes"
                      className="checkout__textarea"
                      placeholder="Horário preferencial, complemento, etc."
                      value={form.notes}
                      onChange={(e) => update('notes', e.target.value)}
                    />
                  </div>
                </form>
              </div>

              <aside className="checkout__summary-side">
                <div className="checkout__summary-header">
                  <h3 className="checkout__summary-title">Resumo do pedido</h3>
                </div>

                <ul className="checkout__summary-list">
                  {items.map((item) => (
                    <li key={item.lineId} className="checkout__summary-item">
                      <SafeImage
                        className="checkout__summary-thumb"
                        src={item.image}
                        alt=""
                        width={44}
                        height={44}
                      />
                      <div className="checkout__summary-info">
                        <p className="checkout__summary-name">{item.name}</p>
                        <span className="checkout__summary-qty">Qtd: {item.quantity}</span>
                      </div>
                      <span className="checkout__summary-price">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="checkout__summary-footer">
                  <div className="checkout__total">
                    <span className="checkout__total-label">Total</span>
                    <span className="checkout__total-value">{formatPrice(subtotal)}</span>
                  </div>

                  <button type="button" className="checkout__confirm-btn" onClick={handleConfirm}>
                    Enviar pedido no WhatsApp
                  </button>

                  <p className="checkout__hint checkout__hint--center">
                    Ao confirmar, abrimos o WhatsApp com o resumo do pedido. O carrinho do site é limpo em seguida —
                    se fechar sem enviar a mensagem, chame a loja de novo.
                  </p>

                  <div className="checkout__payment-links">
                    <a
                      href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent('Olá! Quero pagar um pedido via Pix.')}`}
                      className="checkout__payment-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Falar sobre Pix
                    </a>
                    <a
                      href={storeConfig.ifood}
                      className="checkout__payment-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Pedir no iFood
                    </a>
                  </div>
                </div>
              </aside>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}