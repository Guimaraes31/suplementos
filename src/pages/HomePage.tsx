import { lazy } from 'react'
import HeroCarousel from '../components/HeroCarousel/HeroCarousel'
import TrustBar from '../components/TrustBar/TrustBar'
import SectionDivider from '../components/SectionDivider/SectionDivider'
import DeferredMount from '../components/DeferredMount/DeferredMount'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const MaisVendidos = lazy(() => import('../components/MaisVendidos/MaisVendidos'))
const HomeShopTeaser = lazy(() => import('../components/HomeShopTeaser/HomeShopTeaser'))
const Benefits = lazy(() => import('../components/Benefits/Benefits'))
const Testimonials = lazy(() => import('../components/Testimonials/Testimonials'))
const WhatsAppCTA = lazy(() => import('../components/WhatsAppCTA/WhatsAppCTA'))

export default function HomePage() {
  useDocumentTitle(
    'Nascimento Suplementos | A loja que te orienta antes de vender',
    'Suplementos em Jardim São Carlos, Zona Sul SP. Atendimento especializado, preço justo e entrega rápida. Peça orientação no WhatsApp.',
  )

  return (
    <>
      <HeroCarousel />
      <TrustBar />
      <SectionDivider label="Mais Vendidos" />
      <DeferredMount minHeight={380}>
        <MaisVendidos />
      </DeferredMount>
      <SectionDivider label="Loja" />
      <DeferredMount minHeight={280}>
        <HomeShopTeaser />
      </DeferredMount>
      <SectionDivider />
      <DeferredMount minHeight={320}>
        <Benefits />
      </DeferredMount>
      <SectionDivider label="Como comprar" />
      <DeferredMount minHeight={300}>
        <Testimonials />
      </DeferredMount>
      <SectionDivider label="Orientação" />
      <DeferredMount minHeight={240}>
        <WhatsAppCTA />
      </DeferredMount>
    </>
  )
}