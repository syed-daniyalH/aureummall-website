import { SOURCE_PAYMENT_TABLES, type SourcePaymentRow, type SourcePaymentTable } from './data';

export type PricedUnit = {
  /** Stable id such as "apartments-0", used in #calc- links from the building explorer. */
  id: string;
  table: SourcePaymentTable;
  row: SourcePaymentRow;
};

export const PRICED_UNITS: readonly PricedUnit[] = SOURCE_PAYMENT_TABLES.flatMap((table) =>
  table.rows.map((row, index) => ({ id: `${table.id}-${index}`, table, row })),
);

export const CALC_HASH_PREFIX = '#calc-';

export function calcHref(unitId: string) {
  return `${CALC_HASH_PREFIX}${unitId}`;
}

export function unitsForTables(tableIds: readonly string[]) {
  return PRICED_UNITS.filter((unit) => tableIds.includes(unit.table.id));
}

export function startingPrice(tableIds: readonly string[]) {
  const prices = unitsForTables(tableIds).map((unit) => unit.row.totalPrice);
  return prices.length ? Math.min(...prices) : undefined;
}

export function formatPKR(value: number) {
  return `PKR ${new Intl.NumberFormat('en-PK').format(value)}`;
}

export function formatSqFt(value: number) {
  return `${new Intl.NumberFormat('en-PK').format(value)} sq ft`;
}

/** The way buyers in Pakistan say large amounts: 83.1 lakh, 2.26 crore. */
export function formatLakhCrore(value: number) {
  if (value >= 10_000_000) return `${(value / 10_000_000).toFixed(2)} crore`;
  return `${(value / 100_000).toFixed(1)} lakh`;
}

const APARTMENT_NOUNS: Record<string, string> = {
  Studio: 'studio apartment',
  '1 Bedroom': 'one-bedroom apartment',
  '2 Bedrooms': 'two-bedroom apartment',
  '2 Bedrooms + Servant Quarter': 'two-bedroom apartment with servant quarter',
  'Signature Glass': 'premium Signature Glass Apartment',
};

/** Plain-language description of a unit, for headings and the pre-filled WhatsApp message. */
export function describeUnit({ table, row }: PricedUnit) {
  const noun = APARTMENT_NOUNS[row.type] ?? row.type.toLowerCase();
  const unitCategory = row.unitCategory ? `${row.unitCategory.toLowerCase()} category; ` : '';
  return `${formatSqFt(row.sizeSqFt)} ${noun} (${unitCategory}${table.title})`;
}
