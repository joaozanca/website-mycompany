import { WhatsAppIcon } from '@/components/ui/brand-icons'
import { whatsappLink } from '@/config/site'

// Fica a 80 px da borda de baixo para não ser coberto pelo selo "Powered by Netlify" do plano grátis (ZV-40).
// Dentro de uma região própria (aside) para o leitor de tela encontrá-lo ao navegar pelas regiões
// da página; o visual não muda (ZV-38).
export function WhatsAppFloat() {
  return (
    <aside aria-label="Contato rápido">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a ZancaVolt no WhatsApp"
        className="fixed right-5 bottom-20 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg shadow-ink-shadow/25 transition-transform hover:scale-105 focus-visible:ring-4 focus-visible:ring-ring md:right-8 md:size-16"
      >
        <span
          className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-30 motion-reduce:hidden"
          aria-hidden="true"
        />
        <WhatsAppIcon className="relative size-7 md:size-8" />
      </a>
    </aside>
  )
}
