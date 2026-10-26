import { SITE } from '@/lib/site';

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
