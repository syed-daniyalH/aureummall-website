export type PropertyCategory = 'apartment' | 'commercial_shop' | 'corporate_office';
export type UnitAvailability = 'available' | 'reserved' | 'unavailable' | 'contact';

export interface UnitPlan {
  id: string;
  category: PropertyCategory;
  unitType: string;
  floor?: string;
  bedrooms?: number;
  purpose?: 'live' | 'invest' | 'work';
  sizeSqFt: number;
  orientation?: 'inner' | 'outer';
  ratePerSqFt?: number;
  totalPrice?: number;
  bookingPercent?: number;
  confirmationPercent?: number;
  installmentCount?: number;
  installmentAmount?: number;
  halfYearlyInstallmentCount?: number;
  halfYearlyInstallmentAmount?: number;
  completionPercent?: number;
  effectiveFrom?: string;
  sourceLabel?: string;
  availability?: UnitAvailability;
  active: boolean;
  approved: boolean;
}

type UnitSeed = {
  id: string;
  category: PropertyCategory;
  unitType: string;
  floor: string;
  sizeSqFt: number;
  ratePerSqFt: number;
  monthlyCount: 42 | 55;
  bedrooms?: number;
  orientation?: 'inner' | 'outer';
  withHalfYearly?: boolean;
};

const SOURCE_LABEL = 'Aureum Catalogue, category brochures and project factsheet, November 2026';

function pricedUnit(seed: UnitSeed): UnitPlan {
  const totalPrice = seed.sizeSqFt * seed.ratePerSqFt;
  const percent = (value: number) => Math.round((totalPrice * value) / 100);

  return {
    id: seed.id,
    category: seed.category,
    unitType: seed.unitType,
    floor: seed.floor,
    bedrooms: seed.bedrooms,
    sizeSqFt: seed.sizeSqFt,
    orientation: seed.orientation,
    ratePerSqFt: seed.ratePerSqFt,
    totalPrice,
    bookingPercent: 10,
    confirmationPercent: 15,
    installmentCount: seed.monthlyCount,
    installmentAmount: percent(1),
    halfYearlyInstallmentCount: seed.withHalfYearly ? 6 : undefined,
    halfYearlyInstallmentAmount: seed.withHalfYearly ? Math.round((totalPrice * 0.13) / 6) : undefined,
    completionPercent: 20,
    effectiveFrom: '2026-11-02',
    sourceLabel: SOURCE_LABEL,
    availability: 'contact',
    active: true,
    approved: true,
  };
}

/**
 * Approved published unit examples. Category-specific brochures take precedence over condensed catalogue rows.
 * Availability is intentionally "contact": these documents publish price examples, not live inventory status.
 */
export const UNIT_PLANS: UnitPlan[] = [
  pricedUnit({ id: 'apartment-studio-426-inner', category: 'apartment', unitType: 'Studio', floor: '6th-12th floors', bedrooms: 0, sizeSqFt: 426, orientation: 'inner', ratePerSqFt: 20500, monthlyCount: 55 }),
  pricedUnit({ id: 'apartment-1-bed-622-outer', category: 'apartment', unitType: '1 Bedroom', floor: '6th-12th floors', bedrooms: 1, sizeSqFt: 622, orientation: 'outer', ratePerSqFt: 21500, monthlyCount: 55 }),
  pricedUnit({ id: 'apartment-1-bed-658-outer', category: 'apartment', unitType: '1 Bedroom', floor: '6th-12th floors', bedrooms: 1, sizeSqFt: 658, orientation: 'outer', ratePerSqFt: 21500, monthlyCount: 55 }),
  pricedUnit({ id: 'apartment-2-bed-1103-outer', category: 'apartment', unitType: '2 Bedrooms', floor: '6th-12th floors', bedrooms: 2, sizeSqFt: 1103, orientation: 'outer', ratePerSqFt: 21500, monthlyCount: 55 }),
  pricedUnit({ id: 'apartment-2-bed-servant-1316-outer', category: 'apartment', unitType: '2 Bedrooms + Servant Quarter', floor: '6th-12th floors', bedrooms: 2, sizeSqFt: 1316, orientation: 'outer', ratePerSqFt: 21500, monthlyCount: 55 }),
  pricedUnit({ id: 'apartment-signature-glass-1491', category: 'apartment', unitType: 'Signature Glass Apartment', floor: '6th-12th floors', sizeSqFt: 1491, orientation: 'outer', ratePerSqFt: 23000, monthlyCount: 55 }),
  pricedUnit({ id: 'apartment-signature-glass-1727', category: 'apartment', unitType: 'Signature Glass Apartment', floor: '6th-12th floors', sizeSqFt: 1727, orientation: 'outer', ratePerSqFt: 23000, monthlyCount: 55 }),
  pricedUnit({ id: 'office-1007', category: 'corporate_office', unitType: 'Corporate Office', floor: '6th-12th floors', sizeSqFt: 1007, ratePerSqFt: 25000, monthlyCount: 55 }),
  pricedUnit({ id: 'office-1009', category: 'corporate_office', unitType: 'Corporate Office', floor: '6th-12th floors', sizeSqFt: 1009, ratePerSqFt: 25000, monthlyCount: 55 }),
  pricedUnit({ id: 'office-1295', category: 'corporate_office', unitType: 'Corporate Office', floor: '6th-12th floors', sizeSqFt: 1295, ratePerSqFt: 25000, monthlyCount: 55 }),
  pricedUnit({ id: 'office-2595', category: 'corporate_office', unitType: 'Corporate Office', floor: '6th-12th floors', sizeSqFt: 2595, ratePerSqFt: 25000, monthlyCount: 55 }),
  ...[172, 366, 571, 707].map((sizeSqFt) => pricedUnit({ id: `shop-first-floor-${sizeSqFt}`, category: 'commercial_shop', unitType: 'Shop', floor: 'First floor', sizeSqFt, ratePerSqFt: 50000, monthlyCount: 42, withHalfYearly: true })),
  ...[478, 502, 608, 643].map((sizeSqFt) => pricedUnit({ id: `shop-second-floor-${sizeSqFt}`, category: 'commercial_shop', unitType: 'Shop', floor: 'Second floor', sizeSqFt, ratePerSqFt: 42500, monthlyCount: 42, withHalfYearly: true })),
  pricedUnit({ id: 'food-court-third-floor-301', category: 'commercial_shop', unitType: 'Food Court Unit', floor: 'Third floor', sizeSqFt: 301, ratePerSqFt: 75000, monthlyCount: 42, withHalfYearly: true }),
];
