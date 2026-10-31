import type { ShowcaseImage } from './components/ProjectShowcase';

const base = '/assets/aureum/approved';

export const MALL_IMAGES: readonly ShowcaseImage[] = [
  { src: `${base}/mall/aureum-mall-atrium.webp`, alt: 'Aureum Mall central atrium with shoppers and escalators', label: 'The central atrium' },
  { src: `${base}/mall/aureum-mall-escalators.webp`, alt: 'Escalators linking the Aureum Mall retail levels', label: 'Three retail levels' },
  { src: `${base}/mall/aureum-mall-shopfronts.webp`, alt: 'Shopfronts along a wide Aureum Mall passage', label: 'Shopfronts & passages' },
];

export const FOOD_COURT_IMAGE: ShowcaseImage = { src: `${base}/mall/aureum-food-court.webp`, alt: 'Aureum food court with families dining', label: 'The food court' };

export const LEISURE_IMAGES: readonly ShowcaseImage[] = [
  { src: `${base}/leisure/aureum-playland-1.webp`, alt: 'Colourful Aureum playland with rides for children', label: 'Playland · 11,948 sq ft' },
  { src: `${base}/leisure/aureum-playland-2.webp`, alt: 'Arcade games in the Aureum playland', label: 'Gaming zone' },
  { src: `${base}/leisure/aureum-playland-3.webp`, alt: 'Family entertainment rides in the Aureum playland', label: 'Family entertainment' },
];

export const RESIDENCE_IMAGES: readonly ShowcaseImage[] = [
  { src: `${base}/residences/aureum-lounge-1.webp`, alt: 'Aureum apartment lounge with open kitchen', label: 'Living & kitchen' },
  { src: `${base}/residences/aureum-bedroom-1.webp`, alt: 'Aureum apartment bedroom with built-in wardrobes', label: 'Bedroom' },
  { src: `${base}/residences/aureum-corridor-1.webp`, alt: 'Hotel-style residential corridor at Aureum', label: 'Residential corridor' },
  { src: `${base}/residences/aureum-lounge-2.webp`, alt: 'Aureum apartment living area with forest feature wall', label: 'Living area' },
  { src: `${base}/residences/aureum-bedroom-2.webp`, alt: 'Aureum apartment bedroom with a TV wall', label: 'Bedroom view' },
  { src: `${base}/residences/aureum-corridor-2.webp`, alt: 'Residential corridor with numbered apartment doors', label: 'Arrival corridor' },
];

export const CUTAWAY_IMAGES: readonly ShowcaseImage[] = [
  { src: `${base}/residences/aureum-studio-cutaway.webp`, alt: 'Representative 3D layout of an Aureum studio apartment', label: 'Studio · representative layout' },
  { src: `${base}/residences/aureum-two-bed-cutaway.webp`, alt: 'Representative 3D layout of an Aureum two-bedroom apartment', label: 'Two bedrooms · representative layout' },
];

const PLAN_NOTE = 'Subject to final approved drawings';

export const FLOOR_PLAN_IMAGES: readonly ShowcaseImage[] = [
  { src: `${base}/floor-plans/aureum-ground-floor-plan-2026.webp`, alt: 'Aureum ground floor plan with retail, showroom and the central atrium', label: 'Ground floor · 26 ft', note: PLAN_NOTE },
  { src: `${base}/floor-plans/aureum-first-floor-plan.webp`, alt: 'Aureum first floor plan with shops, kiosks and the grocery store', label: 'First floor · 18 ft', note: PLAN_NOTE },
  { src: `${base}/floor-plans/aureum-food-court-floor-plan-2026.webp`, alt: 'Aureum third floor plan with food court, playland and trampoline park', label: 'Third floor · food court · 25 ft', note: PLAN_NOTE },
  { src: `${base}/floor-plans/aureum-second-floor-plan-2026.webp`, alt: 'Aureum second floor plan with numbered shops around the atrium', label: 'Second floor · 18 ft', note: PLAN_NOTE },
  { src: `${base}/floor-plans/aureum-residential-floor-plan-2026.webp`, alt: 'Typical Aureum residential floor with apartments around an open-to-sky courtyard and offices', label: 'Typical residential floor · 6th to 12th', note: PLAN_NOTE },
  { src: `${base}/floor-plans/aureum-basement-1-plan-2026.webp`, alt: 'Aureum basement level 1 parking plan', label: 'Basement level 1 · parking', note: PLAN_NOTE },
  { src: `${base}/floor-plans/aureum-basement-2-plan-2026.webp`, alt: 'Aureum basement level 2 parking plan', label: 'Basement level 2 · parking', note: PLAN_NOTE },
];

export const LOCATION_MAP: ShowcaseImage = { src: `${base}/location/aureum-location-map-2026.webp`, alt: 'Map of Aureum Mall & Residences at the Bahria Town Ring Road Interchange, Lahore, with nearby landmarks', label: 'Bahria Town Ring Road Interchange', note: 'Illustrative map, not to scale' };

export const PARKING_IMAGE: ShowcaseImage = { src: `${base}/parking/aureum-basement-parking.webp`, alt: 'Aureum basement parking level with marked bays', label: 'Basement parking' };

export const EXTERIOR_NIGHT: ShowcaseImage = { src: `${base}/renders/aureum-exterior-night.webp`, alt: 'Aureum Mall & Residences at night', label: 'Aureum at night' };
export const EXTERIOR_NIGHT_WIDE: ShowcaseImage = { src: `${base}/renders/aureum-exterior-night-wide.webp`, alt: 'Aureum Mall & Residences at night from the Ring Road', label: 'Visible from Ring Road' };
