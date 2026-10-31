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
  note?: string;
  rows: readonly SourcePaymentRow[];
};

export const PAYMENT_SOURCE_LABEL = 'Aureum Master Catalogue, October 2026';

/**
 * Builds a row from size × rate using the catalogue's plan: 10% booking, 15% confirmation, 1% monthly,
 * 20% completion and, for shops and food court units, 13% across 6 half-yearly instalments.
 */
function unit(type: string, sizeSqFt: number, ratePerSqFt: number, withHalfYearly = false): SourcePaymentRow {
  const totalPrice = sizeSqFt * ratePerSqFt;
  const share = (percent: number) => Math.round((totalPrice * percent) / 100);
  return {
    type,
    sizeSqFt,
    ratePerSqFt,
    totalPrice,
    booking: share(10),
    confirmation: share(15),
    monthlyInstallment: share(1),
    halfYearly: withHalfYearly ? Math.round((totalPrice * 0.13) / 6) : undefined,
    completion: share(20),
  };
}

// Transcribed from the Aureum Master Catalogue (pricing pages 24–25) and the matching residential,
// offices and commercial brochures, October 2026. Base prices only; 10% category charges are extra.
export const SOURCE_PAYMENT_TABLES: readonly SourcePaymentTable[] = [
  {
    id: 'apartments',
    title: 'Apartments',
    category: 'apartment',
    rateLabel: 'Rate 19,500 to 20,500 / Sq.ft.',
    installmentLabel: '4.5-year plan · 55 monthly installments',
    possessionLabel: 'Indicative possession 3.5 years',
    note: 'Premium Glass Collection residences (1,491 and 1,727 sq ft) are quoted individually.',
    rows: [
      unit('Studio', 426, 19500),
      unit('1 Bedroom', 622, 20500),
      unit('1 Bedroom', 658, 20500),
      unit('2 Bedrooms', 1103, 20500),
      unit('2 Bedrooms', 1316, 20500),
    ],
  },
  {
    id: 'offices',
    title: 'Corporate Offices',
    category: 'corporate_office',
    rateLabel: 'Rate 23,500 / Sq.ft.',
    installmentLabel: '4.5-year plan · 55 monthly installments',
    possessionLabel: 'Indicative possession 3.5 years',
    note: 'Every office includes a lifetime amenities membership.',
    rows: [
      unit('Office', 1007, 23500),
      unit('Office', 1009, 23500),
      unit('Office', 1295, 23500),
      unit('Office', 2595, 23500),
    ],
  },
  {
    id: 'first-floor-shops',
    title: 'Shops · First Floor',
    category: 'commercial_shop',
    rateLabel: 'Rate 45,000 / Sq.ft.',
    installmentLabel: '3.5-year plan · 42 monthly + half-yearly installments',
    possessionLabel: 'Indicative possession 2.5 years',
    note: 'First-floor shops range from 172 to 707 sq ft. Ground-floor prices on request.',
    rows: [
      unit('Shop', 172, 45000, true),
      unit('Shop', 366, 45000, true),
      unit('Shop', 571, 45000, true),
      unit('Shop', 707, 45000, true),
    ],
  },
  {
    id: 'second-floor-shops',
    title: 'Shops · Second Floor',
    category: 'commercial_shop',
    rateLabel: 'Rate 40,000 / Sq.ft.',
    installmentLabel: '3.5-year plan · 42 monthly + half-yearly installments',
    possessionLabel: 'Indicative possession 2.5 years',
    note: 'Second-floor shops range from 478 to 643 sq ft.',
    rows: [
      unit('Shop', 478, 40000, true),
      unit('Shop', 608, 40000, true),
      unit('Shop', 643, 40000, true),
    ],
  },
  {
    id: 'food-court',
    title: 'Food Court · Third Floor',
    category: 'commercial_shop',
    rateLabel: 'Rate 70,000 / Sq.ft.',
    installmentLabel: '3.5-year plan · 42 monthly + half-yearly installments',
    possessionLabel: 'Indicative possession 2.5 years',
    note: 'Food court units of around 301 sq ft beside the playland and trampoline park.',
    rows: [unit('Food court unit', 301, 70000, true)],
  },
];

export const PAYMENT_CATEGORIES = [
  { value: 'all', label: 'All pathways' },
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
