# Module 09 — Trust and location

Owns exact location information, verified travel-time context, construction timeline, approvals, developer information and evidence-backed FAQs.

## Current implementation

- `/location` is the full Trust & Location experience; `/construction-updates` uses its dated progress register.
- `data.ts` is the source register. Current location identity is labelled with its owner; maps, travel times, construction updates, approvals and developer details remain empty until their source and approval are supplied.
- Map and timeline surfaces are useful empty states rather than invented project claims.
- Each published fact carries a source note and optional effective date.

## Acceptance

Every trust or location claim has a source, date or approval owner. Unsupported claims remain unpublished.
