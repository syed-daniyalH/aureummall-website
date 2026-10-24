import { SITE } from '@/lib/site';

const SITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  description: SITE.tagline,
  inLanguage: 'en',
};

export function SiteSchema() {
  const json = JSON.stringify(SITE_SCHEMA).replace(/</g, '\\u003c');
  return <script id="aureum-site-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
