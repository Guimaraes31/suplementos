import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { formatPrice, formatInstallment } from '../../utils/format'
import SafeImage from '../SafeImage/SafeImage'
import './CartDrawer.css'

export default function CartDrawer() {
  const {
    items,
    subtotal,
    isDrawerOpen,
    closeDrawer,
    openCheckout,
    updateQuantity,
    removeItem,
  } = useCart()

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            className="cart-drawer__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
            aria-hidden="true"
          />

          <motion.aside
            className="cart-drawer"
            role="dialog"
            aria-label="Carrinho de compras"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }}
          >
            <header className="cart-drawer__header">
              <div className="cart-drawer__title-wrap">
                <span className="cart-drawer__eyebrow">Sua seleção</span>
                <h2 className="cart-drawer__title">Carrinho</h2>
              </div>
              <button
                type="button"
                className="cart-drawer__close"
                onClick={closeDrawer}
                aria-label="Fechar carrinho"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            <div className="cart-drawer__body">
              {items.length === 0 ? (
                <div className="cart-drawer__empty">
                  <div className="cart-drawer__empty-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M6 6h15l-1.5 9H7.5L6 6z" strokeLinejoin="round" />
                      <path d="M6 6L5 3H2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="cart-drawer__empty-title">Carrinho vazio</p>
                  <p className="cart-drawer__empty-text">
                    Explore nossa coleção premium e adicione seus suplementos favoritos.
                  </p>
                  <a href="#loja-produtos" className="cart-drawer__shop-btn" onClick={closeDrawer}>
                    Explorar Loja
                  </a>
                </div>
              ) : (
                <ul className="cart-drawer__list">
                  {items.map((item, i) => (
                    <motion.li
                      key={item.productId}
                      className="cart-item"
                      layout
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <div className="cart-item__image-wrap">
                        <SafeImage
                          className="cart-item__image"
                          src={item.image}
                          alt={item.name}
                          width={72}
                          height={72}
                        />
                      </div>

                      <div className="cart-item__info">
                        <span className="cart-item__category">{item.category}</span>
                        <h3 className="cart-item__name">{item.name}</h3>
                        <p className="cart-item__price">
                          <strong>{formatPrice(item.price * item.quantity)}</strong>
                          {item.quantity > 1 && ` · ${formatPrice(item.price)} cada`}
                        </p>
                      </div>

                      <div className="cart-item__actions">
                        <div className="cart-item__qty">
                          <button
                            type="button"
                            className="cart-item__qty-btn"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            aria-label="Diminuir quantidade"
                          >
                            −
                          </button>
                          <span className="cart-item__qty-value">{item.quantity}</span>
                          <button
                            type="button"
                            className="cart-item__qty-btn"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            aria-label="Aumentar quantidade"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="cart-item__remove"
                          onClick={() => removeItem(item.productId)}
                        >
                          Remover
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="cart-drawer__footer">
                <div className="cart-drawer__summary">
                  <span className="cart-drawer__summary-label">Subtotal</span>
                  <span className="cart-drawer__summary-value">{formatPrice(subtotal)}</span>
                </div>
                <button
                  type="button"
                  className="cart-drawer__checkout-btn"
                  onClick={openCheckout}
                >
                  Finalizar Compra
                </button>
                <p className="cart-drawer__installment">{formatInstallment(subtotal)}</p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}