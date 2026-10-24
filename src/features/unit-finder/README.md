# Module 05 — Unit Finder

Owns category, unit type, floor, bedroom, budget and purpose filters, results, selection summary, compare behavior and enquiry/share handoff.

## Implementation

- `data.ts` contains the filter contract, labels and supported result states.
- `components/UnitFinderExperience.tsx` owns the client-side filter state, selection summary, compare state and share handoff.
- `components/FinderFilterPanel.tsx` renders the accessible filter controls.
- `components/FinderResults.tsx` renders approved result cards when data is available.
- `components/FinderStateCard.tsx` designs loading, empty, unavailable, reserved, available, contact-for-availability and error states.
- `src/app/unit-finder/page.tsx` exposes the dedicated route.
- `UNIT_PLANS` remains empty until the approved property register is supplied; no fake inventory or live availability is shown.

Acceptance: the route is usable with filters today, and every inventory state has an explicit UI path for the future data connection.
