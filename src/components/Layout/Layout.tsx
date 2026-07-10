import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import CartDrawer from '../CartDrawer/CartDrawer'
import CheckoutModal from '../CheckoutModal/CheckoutModal'
import CartToast from '../CartToast/CartToast'
import FlyToCart from '../FlyToCart/FlyToCart'
import ScrollProgress from '../ScrollProgress/ScrollProgress'
import WhatsAppFab from '../WhatsAppFab/WhatsAppFab'

export default function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        window.scrollTo(0, 0)
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="page-main">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <CartToast />
      <FlyToCart />
      <WhatsAppFab />
    </>
  )
}
