import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import SafeImage from '../SafeImage/SafeImage'
import './CartToast.css'

export default function CartToast() {
  const { toast } = useCart()

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className="cart-toast"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] as const }}
        >
          {toast.image && (
            <SafeImage
              className="cart-toast__thumb"
              src={toast.image}
              alt=""
              width={40}
              height={40}
            />
          )}
          <div className="cart-toast__content">
            <span className="cart-toast__label">Carrinho</span>
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
  )
}