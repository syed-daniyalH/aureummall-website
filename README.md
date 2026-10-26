# Aureum Mall & Residences Website V2

This is the standalone Next.js website for the Aureum website rebuild. WordPress was used only as a one-time source archive for content and media; it is not part of the runtime, CMS, or deployment.

The site is one reusable platform divided into ten feature modules. See `src/features/README.md` and `TECH_STACK.md`.

## Current scope

- Website experience only.
- Leads from every form are delivered to one webhook (`LEAD_WEBHOOK_URL`, e.g. a Google Sheet). See `docs/LEADS_SETUP.md`.
- Payment processing and private admin systems are not enabled.
- Public facts and media are maintained in the Next.js source and should be reviewed before release.

## Purpose
- Replace the WordPress/Elementor implementation with a maintainable Next.js code base.
- Keep SEO-critical content server-rendered/static.
- Centralize business identity and property/payment data.
- Keep contact/form delivery behind an explicitly approved website endpoint; no CRM integration is enabled in this phase.

## Before publishing
1. Review page copy and project facts with the management-approved source of truth.
2. Keep `src/lib/property-data.ts` synchronized with the current approved project data.
3. Set `LEAD_WEBHOOK_URL` / `LEAD_WEBHOOK_SECRET` in Vercel and send one real test lead (`docs/LEADS_SETUP.md`).
4. Blog articles live in `src/features/news/posts.json` (39 migrated from WordPress) and render at `/news/<slug>`.
5. Old WordPress URLs are redirected in `src/features/content-seo/redirects.mjs`; add any extra URL Search Console shows.
6. Verify robots, sitemap, canonical URLs and Search Console after cutover.
7. Run full unit, browser, accessibility and security QA.

## Local start
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Production
Use the detailed Group C and Group D documents for Hostinger VPS / Nginx / Cloudflare / security / rollback guidance.
