import { company, services } from '@/config/site'

// Dados estruturados de empresa local (schema.org) para o Google entender quem é a ZancaVolt,
// onde atende e quais serviços oferece (ZV-34).
const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'Electrician',
  '@id': `${company.siteUrl}/#empresa`,
  name: company.name,
  url: `${company.siteUrl}/`,
  image: `${company.siteUrl}/og-image.jpg`,
  logo: `${company.siteUrl}/apple-icon.png`,
  telephone: `+${company.whatsappNumber}`,
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: company.city,
    addressRegion: company.state,
    addressCountry: 'BR',
  },
  areaServed: [
    { '@type': 'City', name: 'São José dos Pinhais' },
    { '@type': 'City', name: 'Curitiba' },
    { '@type': 'AdministrativeArea', name: 'Região Metropolitana de Curitiba' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.title, description: service.description },
    })),
  },
}

export function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      // O JSON vem só de src/config/site.ts; "<" é escapado para o texto não fechar a tag script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, '\u003c') }}
    />
  )
}
