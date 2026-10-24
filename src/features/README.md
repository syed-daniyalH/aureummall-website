# Ten reusable website modules

Each feature folder owns its UI, data adapters, tests and documentation. Shared primitives belong in `src/components`, not inside a feature folder.

1. `site-shell` — header, mobile navigation, footer, breadcrumbs, global CTAs and route states.
2. `design-system` — Aureum tokens, typography, buttons, cards, forms, drawers, tables and responsive primitives.
3. `homepage-showroom` — hero, category discovery, featured properties, project story and conversion bands.
4. `property-catalogue` — residences, shops, offices, food court and reusable property/detail templates.
5. `unit-finder` — guided filters, result cards, empty/loading/error states, comparison and selection summary.
6. `building-explorer` — building elevation, floor/category navigation, accessible list fallback and unit linking.
7. `payment-plans` — approved plan tables, effective dates, calculations, downloads and disclaimers.
8. `immersive-media` — galleries, floor plans, 360 viewer, video, lazy loading and static fallbacks.
9. `trust-location` — map, location facts, approvals, construction updates, developer information and FAQs.
10. `content-seo` — content contracts, metadata, schema, redirects, sitemap, robots and analytics events.

The ten modules are one website, not ten websites. They share the same data contracts, tokens, layout and release pipeline.
