import { SITE } from '@/lib/site';

const POSTAL_ADDRESS = { '@type': 'PostalAddress', ...SITE.address };

const SITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}#organization`,
      name: SITE.name,
      url: SITE.url,
      email: SITE.email,
      telephone: SITE.phoneE164,
      logo: `${SITE.url}/assets/aureum/Logo.png`,
      address: POSTAL_ADDRESS,
      sameAs: Object.values(SITE.social),
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: SITE.phoneE164,
        email: SITE.email,
        areaServed: 'PK',
      },
    },
    {
      // Sales office / site location so the project can appear in local search results.
      '@type': 'RealEstateAgent',
      '@id': `${SITE.url}#sales-office`,
      name: `${SITE.name} Sales Office`,
      url: SITE.url,
      telephone: SITE.phoneE164,
      email: SITE.email,
      image: `${SITE.url}/assets/aureum/approved/og/og-default.jpg`,
      logo: `${SITE.url}/assets/aureum/Logo.png`,
      address: POSTAL_ADDRESS,
      areaServed: { '@type': 'City', name: 'Lahore' },
      sameAs: Object.values(SITE.social),
      parentOrganization: { '@id': `${SITE.url}#organization` },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}#website`,
      name: SITE.name,
      url: SITE.url,
      description: SITE.tagline,
      inLanguage: 'en',
      publisher: { '@id': `${SITE.url}#organization` },
    },
  ],
};

export function SiteSchema() {
  const json = JSON.stringify(SITE_SCHEMA).replace(/</g, '\\u003c');
  return <script id="aureum-site-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
