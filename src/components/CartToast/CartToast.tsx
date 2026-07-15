import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import SafeImage from '../SafeImage/SafeImage'
import './CartToast.css'

export default function CartToast() {
  const { toast } = useCart()

  return (
    <div className="cart-toast-anchor" aria-hidden={!toast}>
      <AnimatePresence>
        {toast && (
          <motion.div
            className="cart-toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] as const }}
          >
            {toast.image && (
              <SafeImage
                className="cart-toast__thumb"
                src={toast.image}
                alt=""
                width={44}
                height={44}
              />
            )}
            <div className="cart-toast__content">
              <span className="cart-toast__label">Adicionado ao carrinho</span>
              <span className="cart-toast__message">{toast.message}</span>
            </div>
            <span className="cart-toast__check" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}