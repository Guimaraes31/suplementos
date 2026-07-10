import { storeConfig } from '../../config/store'
import './WhatsAppFab.css'

const whatsappMessage = encodeURIComponent(
  'Olá! Quero orientação para escolher o suplemento certo pro meu objetivo.',
)

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3C8.9 21.5 10.4 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z" strokeLinejoin="round" />
      <path d="M8.5 9.5c.3 1.5 1.8 3.5 3.5 4 1 .4 1.8.3 2.5-.2l.5-.5c.2-.2.2-.5 0-.7l-1-1c-.2-.2-.5-.2-.7 0l-.3.3c-.1.1-.3.1-.5 0-.5-.3-1.5-1.2-1.7-1.7-.1-.2 0-.4.1-.5l.3-.3c.2-.2.2-.5 0-.7l-1-1c-.2-.2-.5-.2-.7 0l-.5.5c-.5.7-.6 1.5-.2 2.5z" />
    </svg>
  )
}

export default function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${storeConfig.whatsapp}?text=${whatsappMessage}`}
      className="whatsapp-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir orientação no WhatsApp"
    >
      <span className="whatsapp-fab__icon">
        <WhatsAppIcon />
      </span>
      <span className="whatsapp-fab__label">Orientação</span>
    </a>
  )
}
