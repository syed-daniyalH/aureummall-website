import type { PropertyCategory } from '@/lib/property-data';

export type BuildingLayer = {
  id: string;
  label: string;
  category: PropertyCategory;
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  unitHref: string;
  planHref: string;
};

export const BUILDING_LAYERS: BuildingLayer[] = [
  {
    id: 'retail',
    label: 'Retail',
    category: 'commercial_shop',
    eyebrow: 'Ground / retail pathway',
    title: 'A visible place for the next customer to find you.',
    description: 'Explore the commercial pathway with retail, food courts and everyday customer access.',
    detail: 'Ground-floor retail is designed for visibility, footfall and an exceptional shopping experience.',
    unitHref: '/commercial-shops',
    planHref: '/payment-plans?category=commercial_shop',
  },
  {
    id: 'office',
    label: 'Office',
    category: 'corporate_office',
    eyebrow: 'Work / office pathway',
    title: 'A professional address with presence.',
    description: "Keep business buyers close to the office path alongside Aureum's residential and retail layers.",
    detail: 'Corporate offices provide a professional address with access to the wider destination.',
    unitHref: '/corporate-offices',
    planHref: '/payment-plans?category=corporate_office',
  },
  {
    id: 'residential',
    label: 'Residential',
    category: 'apartment',
    eyebrow: 'Live / residences pathway',
    title: 'A vertical home experience for the everyday.',
    description: 'Move from the building layer to the residential pathway for peaceful living and everyday convenience.',
    detail: 'Aureum offers 1 & 2 bed apartments within a connected mixed-use destination.',
    unitHref: '/apartments',
    planHref: '/payment-plans?category=apartment',
  },
] as const;
