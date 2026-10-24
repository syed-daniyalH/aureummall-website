# Module 06 — Building Explorer

Owns building elevation/floor interaction, category highlighting, contextual panels and links to approved units and plans.

## Implementation

- `data.ts` contains the shared building-layer contract and contextual links.
- `components/BuildingExplorerExperience.tsx` provides the interactive layer view, mobile tap behavior and contextual panel.
- `/building-explorer` exposes the dedicated route.
- The accessible list fallback presents the same layer information without relying on the visual elevation.
- Floor numbers, unit mix and availability remain pending until the approved building register is supplied.

Acceptance: mobile tap behavior and an accessible HTML/list fallback provide the same information as the visual explorer.
