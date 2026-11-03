import type { Metadata } from 'next'
import { Home } from 'lucide-react'
import { Logo } from '@/components/layout/logo'
import { ActionLink } from '@/components/ui/action-link'
import { WhatsAppIcon } from '@/components/ui/brand-icons'
import { whatsappLink } from '@/config/site'

// Página de endereço não encontrado (ZV-46). A exportação estática gera out/404.html, que a Netlify
// entrega com o código 404 para qualquer endereço que não existe (o Next já marca a página como noindex).
export const metadata: Metadata = {
  title: 'Página não encontrada | ZancaVolt',
}

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ink px-5 py-16 text-center">
      <div className="circuit-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

      <Logo href="/" />

      <p className="mt-12 font-heading text-6xl font-extrabold text-primary sm:text-7xl">404</p>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ink-foreground sm:text-3xl">Página não encontrada</h1>
      <p className="mt-3 max-w-md text-ink-soft">
        O endereço que você acessou não existe ou mudou. Volte para o início ou fale com a gente pelo WhatsApp.
      </p>

      <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:w-auto sm:flex-row">
        <ActionLink href="/" size="lg">
          <Home />
          Ir para o início
        </ActionLink>
        <ActionLink href={whatsappLink()} external variant="outline" size="lg">
          <WhatsAppIcon />
          Falar no WhatsApp
        </ActionLink>
      </div>
    </main>
  )
}
