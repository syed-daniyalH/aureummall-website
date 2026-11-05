import { describe, expect, it } from 'vitest';
import { SOURCE_PAYMENT_TABLES } from './data';
import { getPaymentPlanPage, PAYMENT_PLAN_PAGES } from './plan-pages';
import { buildSchedule, CATEGORY_CHARGE_PERCENT, monthLabel, upcomingMonths } from './schedule';
import { CALC_HASH_PREFIX, calcHref, PRICED_UNITS } from './units';

describe('price list', () => {
  it('has the five published payment tables', () => {
    expect(SOURCE_PAYMENT_TABLES.map((table) => table.id)).toEqual(['apartments', 'offices', 'first-floor-shops', 'second-floor-shops', 'food-court']);
  });

  it('lists the seven catalogue residences, with the 1,316 sq ft unit as 2 bedrooms + servant quarter', () => {
    const apartments = SOURCE_PAYMENT_TABLES.find((table) => table.id === 'apartments')!;
    expect(apartments.rows.map((row) => row.sizeSqFt)).toEqual([426, 622, 658, 1103, 1316, 1491, 1727]);
    expect(apartments.rows.find((row) => row.sizeSqFt === 1316)?.type).toBe('2 Bedrooms + Servant Quarter');
    expect(apartments.rows.filter((row) => row.premium).map((row) => row.sizeSqFt)).toEqual([1491, 1727]);
  });

  it.each(SOURCE_PAYMENT_TABLES.flatMap((table) => table.rows.map((row) => [table.id, row] as const)))('%s %#: price is size × rate and stages follow the plan', (_id, row) => {
    expect(row.totalPrice).toBe(row.sizeSqFt * row.ratePerSqFt);
    expect(row.booking).toBe(Math.round(row.totalPrice * 0.1));
    expect(row.confirmation).toBe(Math.round(row.totalPrice * 0.15));
    expect(row.monthlyInstallment).toBe(Math.round(row.totalPrice * 0.01));
    expect(row.completion).toBe(Math.round(row.totalPrice * 0.2));
  });

  it('matches the catalogue prices for key units', () => {
    const price = (tableId: string, size: number) => SOURCE_PAYMENT_TABLES.find((t) => t.id === tableId)!.rows.find((r) => r.sizeSqFt === size)!.totalPrice;
    expect(price('apartments', 426)).toBe(8_733_000);
    expect(price('apartments', 1316)).toBe(28_294_000);
    expect(price('apartments', 1727)).toBe(39_721_000);
    expect(price('offices', 2595)).toBe(64_875_000);
    expect(price('first-floor-shops', 172)).toBe(8_600_000);
    expect(price('second-floor-shops', 643)).toBe(27_327_500);
    expect(price('food-court', 301)).toBe(22_575_000);
  });
});

describe('payment schedule', () => {
  const cases = PRICED_UNITS.flatMap((unit) => [[unit.id, unit, false], [unit.id, unit, true]] as const);

  it.each(cases)('%s (charges %s): payments add up to the exact total and the balance ends at zero', (_id, unit, withCharges) => {
    const schedule = buildSchedule(unit.table, unit.row, withCharges);
    const expectedCharges = withCharges ? Math.round((unit.row.totalPrice * CATEGORY_CHARGE_PERCENT) / 100) : 0;
    expect(schedule.basePrice).toBe(unit.row.totalPrice);
    expect(schedule.charges).toBe(expectedCharges);
    expect(schedule.total).toBe(unit.row.totalPrice + expectedCharges);

    const paid = schedule.months.reduce((sum, month) => sum + month.amount, 0);
    expect(paid).toBe(schedule.total);
    expect(schedule.months.at(-1)?.balance).toBe(0);
    expect(schedule.stages.reduce((sum, stage) => sum + stage.total, 0)).toBe(schedule.total);
    expect(schedule.stages.reduce((sum, stage) => sum + stage.percent, 0)).toBe(100);

    // Balances only ever go down, and months are in order.
    for (let i = 1; i < schedule.months.length; i += 1) {
      expect(schedule.months[i].month).toBeGreaterThan(schedule.months[i - 1].month);
      expect(schedule.months[i].balance).toBeLessThan(schedule.months[i - 1].balance);
    }
  });

  it('uses 55 monthly payments for residences and offices, 42 plus 6 half-yearly for shops', () => {
    for (const unit of PRICED_UNITS) {
      const schedule = buildSchedule(unit.table, unit.row, false);
      const count = (stage: string) => schedule.months.flatMap((m) => m.payments).filter((p) => p.stage === stage).length;
      const isShop = unit.table.monthlyCount === 42;
      expect(count('monthly')).toBe(isShop ? 42 : 55);
      expect(count('halfYearly')).toBe(isShop ? 6 : 0);
      expect(count('booking')).toBe(1);
      expect(count('completion')).toBe(1);
      expect(schedule.possessionMonth).toBe(isShop ? 30 : 42);
    }
  });

  it('labels months by calendar date once a booking month is chosen', () => {
    expect(monthLabel(0, null)).toBe('At booking');
    expect(monthLabel(3, null)).toBe('Month 3');
    expect(monthLabel(0, '2026-12')).toBe('Dec 2026');
    expect(monthLabel(2, '2026-12')).toBe('Feb 2027');
    expect(upcomingMonths('2026-11', 3).map((m) => m.value)).toEqual(['2026-11', '2026-12', '2027-01']);
  });
});

describe('payment plan pages', () => {
  it('has one page per table, with unique links', () => {
    expect(PAYMENT_PLAN_PAGES).toHaveLength(SOURCE_PAYMENT_TABLES.length);
    expect(new Set(PAYMENT_PLAN_PAGES.map((page) => page.href)).size).toBe(PAYMENT_PLAN_PAGES.length);
  });

  it('shows the lowest price in each table as its starting price', () => {
    for (const page of PAYMENT_PLAN_PAGES) {
      expect(page.startingFrom).toBe(Math.min(...page.table.rows.map((row) => row.totalPrice)));
      expect(getPaymentPlanPage(page.table.id)).toBe(page);
    }
  });

  it('builds calculator links that match the unit ids', () => {
    for (const unit of PRICED_UNITS) expect(calcHref(unit.id)).toBe(`${CALC_HASH_PREFIX}${unit.id}`);
    expect(new Set(PRICED_UNITS.map((unit) => unit.id)).size).toBe(PRICED_UNITS.length);
  });
});
