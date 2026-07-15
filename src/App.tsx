import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import PageFallback from './components/PageFallback/PageFallback'
import HomePage from './pages/HomePage'

const ShopPage = lazy(() => import('./pages/ShopPage'))
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="loja"
          element={(
            <Suspense fallback={<PageFallback />}>
              <ShopPage />
            </Suspense>
          )}
        />
        <Route
          path="categorias"
          element={(
            <Suspense fallback={<PageFallback />}>
              <CategoriesPage />
            </Suspense>
          )}
        />
        <Route
          path="categoria/:slug"
          element={(
            <Suspense fallback={<PageFallback />}>
              <CategoryPage />
            </Suspense>
          )}
        />
        <Route
          path="produto/:id"
          element={(
            <Suspense fallback={<PageFallback />}>
              <ProductPage />
            </Suspense>
          )}
        />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App