# Module 07 — Payment plans

Owns approved HTML tables, effective dates, stage labels, calculations, PDF supplements, terms and disclaimers.

## Implementation

- `data.ts` stores the source-transcribed Payment Plan 2026 rows and publishing rules.
- `components/PaymentPlansExperience.tsx` provides pathway filtering and semantic HTML tables for offices, apartments, commercial shops and 1st-floor shops.
- The source PDF is the primary text register; payment artwork remains supplemental and conflicts are called out explicitly.
- `/payment-plans` is a complete website route rather than an image/PDF-only placeholder.
- Values are presented as source-provided and are not independently verified here; prices, charges and availability remain subject to the source terms.

Acceptance: the HTML table is understandable without opening a PDF and any calculator reconciles to the approved total.
