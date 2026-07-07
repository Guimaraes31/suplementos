import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import TrustBar from './components/TrustBar/TrustBar'
import Categorias from './components/Categorias/Categorias'
import Shop from './components/Shop/Shop'
import MaisVendidos from './components/MaisVendidos/MaisVendidos'
import Benefits from './components/Benefits/Benefits'
import Testimonials from './components/Testimonials/Testimonials'
import Footer from './components/Footer/Footer'
import CartDrawer from './components/CartDrawer/CartDrawer'
import CheckoutModal from './components/CheckoutModal/CheckoutModal'
import CartToast from './components/CartToast/CartToast'
import FlyToCart from './components/FlyToCart/FlyToCart'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Categorias />
        <Shop />
        <MaisVendidos />
        <Benefits />
        <Testimonials />
      </main>
      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <CartToast />
      <FlyToCart />
    </>
  )
}

export default App