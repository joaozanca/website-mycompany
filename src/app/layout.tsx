import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { company } from '@/config/site'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

// Endereço base dos links das metatags (imagem de compartilhamento). A publicação da main (produção)
// usa o domínio da empresa; o preview de cada PR usa o próprio endereço (DEPLOY_PRIME_URL).
const siteUrl =
  process.env.CONTEXT === 'production' ? company.siteUrl : (process.env.DEPLOY_PRIME_URL ?? company.siteUrl)

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Endereço oficial da página, também nos previews e em website-zancavolt.netlify.app (ZV-34).
  alternates: { canonical: `${company.siteUrl}/` },
  title: 'ZancaVolt | Elétrica, Segurança Eletrônica e Ar Comprimido',
  description:
    'Instalação, montagem e manutenção elétrica, painéis, CFTV, alarmes, cerca elétrica e tubulação de ar comprimido em PPR para indústrias, comércios, condomínios e residências. Solicite seu orçamento.',
  keywords: [
    'eletricista',
    'instalação elétrica',
    'painéis elétricos',
    'CFTV',
    'alarmes',
    'cerca elétrica',
    'ar comprimido PPR',
    'manutenção elétrica',
  ],
  openGraph: {
    title: 'ZancaVolt | Soluções elétricas e de segurança',
    description: 'Qualidade e precisão em elétrica, segurança eletrônica e ar comprimido.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ZancaVolt: soluções elétricas e de segurança' }],
    locale: 'pt_BR',
    type: 'website',
    siteName: 'ZancaVolt',
  },
  // Nome do atalho ao adicionar o site à tela inicial do iPhone.
  appleWebApp: { title: 'ZancaVolt' },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
  // Gera <meta name="color-scheme" content="only light">: o site só tem versão clara (ZV-40).
  colorScheme: 'only light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
