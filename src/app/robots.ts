import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

// Preview hosts (*.vercel.app) are kept out of Google with an X-Robots-Tag: noindex header (next.config.mjs).
// They stay crawlable on purpose: Google must fetch a page to see its noindex and drop it from results.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/thank-you'] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
