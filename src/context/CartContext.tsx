import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product, ProductVariant } from '../cms/types'
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
  addItem: (product: Product, sourceRect?: DOMRect, variant?: ProductVariant) => void
  removeItem: (lineId: string) => void
  updateQuantity: (lineId: string, quantity: number) => void
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
    const parsed = JSON.parse(raw) as Array<CartItem & { lineId?: string }>
    if (!Array.isArray(parsed)) return []
    return parsed.map((item) => ({
      ...item,
      lineId: item.lineId ?? item.productId,
    }))
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

  const addItem = useCallback((product: Product, sourceRect?: DOMRect, variant?: ProductVariant) => {
    if (product.stockStatus === 'Esgotado') return

    const lineId = productToCartItem(product, 1, variant).lineId
    const displayName = productToCartItem(product, 1, variant).name

    setItems((prev) => {
      const existing = prev.find((i) => i.lineId === lineId)
      if (existing) {
        return prev.map((i) =>
          i.lineId === lineId ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [...prev, productToCartItem(product, 1, variant)]
    })

    setToast({ message: `${displayName} adicionado ao carrinho`, image: product.image })
    if (sourceRect) {
      setFlyAnimation({ image: product.image, from: sourceRect })
    }
  }, [])

  const removeItem = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId))
  }, [])

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.lineId !== lineId))
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.lineId === lineId ? { ...i, quantity } : i)),
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