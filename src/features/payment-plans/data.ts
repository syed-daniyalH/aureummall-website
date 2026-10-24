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
  rows: readonly SourcePaymentRow[];
};

// Transcribed from the captured Aureum Project Profile PDF, Payment Plan 2026,
// page 29. The PDF is the primary text source; image artwork is retained as
// supplemental media and is not silently merged when values conflict.
export const SOURCE_PAYMENT_TABLES: readonly SourcePaymentTable[] = [
  {
    id: 'offices',
    title: 'Offices',
    category: 'corporate_office',
    rateLabel: 'Rate 23,500 / Sq.ft.',
    installmentLabel: '55 monthly installments',
    rows: [
      { type: 'Office', sizeSqFt: 620, ratePerSqFt: 23500, totalPrice: 14570000, booking: 1457000, confirmation: 2185500, monthlyInstallment: 145700, completion: 2914000 },
      { type: 'Office', sizeSqFt: 856, ratePerSqFt: 23500, totalPrice: 20116000, booking: 2011600, confirmation: 3017400, monthlyInstallment: 201160, completion: 4023200 },
      { type: 'Office', sizeSqFt: 1100, ratePerSqFt: 23500, totalPrice: 25850000, booking: 2585000, confirmation: 3877500, monthlyInstallment: 258500, completion: 5170000 },
    ],
  },
  {
    id: 'commercial-shops',
    title: 'Commercial Shops',
    category: 'commercial_shop',
    rateLabel: 'Rate 40,000 / Sq.ft.',
    installmentLabel: '42 monthly installments with half-yearly payments',
    rows: [
      { type: 'Shop', sizeSqFt: 478, ratePerSqFt: 40000, totalPrice: 19120000, booking: 1912000, confirmation: 2868000, monthlyInstallment: 191200, halfYearly: 414267, completion: 3824000 },
      { type: 'Shop', sizeSqFt: 608, ratePerSqFt: 40000, totalPrice: 24320000, booking: 2432000, confirmation: 3648000, monthlyInstallment: 243200, halfYearly: 526934, completion: 4864000 },
      { type: 'Shop', sizeSqFt: 643, ratePerSqFt: 40000, totalPrice: 25720000, booking: 2572000, confirmation: 3858000, monthlyInstallment: 257200, halfYearly: 557267, completion: 5144000 },
    ],
  },
  {
    id: 'apartments',
    title: 'Apartments',
    category: 'apartment',
    rateLabel: 'Rate 19,500 to 20,500 / Sq.ft.',
    installmentLabel: '55 monthly installments',
    rows: [
      { type: 'Studio (Inner)', sizeSqFt: 426, ratePerSqFt: 19500, totalPrice: 8307000, booking: 830700, confirmation: 1246050, monthlyInstallment: 83070, completion: 1661400 },
      { type: '1 Bed (Outer)', sizeSqFt: 658, ratePerSqFt: 20500, totalPrice: 13489000, booking: 1348900, confirmation: 2023350, monthlyInstallment: 134890, completion: 2697800 },
      { type: '2 Bed (Outer)', sizeSqFt: 1103, ratePerSqFt: 20500, totalPrice: 22611500, booking: 2261150, confirmation: 3391725, monthlyInstallment: 226115, completion: 4522300 },
      { type: '2 Bed (Outer)', sizeSqFt: 1316, ratePerSqFt: 20500, totalPrice: 26978000, booking: 2697800, confirmation: 4046700, monthlyInstallment: 269780, completion: 5395600 },
    ],
  },
  {
    id: 'first-floor-shops',
    title: '1st Floor Shops',
    category: 'commercial_shop',
    rateLabel: 'Rate 45,000 / Sq.ft.',
    installmentLabel: '42 monthly installments with half-yearly payments',
    rows: [
      { type: 'Shop', sizeSqFt: 172, ratePerSqFt: 45000, totalPrice: 7740000, booking: 774000, confirmation: 1161000, monthlyInstallment: 77400, halfYearly: 167700, completion: 1548000 },
      { type: 'Shop', sizeSqFt: 366, ratePerSqFt: 45000, totalPrice: 16470000, booking: 1647000, confirmation: 2470500, monthlyInstallment: 164700, halfYearly: 356850, completion: 3294000 },
      { type: 'Shop', sizeSqFt: 571, ratePerSqFt: 45000, totalPrice: 25695000, booking: 2569500, confirmation: 3854250, monthlyInstallment: 256950, halfYearly: 556725, completion: 5139000 },
      { type: 'Shop', sizeSqFt: 707, ratePerSqFt: 45000, totalPrice: 31815000, booking: 3181500, confirmation: 4772250, monthlyInstallment: 318150, halfYearly: 689325, completion: 6363000 },
    ],
  },
];

export const PAYMENT_CATEGORIES = [
  { value: 'all', label: 'All pathways' },
  { value: 'apartment', label: 'Apartments' },
  { value: 'commercial_shop', label: 'Commercial shops' },
  { value: 'corporate_office', label: 'Corporate offices' },
] as const;

export const PAYMENT_TERMS = [
  'These payment-plan values are taken from the Aureum Project Profile PDF, Payment Plan 2026, page 29.',
  'Review the schedule here and download the project profile for reference.',
  'Prices are subject to change without prior notice. Development charges, taxes and government levies, if applicable, are borne by the purchaser.',
  'Contact the Aureum team to confirm current availability, pricing and terms before making a decision.',
] as const;
