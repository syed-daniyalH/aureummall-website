import type { PropertyCategory } from '@/lib/property-data';

export type FinderCategory = PropertyCategory | 'all';
export type FinderBudget = 'any' | 'under-10m' | '10m-25m' | '25m-plus';
export type FinderBedrooms = 'any' | 'studio' | '1' | '2' | '3-plus';
export type FinderPurpose = 'any' | 'live' | 'invest' | 'work';

export type FinderFilters = {
  category: FinderCategory;
  unitType: string;
  floor: string;
  bedrooms: FinderBedrooms;
  budget: FinderBudget;
  purpose: FinderPurpose;
};

export type FinderResultState = 'loading' | 'empty' | 'unavailable' | 'reserved' | 'available' | 'contact' | 'error';

export const DEFAULT_FINDER_FILTERS: FinderFilters = {
  category: 'all',
  unitType: 'any',
  floor: 'any',
  bedrooms: 'any',
  budget: 'any',
  purpose: 'any',
};

export const FINDER_OPTIONS = {
  category: [
    { value: 'all', label: 'All pathways' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'commercial_shop', label: 'Commercial shops' },
    { value: 'corporate_office', label: 'Corporate offices' },
  ],
  unitType: [
    { value: 'any', label: 'Any unit type' },
    { value: 'studio', label: 'Studio' },
    { value: '1-bed', label: '1-Bed' },
    { value: '2-bed', label: '2-Bed' },
    { value: 'shop', label: 'Shop' },
    { value: 'office', label: 'Office' },
  ],
  floor: [
    { value: 'any', label: 'Any floor' },
    { value: 'ground', label: 'Ground / retail' },
    { value: 'lower', label: 'Lower floors' },
    { value: 'upper', label: 'Upper floors' },
  ],
  bedrooms: [
    { value: 'any', label: 'Any bedroom count' },
    { value: 'studio', label: 'Studio' },
    { value: '1', label: '1 bedroom' },
    { value: '2', label: '2 bedrooms' },
    { value: '3-plus', label: '3+ bedrooms' },
  ],
  budget: [
    { value: 'any', label: 'Any budget' },
    { value: 'under-10m', label: 'Under approved threshold' },
    { value: '10m-25m', label: 'Mid approved threshold' },
    { value: '25m-plus', label: 'Upper approved threshold' },
  ],
  purpose: [
    { value: 'any', label: 'Any purpose' },
    { value: 'live', label: 'Live' },
    { value: 'invest', label: 'Invest' },
    { value: 'work', label: 'Work' },
  ],
} as const;

export const FINDER_FILTER_LABELS: Record<keyof FinderFilters, string> = {
  category: 'Pathway',
  unitType: 'Unit type',
  floor: 'Floor',
  bedrooms: 'Bedrooms',
  budget: 'Budget',
  purpose: 'Purpose',
};
