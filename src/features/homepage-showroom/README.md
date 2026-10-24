# Module 03 — Homepage showroom

Owns the homepage journey: hero, category choice, Unit Finder entry, featured residence pathways, project snapshot, commercial/office discovery, building explorer preview, payment-plan preview, immersive-media slot, location/progress/trust entry points, FAQs and final conversion.

## Implementation

- `data.ts` holds the homepage content model and deliberately excludes unapproved prices, dimensions, approvals and construction claims.
- `components/ProjectSnapshot.tsx` presents the first serious project facts.
- `components/FeaturedResidences.tsx` presents Studio, 1-Bed and 2-Bed pathways.
- `components/CommercialTabs.tsx` keeps shops, food court and offices discoverable in one interaction.
- `components/BuildingPreview.tsx` establishes the future interactive building-layer pattern.
- `components/PaymentPlanPreview.tsx` exposes the payment structure without inventing live amounts.
- `components/ImmersivePreview.tsx` provides an honest 360° media slot until approved media exists.
- `components/ProjectEvidence.tsx` links location, construction and trust information.
- `components/FaqList.tsx` uses native accessible disclosure controls.
- `components/FinalConversion.tsx` keeps the existing form as the final website interaction.

Acceptance: category discovery takes one interaction and serious project information takes no more than two. The homepage remains website-only; no CRM, payment processing or private admin workflow is introduced.
