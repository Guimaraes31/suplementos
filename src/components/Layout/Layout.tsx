import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import AnnouncementBar from '../AnnouncementBar/AnnouncementBar'
import Footer from '../Footer/Footer'
import CartToast from '../CartToast/CartToast'
import ScrollProgress from '../ScrollProgress/ScrollProgress'
import WhatsAppFab from '../WhatsAppFab/WhatsAppFab'
import DeferredCartUi from './DeferredCartUi'

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
      <AnnouncementBar />
      <main className="page-main page-main--with-announce">
        <Outlet />
      </main>
      <Footer />
      <DeferredCartUi />
      <CartToast />
      <WhatsAppFab />
    </>
  )
}