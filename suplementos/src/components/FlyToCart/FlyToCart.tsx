import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'

export default function FlyToCart() {
  const { flyAnimation } = useCart()

  if (!flyAnimation) return null

  const { image, from } = flyAnimation
  const cartBtn = document.getElementById('cart-icon-btn')
  const to = cartBtn?.getBoundingClientRect()

  const startX = from.left + from.width / 2
  const startY = from.top + from.height / 2
  const endX = to ? to.left + to.width / 2 : window.innerWidth - 60
  const endY = to ? to.top + to.height / 2 : 40

  return (
    <AnimatePresence>
      <motion.div
        key={`fly-${startX}-${startY}`}
        style={{
          position: 'fixed',
          zIndex: 9999,
          pointerEvents: 'none',
          left: 0,
          top: 0,
        }}
        initial={{ x: startX, y: startY, scale: 1, opacity: 1 }}
        animate={{ x: endX, y: endY, scale: 0.35, opacity: 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] as const }}
      >
        <img
          src={image}
          alt=""
          aria-hidden="true"
          style={{
            width: 48,
            height: 48,
            marginLeft: -24,
            marginTop: -24,
            borderRadius: 6,
            objectFit: 'cover',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            border: '1px solid rgba(197,164,110,0.3)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}