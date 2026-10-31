export type ImmersiveMediaKind = 'image' | 'floor-plan';

export type ImmersiveMediaAsset = {
  id: string;
  kind: ImmersiveMediaKind;
  label: string;
  title: string;
  description: string;
  alt: string;
  caption: string;
  src: string;
  width?: number;
  height?: number;
};

/** The 360° concept tour is a separate Vercel project (github.com/aureummallinfo-wq/360-aureum-virtual), embedded on demand. */
export const VIRTUAL_TOUR = {
  url: 'https://360-aureum-virtual.vercel.app/',
  poster: '/assets/aureum/approved/renders/aureum-exterior-day-view.webp',
  posterAlt: 'Aureum Mall & Residences exterior render, the starting point of the 360° tour',
  note: 'Artist’s impression: 360° concept views based on the architects’ perspective images. Surroundings, furnishings and connections between spaces are illustrative, not an approved floor plan. Confirm current layouts with the sales team.',
} as const;

export const MEDIA_PRINCIPLES = [
  'Project imagery is presented with descriptive text for easy browsing.',
  'Floor plans remain available alongside their labels and context.',
  'Local project assets keep the experience fast and consistent across devices.',
] as const;

export const PROJECT_MEDIA: readonly ImmersiveMediaAsset[] = [
  {
    id: 'mall-atrium',
    kind: 'image',
    label: 'The mall',
    title: 'Three retail levels around a central atrium',
    description: 'Shopfronts, kiosks and escalators around the central atrium. Artist’s impression; brand signage is illustrative.',
    alt: 'Aureum Mall central atrium with shoppers and escalators',
    caption: 'Ground floor 26 ft; first and second floors 18 ft.',
    src: '/assets/aureum/approved/mall/aureum-mall-atrium.webp',
  },
  {
    id: 'food-court',
    kind: 'image',
    label: 'Dining & leisure',
    title: 'Food court beside the playland',
    description: 'The third-floor food court sits beside an 11,948 sq ft playland and a 6,329 sq ft trampoline park. Artist’s impression.',
    alt: 'Aureum food court with families dining',
    caption: 'Food court units of around 301 sq ft.',
    src: '/assets/aureum/approved/mall/aureum-food-court.webp',
  },
  {
    id: 'residence-lounge',
    kind: 'image',
    label: 'Residences',
    title: 'Light, space and calm',
    description: 'Open living and dining areas with floor-to-ceiling glazing. Interior impression.',
    alt: 'Aureum apartment lounge with open kitchen',
    caption: 'Studios, one- and two-bedroom apartments on the 6th to 12th floors.',
    src: '/assets/aureum/approved/residences/aureum-lounge-1.webp',
  },
  {
    id: 'ground-floor',
    kind: 'floor-plan',
    label: 'Ground floor',
    title: 'Ground floor plan',
    description: 'Large-format retail, a showroom and the central atrium.',
    alt: 'Aureum Mall ground floor plan',
    caption: 'Ground floor plan, August 2026 drawings.',
    src: '/assets/aureum/approved/floor-plans/aureum-ground-floor-plan-2026.webp',
  },
  {
    id: 'first-floor',
    kind: 'floor-plan',
    label: 'First floor',
    title: 'First floor plan',
    description: 'A premium retail floor with a seamless customer experience.',
    alt: 'Aureum Mall first floor plan',
    caption: 'First floor plan from the Aureum project materials.',
    src: '/assets/aureum/approved/floor-plans/aureum-first-floor-plan.webp',
  },
  {
    id: 'residential-floor',
    kind: 'floor-plan',
    label: 'Residential floor',
    title: 'Typical residential floor',
    description: 'Studios, one- and two-bedroom apartments and premium glass residences around an open-to-sky courtyard, with offices on the right-hand side.',
    alt: 'Typical Aureum residential floor plan',
    caption: 'Typical residential floor, 6th to 12th floors.',
    src: '/assets/aureum/approved/floor-plans/aureum-residential-floor-plan-2026.webp',
  },
] as const;
