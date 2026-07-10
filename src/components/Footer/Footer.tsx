import { Link } from 'react-router-dom'
import BrandLogo from '../BrandLogo/BrandLogo'
import { storeConfig } from '../../config/store'
import { CATEGORIES } from '../../config/categories'
import { categoryPath, shopPath } from '../../config/navigation'
import './Footer.css'

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Loja', to: '/loja' },
  { label: 'Categorias', to: '/categorias' },
  { label: 'Mais Vendidos', to: '/#mais-vendidos' },
  { label: 'Sobre Nós', to: '/#sobre' },
  { label: 'Contato', to: '/#contato' },
]

const paymentMethods = [
  { id: 'pix', label: 'Pix', featured: true },
  { id: 'whatsapp', label: 'WhatsApp', featured: false },
  { id: 'ifood', label: 'iFood', featured: false },
]

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3C8.9 21.5 10.4 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z" strokeLinejoin="round" />
      <path d="M8.5 9.5c.3 1.5 1.8 3.5 3.5 4 1 .4 1.8.3 2.5-.2l.5-.5c.2-.2.2-.5 0-.7l-1-1c-.2-.2-.5-.2-.7 0l-.3.3c-.1.1-.3.1-.5 0-.5-.3-1.5-1.2-1.7-1.7-.1-.2 0-.4.1-.5l.3-.3c.2-.2.2-.5 0-.7l-1-1c-.2-.2-.5-.2-.7 0l-.5.5c-.5.7-.6 1.5-.2 2.5z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="container">
        <div className="footer__main">
          <div className="footer__brand">
            <div className="footer__logo">
              <BrandLogo variant="footer" />
            </div>
            <p className="footer__tagline">
              {storeConfig.tagline}. Atendimento especializado, preço justo e entrega rápida —
              Jardim São Carlos, Zona Sul de São Paulo.
            </p>
            <div className="footer__social">
              <a href={storeConfig.instagram} className="footer__social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </a>
              <a href={`https://wa.me/${storeConfig.whatsapp}`} className="footer__social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="footer__column-title">Navegação</h3>
            <ul className="footer__links">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer__link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer__column-title">Categorias</h3>
            <ul className="footer__links">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link to={categoryPath(cat.slug)} className="footer__link">{cat.label}</Link>
                </li>
              ))}
              <li>
                <Link to={shopPath()} className="footer__link">Loja completa</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer__column-title">Contato</h3>
            <address className="footer__address">
              <strong>Nascimento Suplementos</strong>
              {storeConfig.addressShort}
              <br />
              {storeConfig.neighborhood}
              <br />
              CEP {storeConfig.cep}
              <br />
              <br />
              {storeConfig.hoursDisplay}
              <br />
              <br />
              {storeConfig.whatsappDisplay}
              <br />
              {storeConfig.instagramHandle}
              <br />
              <a href={storeConfig.ifood} className="footer__link" target="_blank" rel="noopener noreferrer">
                Pedir no iFood
              </a>
            </address>
          </div>
        </div>

        <div className="footer__payments">
          <div className="footer__payments-inner">
            <span className="footer__payments-label">Peça e combine pagamento por</span>
            <div className="footer__payment-icons">
              {paymentMethods.map((method) => (
                <span
                  key={method.id}
                  className={`footer__payment-icon ${method.featured ? 'footer__payment-icon--featured' : ''}`}
                >
                  {method.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Nascimento Suplementos. Todos os direitos reservados.
          </p>
          <nav className="footer__legal" aria-label="Links úteis">
            <a href={storeConfig.instagram} className="footer__legal-link" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={storeConfig.ifood} className="footer__legal-link" target="_blank" rel="noopener noreferrer">
              iFood
            </a>
            <a
              href={`https://wa.me/${storeConfig.whatsapp}`}
              className="footer__legal-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
