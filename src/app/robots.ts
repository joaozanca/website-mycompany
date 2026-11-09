import type { MetadataRoute } from 'next'
import { company } from '@/config/site'

// Gera /robots.txt no build: em produção libera o site para os buscadores e aponta o sitemap (ZV-34).
// Fora da produção (previews e homologação da main) bloqueia tudo, para não indexar cópias do site (ZV-50).
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  if (process.env.CONTEXT !== 'production') {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${company.siteUrl}/sitemap.xml`,
  }
}
