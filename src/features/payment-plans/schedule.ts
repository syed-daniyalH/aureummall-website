import type { SourcePaymentRow, SourcePaymentTable } from './data';

/** The applicable category charges (corner, facing and similar units) published as an extra 10%. */
export const CATEGORY_CHARGE_PERCENT = 10;

export type StageKey = 'booking' | 'confirmation' | 'monthly' | 'halfYearly' | 'completion';

export type PlanStage = {
  key: StageKey;
  label: string;
  percent: number;
  /** How many payments the stage is split into. */
  count: number;
  /** Amount of each payment in the stage. */
  each: number;
  total: number;
};

export type SchedulePayment = { stage: StageKey; label: string; amount: number };

export type ScheduleMonth = {
  /** Months after booking; booking is month 0. */
  month: number;
  payments: SchedulePayment[];
  amount: number;
  paidToDate: number;
  balance: number;
};

export type PaymentSchedule = {
  basePrice: number;
  charges: number;
  total: number;
  stages: PlanStage[];
  months: ScheduleMonth[];
  possessionMonth: number;
  lastMonth: number;
};

/** Booking month as a calendar month, "2026-12". */
export type MonthKey = `${number}-${string}`;

const HALF_YEARLY_PERCENT = 13;
const HALF_YEARLY_COUNT = 6;

/** Indicative possession: 3.5 years for residences and offices (55-month plan), 2.5 years for shops. */
function possessionMonthFor(table: SourcePaymentTable) {
  return table.monthlyCount === 55 ? 42 : 30;
}

/**
 * Builds the full payment plan for one unit: booking now, confirmation and the first monthly instalment a
 * month later, then one instalment every month, half-yearly instalments for shops every sixth month and
 * the 20% completion payment at indicative possession. Every amount is rounded to the rupee and the
 * completion payment absorbs the rounding, so the schedule always adds up to the exact total.
 */
export function buildSchedule(table: SourcePaymentTable, row: SourcePaymentRow, withCharges: boolean): PaymentSchedule {
  const basePrice = row.totalPrice;
  const charges = withCharges ? Math.round((basePrice * CATEGORY_CHARGE_PERCENT) / 100) : 0;
  const total = basePrice + charges;
  const share = (percent: number) => Math.round((total * percent) / 100);
  const hasHalfYearly = row.halfYearly !== undefined;
  const monthlyCount = table.monthlyCount;

  const booking = share(10);
  const confirmation = share(15);
  const monthly = share(1);
  const halfYearly = hasHalfYearly ? Math.round((total * HALF_YEARLY_PERCENT) / 100 / HALF_YEARLY_COUNT) : 0;
  const completion = total - booking - confirmation - monthly * monthlyCount - halfYearly * (hasHalfYearly ? HALF_YEARLY_COUNT : 0);

  const stages: PlanStage[] = [
    { key: 'booking', label: 'Booking', percent: 10, count: 1, each: booking, total: booking },
    { key: 'confirmation', label: 'Confirmation', percent: 15, count: 1, each: confirmation, total: confirmation },
    { key: 'monthly', label: 'Monthly', percent: monthlyCount, count: monthlyCount, each: monthly, total: monthly * monthlyCount },
    ...(hasHalfYearly ? [{ key: 'halfYearly' as const, label: 'Half-yearly', percent: HALF_YEARLY_PERCENT, count: HALF_YEARLY_COUNT, each: halfYearly, total: halfYearly * HALF_YEARLY_COUNT }] : []),
    { key: 'completion', label: 'Completion', percent: 20, count: 1, each: completion, total: completion },
  ];

  const possessionMonth = possessionMonthFor(table);
  const byMonth = new Map<number, SchedulePayment[]>();
  const add = (month: number, payment: SchedulePayment) => byMonth.set(month, [...(byMonth.get(month) ?? []), payment]);

  add(0, { stage: 'booking', label: 'Booking (10%)', amount: booking });
  add(1, { stage: 'confirmation', label: 'Confirmation (15%)', amount: confirmation });
  for (let index = 1; index <= monthlyCount; index += 1) add(index, { stage: 'monthly', label: `Monthly ${index} of ${monthlyCount}`, amount: monthly });
  if (hasHalfYearly) {
    for (let index = 1; index <= HALF_YEARLY_COUNT; index += 1) add(index * 6, { stage: 'halfYearly', label: `Half-yearly ${index} of ${HALF_YEARLY_COUNT}`, amount: halfYearly });
  }
  add(possessionMonth, { stage: 'completion', label: 'Completion on possession (20%)', amount: completion });

  let paidToDate = 0;
  const months = [...byMonth.entries()]
    .sort(([a], [b]) => a - b)
    .map(([month, payments]) => {
      const amount = payments.reduce((sum, payment) => sum + payment.amount, 0);
      paidToDate += amount;
      return { month, payments, amount, paidToDate, balance: total - paidToDate };
    });

  return { basePrice, charges, total, stages, months, possessionMonth, lastMonth: months.at(-1)?.month ?? 0 };
}

/** "Dec 2026" for a month offset from the booking month, or "Month 3" when no booking month is chosen. */
export function monthLabel(month: number, start: MonthKey | null) {
  if (!start) return month === 0 ? 'At booking' : `Month ${month}`;
  const [year, monthIndex] = start.split('-').map(Number);
  return new Date(year, monthIndex - 1 + month, 1).toLocaleString('en-GB', { month: 'short', year: 'numeric' });
}

/** The next twelve calendar months starting from the given one, for the booking-month picker. */
export function upcomingMonths(from: MonthKey, count = 12): { value: MonthKey; label: string }[] {
  return Array.from({ length: count }, (_, index) => {
    const label = monthLabel(index, from);
    const [year, monthIndex] = from.split('-').map(Number);
    const date = new Date(year, monthIndex - 1 + index, 1);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}` as MonthKey;
    return { value, label };
  });
}
