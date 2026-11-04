import { FacebookIcon, InstagramIcon, LinkedInIcon } from '@/components/ui/brand-icons'
import { Logo } from '@/components/layout/logo'
import { company, navItems, services } from '@/config/site'

const socials = [
  { label: 'Instagram', href: company.social.instagram, Icon: InstagramIcon },
  { label: 'Facebook', href: company.social.facebook, Icon: FacebookIcon },
  { label: 'LinkedIn', href: company.social.linkedin, Icon: LinkedInIcon },
].filter((social) => social.href)

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-muted">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="text-sm leading-relaxed">
            Serviços técnicos em elétrica, segurança eletrônica e ar comprimido para indústrias, comércios, condomínios
            e residências.
          </p>
          <ul className="flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} da ZancaVolt`}
                  className="flex size-10 items-center justify-center rounded-lg border border-ink-border text-ink-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Links rápidos" className="flex flex-col gap-4">
          <h2 className="text-sm font-bold tracking-wide text-ink-foreground uppercase">Links rápidos</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-bold tracking-wide text-ink-foreground uppercase">Serviços</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {services.map((s) => (
              <li key={s.title}>
                <a href="#servicos" className="hover:text-primary">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-bold tracking-wide text-ink-foreground uppercase">Contato</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <a href={company.phoneHref} className="hover:text-primary">
                {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="break-all hover:text-primary">
                {company.email}
              </a>
            </li>
            <li>{company.region}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs sm:flex-row sm:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {company.name}. Todos os direitos reservados.
          </p>
          {company.cnpj && <p>CNPJ: {company.cnpj}</p>}
        </div>
      </div>
    </footer>
  )
}
