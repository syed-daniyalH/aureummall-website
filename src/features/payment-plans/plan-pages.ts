import { SOURCE_PAYMENT_TABLES, type SourcePaymentTable } from './data';

/** Every source payment table gets its own page at /payment-plans/<table id>, linked from the header menu. */
export type PaymentPlanPage = {
  table: SourcePaymentTable;
  href: string;
  /** Short name for menus and tabs. */
  label: string;
  group: 'Residences & offices' | 'Mall & dining';
  summary: string;
  startingFrom: number;
  sizeRange: string;
  /** The stage summary shown above the table. */
  stages: readonly (readonly [value: string, label: string])[];
};

const RESIDENCE_STAGES = [['4.5 yrs', 'Payment plan'], ['3.5 yrs', 'Possession*'], ['10%', 'Booking'], ['15%', 'Confirmation'], ['55%', '55 monthly × 1%'], ['20%', 'Completion']] as const;
const SHOP_STAGES = [['3.5 yrs', 'Payment plan'], ['2.5 yrs', 'Possession*'], ['10%', 'Booking'], ['15%', 'Confirmation'], ['42%', '42 monthly × 1%'], ['13%', 'Half-yearly'], ['20%', 'Completion']] as const;

const PLAN_COPY: Record<string, Pick<PaymentPlanPage, 'label' | 'group' | 'summary'>> = {
  apartments: { label: 'Apartments', group: 'Residences & offices', summary: 'Studios, one and two-bedroom apartments and Signature Glass Apartments on a 4.5-year plan.' },
  offices: { label: 'Corporate Offices', group: 'Residences & offices', summary: 'Full-glass Ring Road offices with a lifetime amenities membership, on a 4.5-year plan.' },
  'first-floor-shops': { label: 'Shops · First Floor', group: 'Mall & dining', summary: 'First-floor retail around the central atrium, on a 3.5-year plan with half-yearly instalments.' },
  'second-floor-shops': { label: 'Shops · Second Floor', group: 'Mall & dining', summary: 'Second-floor shops above the atrium, on a 3.5-year plan with half-yearly instalments.' },
  'food-court': { label: 'Food Court · Third Floor', group: 'Mall & dining', summary: 'Food court units beside the playland and trampoline park, on a 3.5-year plan.' },
};

function formatSize(value: number) {
  return value.toLocaleString('en-PK');
}

export const PAYMENT_PLAN_PAGES: readonly PaymentPlanPage[] = SOURCE_PAYMENT_TABLES.map((table) => {
  const sizes = table.rows.map((row) => row.sizeSqFt);
  const min = Math.min(...sizes);
  const max = Math.max(...sizes);
  const copy = PLAN_COPY[table.id] ?? { label: table.title, group: 'Mall & dining', summary: table.installmentLabel };
  return {
    table,
    href: `/payment-plans/${table.id}`,
    ...copy,
    startingFrom: Math.min(...table.rows.map((row) => row.totalPrice)),
    sizeRange: min === max ? `${formatSize(min)} sq ft` : `${formatSize(min)} to ${formatSize(max)} sq ft`,
    stages: table.monthlyCount === 55 ? RESIDENCE_STAGES : SHOP_STAGES,
  };
});

export function getPaymentPlanPage(id: string) {
  return PAYMENT_PLAN_PAGES.find((page) => page.table.id === id);
}

export function formatPKR(value: number) {
  return `PKR ${new Intl.NumberFormat('en-PK').format(value)}`;
}

/** "PKR 8.73M" style figure for menus, where the full amount is too long. */
export function formatPKRShort(value: number) {
  return `PKR ${(value / 1_000_000).toLocaleString('en-PK', { maximumFractionDigits: 2 })}M`;
}
