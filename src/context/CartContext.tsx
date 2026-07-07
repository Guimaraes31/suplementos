import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../cms/types'
import {
  type CartItem,
  type ToastState,
  calcItemCount,
  calcSubtotal,
  productToCartItem,
} from './cartTypes'

const STORAGE_KEY = 'nascimento-cart'

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isDrawerOpen: boolean
  isCheckoutOpen: boolean
  toast: ToastState | null
  addItem: (product: Product, sourceRect?: DOMRect) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  openDrawer: () => void
  closeDrawer: () => void
  openCheckout: () => void
  closeCheckout: () => void
  clearCart: () => void
  flyAnimation: { image: string; from: DOMRect } | null
}

const CartContext = createContext<CartContextValue | null>(null)

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [toast, setToast] = useState<ToastState | null>(null)
  const [flyAnimation, setFlyAnimation] = useState<{ image: string; from: DOMRect } | null>(null)

  useEffect(() => {
    saveCart(items)
  }, [items])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2800)
    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!flyAnimation) return
    const timer = setTimeout(() => setFlyAnimation(null), 700)
    return () => clearTimeout(timer)
  }, [flyAnimation])

  useEffect(() => {
    const overflow = isDrawerOpen || isCheckoutOpen ? 'hidden' : ''
    document.body.style.overflow = overflow
    return () => { document.body.style.overflow = '' }
  }, [isDrawerOpen, isCheckoutOpen])

  const addItem = useCallback((product: Product, sourceRect?: DOMRect) => {
    if (product.stockStatus === 'Esgotado') return

    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id)
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [...prev, productToCartItem(product)]
    })

    setToast({ message: `${product.name} adicionado ao carrinho`, image: product.image })
    if (sourceRect) {
      setFlyAnimation({ image: product.image, from: sourceRect })
    }
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.productId !== productId))
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
    )
  }, [])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: calcItemCount(items),
      subtotal: calcSubtotal(items),
      isDrawerOpen,
      isCheckoutOpen,
      toast,
      addItem,
      removeItem,
      updateQuantity,
      openDrawer: () => setIsDrawerOpen(true),
      closeDrawer: () => setIsDrawerOpen(false),
      openCheckout: () => {
        setIsDrawerOpen(false)
        setIsCheckoutOpen(true)
      },
      closeCheckout: () => setIsCheckoutOpen(false),
      clearCart: () => setItems([]),
      flyAnimation,
    }),
    [
      items,
      isDrawerOpen,
      isCheckoutOpen,
      toast,
      addItem,
      removeItem,
      updateQuantity,
      flyAnimation,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}