import { cn } from '@/lib/utils'

// href: na página inicial a logo volta ao topo (#inicio); em outras páginas leva para "/".
export function Logo({ className, href = '#inicio' }: { className?: string; href?: string }) {
  return (
    <a href={href} className={cn('inline-flex items-center gap-2', className)} aria-label="ZancaVolt - Início">
      {/* Logo oficial da ZancaVolt (mesmo desenho de public/icon.svg). */}
      <svg viewBox="0 0 64 64" className="size-8 shrink-0" aria-hidden="true">
        <rect width="64" height="64" rx="14" className="fill-primary" />
        <path d="M11 11 H53 V20 L36 28 H48 L26 44 H53 V53 H11 V44 L26 36 H14 L34 20 H11 Z" className="fill-logo-mark" />
      </svg>
      <span className="text-2xl font-extrabold tracking-tight text-ink-foreground">
        Zanca<span className="text-primary">Volt</span>
      </span>
    </a>
  )
}
