import Image from 'next/image'
import { Check } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'

const commitments = ['Materiais de primeira linha e garantia do serviço', 'Pontualidade, organização e limpeza na obra']

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="bg-muted py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl shadow-ink-shadow/10 sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="/images/sobre-equipe.webp"
              alt="Eletricistas da ZancaVolt inspecionando um quadro de distribuição"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-2 -bottom-6 rounded-xl bg-primary p-5 text-primary-foreground shadow-lg sm:right-6">
            <p className="font-heading text-3xl font-extrabold">+30 anos</p>
            <p className="text-sm font-medium">de experiência em elétrica</p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <SectionHeading
            id="sobre-title"
            align="left"
            eyebrow="Sobre a ZancaVolt"
            title="Experiência técnica a serviço da sua segurança"
            description="Somos uma empresa especializada em serviços elétricos, segurança eletrônica e redes de ar comprimido. Atuamos com rigor técnico, transparência e compromisso com prazos, atendendo desde residências até grandes plantas industriais."
          />

          <ul className="flex flex-col gap-3">
            {commitments.map((c) => (
              <li key={c} className="flex items-center gap-3 text-foreground">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-primary">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
