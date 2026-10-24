# Module 10 — Content and SEO

Owns content contracts, approved data status, metadata, canonical URLs, schema, redirects, sitemap, robots, analytics event names and crawl QA.

## Current implementation

- `data.ts` is the route and analytics contract register. Every indexable public route has one stated intent, unique title and description, canonical path, priority and change frequency.
- `metadata.ts` centralizes route metadata for pages that opt into the contract.
- `SiteSchema.tsx` emits a safe, minimal `WebSite` JSON-LD object from the shared site identity.
- `sitemap.ts` is generated from the same route register as metadata; `robots.ts` points crawlers at it.
- `redirects.mjs` is wired into `next.config.mjs`. It intentionally contains no guessed redirects until the approved WordPress inventory is available.
- `ANALYTICS_EVENTS` provides a stable vocabulary for form, finder, media, FAQ and location interactions.

## Acceptance

Each indexable route has one intent, unique metadata, crawlable facts and a tested redirect decision where it replaces WordPress. Unverified redirects and claims remain unpublished.
