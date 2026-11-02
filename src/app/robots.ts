import type { MetadataRoute } from 'next'
import { company } from '@/config/site'

// Gera /robots.txt no build: libera o site para os buscadores e aponta o sitemap (ZV-34).
// Os previews não são indexados porque a Netlify envia "X-Robots-Tag: noindex" neles.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${company.siteUrl}/sitemap.xml`,
  }
}
