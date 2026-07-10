import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ShopFilterProvider } from './context/ShopFilterContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ShopFilterProvider>
          <App />
        </ShopFilterProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
