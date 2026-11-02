import type { MetadataRoute } from 'next'
import { company } from '@/config/site'

// Gera /sitemap.xml no build com a página do site (ZV-34).
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${company.siteUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }]
}
