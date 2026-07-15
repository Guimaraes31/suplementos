import { lazy, Suspense, useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'

const CartDrawer = lazy(() => import('../CartDrawer/CartDrawer'))
const CheckoutModal = lazy(() => import('../CheckoutModal/CheckoutModal'))
const FlyToCart = lazy(() => import('../FlyToCart/FlyToCart'))

export default function DeferredCartUi() {
  const { isDrawerOpen, isCheckoutOpen, flyAnimation } = useCart()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (isDrawerOpen || isCheckoutOpen || flyAnimation) {
      setReady(true)
    }
  }, [isDrawerOpen, isCheckoutOpen, flyAnimation])

  useEffect(() => {
    if (ready) return

    const idle = window.requestIdleCallback?.(() => setReady(true), { timeout: 1800 })
    if (idle != null) {
      return () => window.cancelIdleCallback?.(idle)
    }

    const timer = window.setTimeout(() => setReady(true), 1200)
    return () => window.clearTimeout(timer)
  }, [ready])

  if (!ready) return null

  return (
    <Suspense fallback={null}>
      <CartDrawer />
      <CheckoutModal />
      <FlyToCart />
    </Suspense>
  )
}