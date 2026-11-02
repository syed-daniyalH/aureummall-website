import { BUILDING_LEVELS } from '@/lib/project-facts';
import { FLOOR_PLAN_IMAGES } from '@/features/project-showcase/images';
import type { ShowcaseImage } from '@/features/project-showcase/components/ProjectShowcase';

export type ExplorerLevel = {
  id: string;
  name: string;
  /** Which floors the level spans, or its ceiling height. */
  meta?: string;
  summary: string;
  plans: readonly ShowcaseImage[];
  /** Payment tables (from payment-plans/data.ts) whose units sit on this level. */
  tableIds: readonly string[];
  pricesNote?: string;
  href: string;
  hrefLabel: string;
  /** Relative size of the level in the elevation drawing. */
  shape: 'tower' | 'hotel' | 'podium' | 'basement';
};

function fact(level: (typeof BUILDING_LEVELS)[number]['level']) {
  const entry = BUILDING_LEVELS.find((item) => item.level === level);
  if (!entry) throw new Error(`Missing building level: ${level}`);
  return entry;
}

function plan(fileName: string) {
  const image = FLOOR_PLAN_IMAGES.find((item) => item.src.endsWith(fileName));
  if (!image) throw new Error(`Missing floor plan: ${fileName}`);
  return image;
}

function height(level: (typeof BUILDING_LEVELS)[number]['level']) {
  const entry = fact(level);
  return 'height' in entry ? `${entry.height} ceilings` : undefined;
}

// Top of the building first, as it is drawn.
export const EXPLORER_LEVELS: readonly ExplorerLevel[] = [
  {
    id: 'residences',
    name: 'Residences & offices',
    meta: '6th to 12th floors',
    summary: 'Studios, one- and two-bedroom apartments and the Premium Glass Collection, with full-glass corporate offices facing Ring Road. Residents and office users each have their own entrance and lifts.',
    plans: [plan('aureum-residential-floor-plan-2026-v2.webp')],
    tableIds: ['apartments', 'offices'],
    pricesNote: 'Premium Glass Collection residences are quoted individually.',
    href: '/apartments',
    hrefLabel: 'Explore the residences',
    shape: 'tower',
  },
  {
    id: 'hotel',
    name: 'Hotel',
    summary: `${fact('Hotel').detail}.`,
    plans: [],
    tableIds: [],
    pricesNote: 'Ask the sales team for details of the hotel.',
    href: '/about',
    hrefLabel: 'About the project',
    shape: 'hotel',
  },
  {
    id: 'third-floor',
    name: 'Third floor',
    meta: height('Third floor'),
    summary: `${fact('Third floor').detail}.`,
    plans: [plan('aureum-food-court-floor-plan-2026-v2.webp')],
    tableIds: ['food-court'],
    href: '/food-court',
    hrefLabel: 'Explore the food court',
    shape: 'podium',
  },
  {
    id: 'second-floor',
    name: 'Second floor',
    meta: height('Second floor'),
    summary: `${fact('Second floor').detail}.`,
    plans: [plan('aureum-second-floor-plan-2026-v2.webp')],
    tableIds: ['second-floor-shops'],
    href: '/commercial-shops',
    hrefLabel: 'Explore the shops',
    shape: 'podium',
  },
  {
    id: 'first-floor',
    name: 'First floor',
    meta: height('First floor'),
    summary: `${fact('First floor').detail}.`,
    plans: [plan('aureum-first-floor-plan-v2.webp')],
    tableIds: ['first-floor-shops'],
    href: '/commercial-shops/first-floor',
    hrefLabel: 'Explore first-floor shops',
    shape: 'podium',
  },
  {
    id: 'ground-floor',
    name: 'Ground floor',
    meta: height('Ground floor'),
    summary: `${fact('Ground floor').detail}.`,
    plans: [plan('aureum-ground-floor-plan-2026-v2.webp')],
    tableIds: [],
    pricesNote: 'Ground-floor prices on request.',
    href: '/commercial-shops/ground-floor',
    hrefLabel: 'Explore the ground floor',
    shape: 'podium',
  },
  {
    id: 'basements',
    name: 'Basements',
    meta: 'Two levels',
    summary: `${fact('Basements').detail}.`,
    plans: [plan('aureum-basement-1-plan-2026-v2.webp'), plan('aureum-basement-2-plan-2026-v2.webp')],
    tableIds: [],
    href: '/floor-plans',
    hrefLabel: 'All floor plans',
    shape: 'basement',
  },
];
