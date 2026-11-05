import type { PropertyCategory } from '@/lib/property-data';

export type PaymentStage = {
  label: string;
  timing: string;
  percentage?: number;
  amount?: number;
  note?: string;
};

export type PaymentPlan = {
  id: string;
  title: string;
  category: PropertyCategory;
  effectiveFrom: string;
  currency: string;
  totalAmount?: number;
  stages: PaymentStage[];
  approved: boolean;
  sourceLabel?: string;
};

// Keep this empty until management and finance supply the approved register.
// The payment UI is designed to render these values as HTML when they arrive.
export const APPROVED_PAYMENT_PLANS: PaymentPlan[] = [];

export type SourcePaymentRow = {
  type: string;
  sizeSqFt: number;
  unitCategory?: 'Inner' | 'Outer';
  /** Premium homes (the Signature Glass Apartments), sold as a category of their own. */
  premium?: boolean;
  ratePerSqFt: number;
  totalPrice: number;
  booking: number;
  confirmation: number;
  monthlyInstallment: number;
  halfYearly?: number;
  completion: number;
};

export type SourcePaymentTable = {
  id: string;
  title: string;
  category: PropertyCategory;
  rateLabel: string;
  installmentLabel: string;
  possessionLabel: string;
  /** Number of 1% monthly instalments in the plan (55 for residences and offices, 42 for shops). */
  monthlyCount: number;
  note?: string;
  rows: readonly SourcePaymentRow[];
};

export const PAYMENT_SOURCE_LABEL = 'Aureum brochures and project factsheet, November 2026';

type UnitOptions = {
  unitCategory?: SourcePaymentRow['unitCategory'];
  premium?: boolean;
  withHalfYearly?: boolean;
};

/**
 * Builds a row from size × rate using the catalogue's plan: 10% booking, 15% confirmation, 1% monthly,
 * 20% completion and, for shops and food court units, 13% across 6 half-yearly instalments.
 */
function unit(type: string, sizeSqFt: number, ratePerSqFt: number, options: UnitOptions = {}): SourcePaymentRow {
  const totalPrice = sizeSqFt * ratePerSqFt;
  const share = (percent: number) => Math.round((totalPrice * percent) / 100);
  return {
    type,
    sizeSqFt,
    unitCategory: options.unitCategory,
    premium: options.premium,
    ratePerSqFt,
    totalPrice,
    booking: share(10),
    confirmation: share(15),
    monthlyInstallment: share(1),
    halfYearly: options.withHalfYearly ? Math.round((totalPrice * 0.13) / 6) : undefined,
    completion: share(20),
  };
}

// Transcribed from the updated November 2026 Aureum Catalogue (the official price list). The residences
// follow its seven listed units: the 1,316 sq ft two-bedroom includes a servant quarter, and the Signature
// Glass Apartments are the premium category. The Commercial & Food Court brochure and factsheet set
// first-floor shops at PKR 50,000/sq ft. Base prices exclude 10% category charges.
export const SOURCE_PAYMENT_TABLES: readonly SourcePaymentTable[] = [
  {
    id: 'apartments',
    title: 'Apartments',
    category: 'apartment',
    rateLabel: 'Rate PKR 20,500 to 23,000 / sq ft',
    installmentLabel: '4.5-year plan · 55 monthly installments',
    possessionLabel: 'Indicative possession 3.5 years',
    monthlyCount: 55,
    note: 'Inner and outer categories as per the official price list; Signature Glass Apartments are the premium category.',
    rows: [
      unit('Studio', 426, 20500, { unitCategory: 'Inner' }),
      unit('1 Bedroom', 622, 21500, { unitCategory: 'Outer' }),
      unit('1 Bedroom', 658, 21500, { unitCategory: 'Outer' }),
      unit('2 Bedrooms', 1103, 21500, { unitCategory: 'Outer' }),
      unit('2 Bedrooms + Servant Quarter', 1316, 21500, { unitCategory: 'Outer' }),
      unit('Signature Glass', 1491, 23000, { unitCategory: 'Outer', premium: true }),
      unit('Signature Glass', 1727, 23000, { unitCategory: 'Outer', premium: true }),
    ],
  },
  {
    id: 'offices',
    title: 'Corporate Offices',
    category: 'corporate_office',
    rateLabel: 'Rate PKR 25,000 / sq ft',
    installmentLabel: '4.5-year plan · 55 monthly installments',
    possessionLabel: 'Indicative possession 3.5 years',
    monthlyCount: 55,
    note: 'Every office includes a lifetime amenities membership.',
    rows: [
      unit('Office', 1007, 25000),
      unit('Office', 1009, 25000),
      unit('Office', 1295, 25000),
      unit('Office', 2595, 25000),
    ],
  },
  {
    id: 'first-floor-shops',
    title: 'Shops · First Floor',
    category: 'commercial_shop',
    rateLabel: 'Rate PKR 50,000 / sq ft',
    installmentLabel: '3.5-year plan · 42 monthly + half-yearly installments',
    possessionLabel: 'Indicative possession 2.5 years',
    monthlyCount: 42,
    note: 'First-floor shops range from 172 to 707 sq ft. Ground-floor prices on request.',
    rows: [
      unit('Shop', 172, 50000, { withHalfYearly: true }),
      unit('Shop', 366, 50000, { withHalfYearly: true }),
      unit('Shop', 571, 50000, { withHalfYearly: true }),
      unit('Shop', 707, 50000, { withHalfYearly: true }),
    ],
  },
  {
    id: 'second-floor-shops',
    title: 'Shops · Second Floor',
    category: 'commercial_shop',
    rateLabel: 'Rate PKR 42,500 / sq ft',
    installmentLabel: '3.5-year plan · 42 monthly + half-yearly installments',
    possessionLabel: 'Indicative possession 2.5 years',
    monthlyCount: 42,
    note: 'Second-floor shops range from 478 to 643 sq ft.',
    rows: [
      unit('Shop', 478, 42500, { withHalfYearly: true }),
      unit('Shop', 502, 42500, { withHalfYearly: true }),
      unit('Shop', 608, 42500, { withHalfYearly: true }),
      unit('Shop', 643, 42500, { withHalfYearly: true }),
    ],
  },
  {
    id: 'food-court',
    title: 'Food Court · Third Floor',
    category: 'commercial_shop',
    rateLabel: 'Rate PKR 75,000 / sq ft',
    installmentLabel: '3.5-year plan · 42 monthly + half-yearly installments',
    possessionLabel: 'Indicative possession 2.5 years',
    monthlyCount: 42,
    note: 'Food court units of around 301 sq ft beside the playland and trampoline park.',
    rows: [unit('Food court unit', 301, 75000, { withHalfYearly: true })],
  },
];

export const PAYMENT_CATEGORIES = [
  { value: 'all', label: 'All units' },
  { value: 'apartment', label: 'Apartments' },
  { value: 'commercial_shop', label: 'Commercial shops' },
  { value: 'corporate_office', label: 'Corporate offices' },
] as const;

export const PAYMENT_TERMS = [
  `Values are starting base prices from the ${PAYMENT_SOURCE_LABEL}. All amounts in PKR.`,
  'Applicable 10% category charges are additional. Monthly amounts are 1% of the base price.',
  'Possession timing is indicative; commencement and handover are subject to developer confirmation.',
  'Prices, payment plans and availability are subject to final confirmation; the dated installment schedule forms part of the booking terms.',
  'No fixed rental return or capital appreciation is guaranteed.',
] as const;
