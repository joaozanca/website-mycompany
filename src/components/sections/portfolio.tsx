'use client'

import Image from 'next/image'
import { useState } from 'react'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'

const categories = ['Todos', 'Elétrica', 'Painéis', 'Segurança', 'Ar comprimido'] as const
type Category = (typeof categories)[number]

const projects: { src: string; title: string; category: Exclude<Category, 'Todos'>; place: string }[] = [
  {
    src: '/images/projeto-eletrica.webp',
    title: 'Infraestrutura com eletrocalhas',
    category: 'Elétrica',
    place: 'Centro comercial',
  },
  {
    src: '/images/projeto-painel.webp',
    title: 'Painéis elétricos sob medida',
    category: 'Painéis',
    place: 'Máquinas, indústrias e veículos especiais',
  },
  {
    src: '/images/projeto-cftv.webp',
    title: 'Sistema de CFTV completo',
    category: 'Segurança',
    place: 'Condomínio residencial',
  },
  {
    src: '/images/projeto-ar.webp',
    title: 'Rede de ar comprimido em PPR',
    category: 'Ar comprimido',
    place: 'Linha de produção',
  },
  {
    src: '/images/projeto-alarme.webp',
    title: 'Cerca elétrica e alarme',
    category: 'Segurança',
    place: 'Residência',
  },
  {
    src: '/images/projeto-quadro.webp',
    title: 'Manutenção de quadro de distribuição',
    category: 'Elétrica',
    place: 'Residência',
  },
]

export function Portfolio() {
  const [active, setActive] = useState<Category>('Todos')
  const visible = active === 'Todos' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="projetos" aria-labelledby="projetos-title" className="bg-background py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 md:px-8">
        <SectionHeading
          id="projetos-title"
          eyebrow="Projetos"
          title="Trabalhos realizados"
          description="Conheça alguns dos projetos que executamos para nossos clientes."
        />

        <div className="no-scrollbar -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <div role="group" aria-label="Filtrar projetos por categoria" className="flex w-max gap-2 md:mx-auto">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                className={cn(
                  'h-10 rounded-full border px-5 text-sm font-semibold transition-colors',
                  active === c
                    ? 'border-ink bg-ink text-ink-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {visible.map((p) => (
            <li key={p.src} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
              <Image
                src={p.src}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
                <span className="w-fit rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                  {p.category}
                </span>
                <h3 className="text-base font-bold text-ink-foreground">{p.title}</h3>
                <p className="text-xs text-ink-soft">{p.place}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
