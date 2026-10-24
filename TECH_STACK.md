# Aureum Next.js Website — Recommended Stack

This project is the reusable website platform for Aureum. It is copied from the starter scaffold and is intentionally not production-complete yet.

## Core stack

- Next.js 16.x Active LTS with the App Router and React Server Components by default. Next.js 16 requires Node.js 20.9+ and TypeScript 5+.
- React 19.3 and TypeScript in strict mode.
- CSS variables for Aureum design tokens; Tailwind CSS is optional and should not replace the token system.
- shadcn/ui only as source code for accessible primitives such as dialog, drawer, tabs, accordion, form controls and data tables. The components remain owned by this repository and are restyled for Aureum.
- Zod for runtime validation of content, query parameters and any future POST body.
- Native Next.js `fetch`, caching and server-side data loading first. Add TanStack Query only when the Unit Finder becomes a genuinely dynamic browser data experience.
- Playwright for end-to-end and responsive browser testing.
- Vitest for small pure-function and data-model tests when the project adds non-UI logic.
- MapLibre GL JS only if the location page needs an interactive vector map; otherwise use a lightweight static map image/link.
- Motion should start with CSS transitions and React View Transitions. Add Motion only for interactions that cannot be expressed cleanly with CSS.
- A 3D library such as React Three Fiber is optional for a true 3D Building Explorer. Start with accessible SVG/HTML so the feature remains fast and crawlable.
- 360 viewing should use a specialized viewer only after approved equirectangular assets exist; every viewer must have a static accessible fallback.

## Deployment

- Hostinger VPS as the first production target.
- Nginx reverse proxy in front of the Next.js process/container.
- Cloudflare for DNS, TLS, CDN and edge protection if approved.
- `output: "standalone"` or a containerized deployment for a small reproducible runtime.
- Separate local, staging and production environments.
- Secrets supplied by the host/runtime, never committed to the repository.

At implementation time, pin exact package versions and commit the lockfile. Do not deploy with floating `latest` dependencies.

## What we intentionally do not add yet

- No CRM SDK or CRM webhook.
- No payment gateway.
- No authentication system.
- No database until approved property data needs dynamic editing or availability queries.
- No heavy 3D or map dependency before the real assets and UX requirements are confirmed.

## Library selection rule

Use the smallest reliable tool that solves the feature. The Aureum website should be highly capable because its architecture and content model are strong, not because every page carries a large dependency bundle.
