import { WORDPRESS_REDIRECTS } from './src/features/content-seo/redirects.mjs';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Let the authored redirect map control legacy trailing-slash URLs so they return 301.
  skipTrailingSlashRedirect: true,
  allowedDevOrigins: ['127.0.0.1'],
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      // Keep every *.vercel.app preview/deployment URL out of Google. Crawling stays allowed so Google can
      // see this header and drop pages it has already indexed; aureummall.info is not affected.
      {
        source: '/:path*',
        has: [{ type: 'host', value: '.*\\.vercel\\.app' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  async redirects() {
    // The launch plan calls for explicit 301 redirects. Next's `permanent: true`
    // emits 308, so translate the authored redirect map to the required status.
    const rules = WORDPRESS_REDIRECTS.map(({ permanent, ...rule }) => ({
      ...rule,
      statusCode: permanent ? 301 : 302,
    }));
    const slashRules = rules
      .filter((rule) => !rule.source.includes(':') && !rule.source.endsWith('/'))
      .map((rule) => ({ ...rule, source: `${rule.source}/` }));
    const legacyPageSlashRules = ['/about', '/payment-plans', '/gallery', '/news', '/contact']
      .map((path) => ({ source: `${path}/`, destination: path, statusCode: 301 }));
    return [...rules, ...slashRules, ...legacyPageSlashRules];
  }
};

export default nextConfig;
