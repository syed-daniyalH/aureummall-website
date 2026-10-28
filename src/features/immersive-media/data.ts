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
    id: 'project-profile',
    kind: 'image',
    label: 'Project profile',
    title: 'Aureum Mall & Residences',
    description: 'Project profile artwork for the mixed-use destination.',
    alt: 'Aureum Mall and Residences project profile artwork',
    caption: 'Aureum Mall & Residences — The Perfect Blend of Serenity and Luxury.',
    src: '/assets/aureum/approved/payment-plans/payment-plan-02.webp',
  },
  {
    id: 'payment-plan',
    kind: 'image',
    label: 'Payment plans',
    title: 'A clear path to ownership',
    description: 'Payment-plan artwork for apartments, offices and shops.',
    alt: 'Aureum Mall payment plan artwork',
    caption: 'Review the complete payment schedule on the Payment Plans page.',
    src: '/assets/aureum/approved/payment-plans/payment-plan-10.webp',
  },
  {
    id: 'investment-view',
    kind: 'image',
    label: 'Investment view',
    title: 'Spaces for business and growth',
    description: 'Project artwork showing the commercial and office opportunity.',
    alt: 'Aureum Mall commercial and office project artwork',
    caption: 'Commercial and corporate pathways at Bahria Town, Lahore.',
    src: '/assets/aureum/approved/payment-plans/payment-plan-07.webp',
  },
  {
    id: 'ground-floor',
    kind: 'floor-plan',
    label: 'Ground floor',
    title: 'Ground floor plan',
    description: 'The main retail destination with space planned for visibility and footfall.',
    alt: 'Aureum Mall ground floor plan',
    caption: 'Ground floor plan from the Aureum project materials.',
    src: '/assets/aureum/approved/floor-plans/aureum-ground-floor-plan.webp',
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
    id: 'one-bed-apartment',
    kind: 'floor-plan',
    label: '1 bed apartment',
    title: '1 bed apartment plan',
    description: 'A residential plan for an efficient, comfortable everyday home.',
    alt: 'Aureum Mall 1 bed apartment floor plan',
    caption: '1 bed apartment floor plan from the Aureum project materials.',
    src: '/assets/aureum/approved/floor-plans/aureum-1-bed-apartment-render.webp',
  },
] as const;
