import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import CategoriesPage from './pages/CategoriesPage'
import CategoryPage from './pages/CategoryPage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="loja" element={<ShopPage />} />
        <Route path="categorias" element={<CategoriesPage />} />
        <Route path="categoria/:slug" element={<CategoryPage />} />
        <Route path="produto/:id" element={<ProductPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App
