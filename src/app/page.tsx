import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { CtaBand } from '@/components/sections/cta-band'
import { FeaturesStrip } from '@/components/sections/features-strip'
import { Hero } from '@/components/sections/hero'
import { Portfolio } from '@/components/sections/portfolio'
import { Process } from '@/components/sections/process'
import { Services } from '@/components/sections/services'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { WhatsAppFloat } from '@/components/layout/whatsapp-float'
import { LocalBusinessJsonLd } from '@/components/seo/local-business-json-ld'

export default function Page() {
  return (
    <>
      <LocalBusinessJsonLd />
      <SiteHeader />
      <main>
        <Hero />
        <FeaturesStrip />
        <Services />
        <About />
        <Process />
        <Portfolio />
        {/* Depoimentos ocultos até haver avaliações reais no Google (ZV-16); o componente continua em sections/testimonials.tsx. */}
        <CtaBand />
        <Contact />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  )
}
