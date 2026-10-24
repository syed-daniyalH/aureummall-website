# Module 02 — Design system

The design system is the shared visual contract for every Aureum feature. It owns the palette, typography, spacing scale, radii, shadows, motion, grid width, focus treatment and reduced-motion behavior.

## Token source

- `src/styles/tokens.css` contains the reusable CSS custom properties.
- `src/app/globals.css` contains the shared layout and primitive styles that consume those tokens.
- New feature components should use the existing variables instead of adding one-off colors, spacing or shadows.

## Primitive source

- `src/components/ui/BrandMark.tsx` — brand mark treatment.
- `src/components/ui/Button.tsx` — accessible action button variants.
- `src/components/ui/ButtonLink.tsx` — navigation/action link variants.
- `src/components/ui/Eyebrow.tsx` — consistent overline label.
- `src/components/ui/FormField.tsx` — shared form-field label wrapper.
- `src/components/ui/SectionHeading.tsx` — section heading and supporting note.
- `src/components/ui/TextLink.tsx` — text link with the shared directional cue.

## Acceptance

- Existing homepage, shell, finder and form components consume the primitives.
- Focus-visible states and reduced motion are global defaults.
- No CRM, sales automation or payment behavior is introduced by this module.
- Future modules extend these primitives instead of inventing local visual rules.
