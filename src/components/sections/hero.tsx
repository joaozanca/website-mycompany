import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { ActionLink } from '@/components/ui/action-link'
import { WhatsAppIcon } from '@/components/ui/brand-icons'
import { whatsappLink } from '@/config/site'

const audiences = ['Indústrias', 'Comércios', 'Condomínios', 'Residências']

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink pt-18">
      <Image
        src="/images/hero-painel.webp"
        alt="Técnico montando um painel elétrico industrial"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/40" aria-hidden="true" />
      <div className="circuit-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

      <div className="mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-7xl flex-col justify-center px-5 py-20 md:px-8 md:py-28">
        <div className="flex max-w-2xl flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
            {/* Z da logo (mesmo desenho de public/icon.svg), sem o quadrado de fundo. */}
            <svg viewBox="11 11 42 42" className="size-3.5 shrink-0" fill="currentColor" aria-hidden="true">
              <path d="M11 11 H53 V20 L36 28 H48 L26 44 H53 V53 H11 V44 L26 36 H14 L34 20 H11 Z" />
            </svg>
            Técnica • Segurança • Precisão
          </span>

          <h1
            id="hero-title"
            className="text-4xl leading-[1.1] font-extrabold tracking-tight text-ink-foreground sm:text-5xl lg:text-6xl"
          >
            Soluções elétricas e de segurança com <span className="text-primary">qualidade e precisão</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
            Instalação, montagem e manutenção para indústrias, comércios, condomínios e residências — com equipe
            qualificada e total respeito às normas de segurança.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <ActionLink href={whatsappLink()} external size="lg">
              <WhatsAppIcon />
              Falar no WhatsApp
            </ActionLink>
            <ActionLink href="#servicos" variant="outline" size="lg">
              Ver Serviços
              <ArrowRight />
            </ActionLink>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-6 text-sm text-ink-muted" aria-label="Quem atendemos">
            {audiences.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <span className="h-px w-3 bg-primary" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
