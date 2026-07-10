import Hero from '../components/Hero/Hero'
import TrustBar from '../components/TrustBar/TrustBar'
import MaisVendidos from '../components/MaisVendidos/MaisVendidos'
import Benefits from '../components/Benefits/Benefits'
import Testimonials from '../components/Testimonials/Testimonials'
import WhatsAppCTA from '../components/WhatsAppCTA/WhatsAppCTA'
import SectionDivider from '../components/SectionDivider/SectionDivider'
import HomeShopTeaser from '../components/HomeShopTeaser/HomeShopTeaser'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function HomePage() {
  useDocumentTitle(
    'Nascimento Suplementos | A loja que te orienta antes de vender',
    'Suplementos em Jardim São Carlos, Zona Sul SP. Atendimento especializado, preço justo e entrega rápida. Peça orientação no WhatsApp.',
  )

  return (
    <>
      <Hero />
      <TrustBar />
      <SectionDivider label="Mais Vendidos" />
      <MaisVendidos />
      <SectionDivider label="Loja" />
      <HomeShopTeaser />
      <SectionDivider />
      <Benefits />
      <SectionDivider label="Como comprar" />
      <Testimonials />
      <SectionDivider label="Orientação" />
      <WhatsAppCTA />
    </>
  )
}
