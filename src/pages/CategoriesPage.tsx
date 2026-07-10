import { Link } from 'react-router-dom'
import Categorias from '../components/Categorias/Categorias'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './pages.css'

export default function CategoriesPage() {
  useDocumentTitle(
    'Categorias | Nascimento Suplementos',
    'Whey, creatina, pré-treino, pós-treino, vitaminas e packs. Escolha por objetivo com orientação da Nascimento Suplementos.',
  )

  return (
    <div className="page-section">
      <div className="container">
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Início</Link>
          <span aria-hidden="true">/</span>
          <span>Categorias</span>
        </nav>
      </div>
      <Categorias />
    </div>
  )
}
