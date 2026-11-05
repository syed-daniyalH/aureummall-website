'use client';

import { useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import Link from 'next/link';
import { ANALYTICS_EVENTS } from '@/features/content-seo/data';
import { track } from '@/lib/analytics';
import { whatsappHref } from '@/lib/whatsapp';
import { PAYMENT_SOURCE_LABEL, SOURCE_PAYMENT_TABLES } from '../data';
import { buildSchedule, CATEGORY_CHARGE_PERCENT, monthLabel, upcomingMonths, type MonthKey, type PaymentSchedule } from '../schedule';
import { CALC_HASH_PREFIX, PRICED_UNITS, describeUnit, formatLakhCrore, formatPKR, formatSqFt, type PricedUnit } from '../units';

const COUNT_MS = 700;
const SCHEDULE_PREVIEW_ROWS = 8;

/** Counts from the previous value to the new one, so changing unit visibly re-tallies the plan. */
function useCountUp(target: number) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    fromRef.current = target;
    if (from === target) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      queueMicrotask(() => setValue(target));
      return;
    }
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return value;
}

function Amount({ value }: { value: number }) {
  return <>{formatPKR(useCountUp(value))}</>;
}

// The current month is only known in the browser; the server render shows month numbers instead of dates.
const noopSubscribe = () => () => {};
function currentMonthKey(): MonthKey {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

const STAGE_COLORS: Record<string, string> = {
  booking: 'var(--gold-soft)',
  confirmation: '#b99766',
  monthly: '#8f91c9',
  halfYearly: '#5b5ea6',
  completion: '#ffffff',
};

function unitLabel(item: PricedUnit) {
  const category = item.row.premium ? 'Premium' : item.row.unitCategory;
  return `${item.row.type} · ${formatSqFt(item.row.sizeSqFt)}${category ? ` · ${category}` : ''}`;
}

function whatsappSummary(unit: PricedUnit, schedule: PaymentSchedule, start: MonthKey | null) {
  const lines = [
    `a ${describeUnit(unit)}.`,
    `Price: ${formatPKR(schedule.total)}${schedule.charges ? ` (incl. ${CATEGORY_CHARGE_PERCENT}% category charges)` : ''}`,
    ...schedule.stages.map((stage) => `${stage.label}: ${stage.count > 1 ? `${formatPKR(stage.each)} × ${stage.count}` : formatPKR(stage.total)}`),
    start ? `Planned booking: ${monthLabel(0, start)}` : '',
  ].filter(Boolean);
  return lines.join('\n');
}

type PriceCalculatorProps = {
  id?: string;
  /** Opens on this plan (e.g. "apartments"). */
  tableId?: string;
  /** Keeps the calculator to `tableId`'s units only, for a category's own page. */
  lockToTable?: boolean;
};

/** Pick a plan and a unit to see the price, the instalments and the full dated payment schedule. */
export function PriceCalculator({ id = 'price-calculator', tableId, lockToTable = false }: PriceCalculatorProps) {
  const [unitId, setUnitId] = useState(() => (PRICED_UNITS.find((item) => item.table.id === tableId) ?? PRICED_UNITS[0]).id);
  const [withCharges, setWithCharges] = useState(false);
  const [start, setStart] = useState<MonthKey | null>(null);
  const [showAll, setShowAll] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const thisMonth = useSyncExternalStore(noopSubscribe, currentMonthKey, () => null);

  const unit = PRICED_UNITS.find((item) => item.id === unitId) ?? PRICED_UNITS[0];
  const { table, row } = unit;
  const tableUnits = PRICED_UNITS.filter((item) => item.table.id === table.id);
  const schedule = buildSchedule(table, row, withCharges);
  const monthlyStage = schedule.stages.find((stage) => stage.key === 'monthly');
  const halfYearlyStage = schedule.stages.find((stage) => stage.key === 'halfYearly');
  const completionStage = schedule.stages.find((stage) => stage.key === 'completion');
  const upfront = schedule.stages.filter((stage) => stage.key === 'booking' || stage.key === 'confirmation').reduce((sum, stage) => sum + stage.total, 0);
  const visibleMonths = showAll ? schedule.months : schedule.months.slice(0, SCHEDULE_PREVIEW_ROWS);
  const planYears = table.monthlyCount === 55 ? '4.5' : '3.5';
  const description = describeUnit(unit);

  // Links such as #calc-apartments-0 (from the building explorer) pre-select a unit and bring the calculator into view.
  useEffect(() => {
    function applyHash() {
      if (!window.location.hash.startsWith(CALC_HASH_PREFIX)) return;
      const match = PRICED_UNITS.find((item) => `${CALC_HASH_PREFIX}${item.id}` === window.location.hash);
      if (!match || (lockToTable && match.table.id !== tableId)) return;
      setUnitId(match.id);
      rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, [lockToTable, tableId]);

  function choose(nextId: string) {
    setUnitId(nextId);
    setShowAll(false);
    track(ANALYTICS_EVENTS.priceCalculatorSelect, { unit: nextId });
  }

  function printSchedule() {
    track(ANALYTICS_EVENTS.scheduleDownload, { unit: unit.id, charges: withCharges });
    const sheet = rootRef.current?.querySelector('.calcPrintSheet');
    if (!sheet) return;
    // A copy of the sheet goes straight under <body> so the rest of the page can be left out of the print.
    const printRoot = document.createElement('div');
    printRoot.id = 'calcPrintRoot';
    printRoot.append(sheet.cloneNode(true));
    document.body.append(printRoot);
    document.documentElement.classList.add('isPrintingSchedule');
    const cleanup = () => {
      document.documentElement.classList.remove('isPrintingSchedule');
      printRoot.remove();
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    window.print();
  }

  const whatsapp = whatsappHref(whatsappSummary(unit, schedule, start));

  return (
    <div className="calc calcPro" id={id} ref={rootRef}>
      <div className="calcProGrid">
        <div className="calcProControls">
          {lockToTable ? null : (
            <fieldset>
              <legend><span aria-hidden="true">1</span>Payment plan</legend>
              <div className="calcPills">
                {SOURCE_PAYMENT_TABLES.map((item) => (
                  <button key={item.id} type="button" aria-pressed={item.id === table.id} onClick={() => choose(`${item.id}-0`)}>{item.title}</button>
                ))}
              </div>
            </fieldset>
          )}
          <fieldset>
            <legend><span aria-hidden="true">{lockToTable ? 1 : 2}</span>{lockToTable ? `${table.title} unit` : 'Unit'}</legend>
            <div className="calcPills">
              {tableUnits.map((item) => (
                <button key={item.id} type="button" aria-pressed={item.id === unit.id} onClick={() => choose(item.id)}>{unitLabel(item)}</button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend><span aria-hidden="true">{lockToTable ? 2 : 3}</span>Options</legend>
            <label className="calcSwitch">
              <input type="checkbox" checked={withCharges} onChange={(event) => setWithCharges(event.target.checked)} />
              <span className="calcSwitchTrack" aria-hidden="true" />
              <span>Add {CATEGORY_CHARGE_PERCENT}% category charges<small>If applicable, e.g. corner or facing units</small></span>
            </label>
            <label className="calcSelect">
              <span>Planned booking month</span>
              <select value={start ?? ''} onChange={(event) => setStart((event.target.value || null) as MonthKey | null)}>
                <option value="">Not decided — show month numbers</option>
                {thisMonth ? upcomingMonths(thisMonth).map((option) => <option key={option.value} value={option.value}>{option.label}</option>) : null}
              </select>
            </label>
          </fieldset>
        </div>

        <div className="calcCard calcProResult isInView" aria-live="polite" aria-labelledby={`${uid}-total`}>
          <p className="calcUnit">{table.title} · {unitLabel(unit)}</p>
          <p className="calcTotal" id={`${uid}-total`}>
            <span>{schedule.charges ? 'Price incl. category charges' : 'Base price'}</span>
            <strong><Amount value={schedule.total} /></strong>
            <small>
              ≈ {formatLakhCrore(schedule.total)} · {formatSqFt(row.sizeSqFt)} at {formatPKR(row.ratePerSqFt)} per sq ft
              {schedule.charges ? ` + ${formatPKR(schedule.charges)} category charges` : ''}
            </small>
          </p>

          <dl className="calcFigures">
            <div><dt>Upfront</dt><dd><Amount value={upfront} /></dd><small>Booking 10% + confirmation 15%</small></div>
            <div><dt>Monthly</dt><dd>{monthlyStage ? <Amount value={monthlyStage.each} /> : '—'}</dd><small>× {table.monthlyCount} months</small></div>
            <div><dt>Half-yearly</dt><dd>{halfYearlyStage ? <Amount value={halfYearlyStage.each} /> : '—'}</dd><small>{halfYearlyStage ? `× ${halfYearlyStage.count}, every 6 months` : 'Not part of this plan'}</small></div>
            <div><dt>On possession</dt><dd>{completionStage ? <Amount value={completionStage.total} /> : '—'}</dd><small>20% · {monthLabel(schedule.possessionMonth, start)}*</small></div>
          </dl>

          <div className="calcSplit" aria-label="How the price is split">
            <div className="calcSplitBar" aria-hidden="true">
              {schedule.stages.map((stage) => <span key={stage.key} style={{ flexGrow: stage.percent, background: STAGE_COLORS[stage.key] } as CSSProperties} />)}
            </div>
            <ul className="calcSplitLegend">
              {schedule.stages.map((stage) => (
                <li key={stage.key}><span style={{ background: STAGE_COLORS[stage.key] }} aria-hidden="true" />{stage.label} {stage.percent}%</li>
              ))}
            </ul>
          </div>

          <div className="calcProActions">
            <a className="button primary" href={whatsapp} target="_blank" rel="noopener" onClick={() => track(ANALYTICS_EVENTS.whatsappClick, { placement: 'price_calculator', unit: unit.id })}>Send this plan on WhatsApp</a>
            <button type="button" className="button secondary calcPrintButton" onClick={printSchedule}>Download schedule (PDF)</button>
          </div>
          <p className="calcPlanLine">{planYears}-year plan · {table.possessionLabel}* · <Link href="/contact?intent=site_visit#enquiry">Book a visit</Link></p>
        </div>
      </div>

      <section className="calcSchedule" aria-labelledby={`${uid}-schedule`}>
        <header className="calcScheduleHead">
          <div>
            <h3 id={`${uid}-schedule`}>Payment schedule</h3>
            <p>{schedule.months.length} payment dates over {schedule.lastMonth + 1} months, with the balance left after each one.</p>
          </div>
          <p className="calcScheduleTotal"><span>Total</span>{formatPKR(schedule.total)}</p>
        </header>
        <div className="paymentTableWrap">
          <table className="calcScheduleTable">
            <caption className="srOnly">Payment schedule for a {description}</caption>
            <thead>
              <tr>
                <th scope="col">{start ? 'Month' : 'When'}</th>
                <th scope="col">Payment</th>
                <th scope="col">Amount</th>
                <th scope="col">Paid so far</th>
                <th scope="col">Balance left</th>
              </tr>
            </thead>
            <tbody>
              {visibleMonths.map((entry) => (
                <tr key={entry.month} className={entry.payments.length > 1 || entry.payments[0].stage !== 'monthly' ? 'isMilestone' : undefined}>
                  <th scope="row">{monthLabel(entry.month, start)}</th>
                  <td>{entry.payments.map((payment) => <span key={payment.label}>{payment.label}</span>)}</td>
                  <td>{formatPKR(entry.amount)}</td>
                  <td>{formatPKR(entry.paidToDate)}</td>
                  <td>{formatPKR(entry.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {schedule.months.length > SCHEDULE_PREVIEW_ROWS ? (
          <button type="button" className="calcScheduleMore" aria-expanded={showAll} onClick={() => setShowAll((value) => !value)}>
            {showAll ? 'Show fewer payments' : `Show all ${schedule.months.length} payment dates`}
          </button>
        ) : null}
        <p className="calcNote">
          * Possession timing is indicative. Dates assume confirmation and the first monthly instalment one month after booking; the dated schedule in your booking documents is final.
          Base prices from the {PAYMENT_SOURCE_LABEL}. Prices, plans and availability are subject to final confirmation.
        </p>
      </section>

      {/* Printed instead of the page when the visitor downloads the schedule. */}
      <div className="calcPrintSheet" aria-hidden="true">
        <p className="calcPrintBrand">Aureum Mall &amp; Residences · Bahria Town Ring Road Interchange, Lahore</p>
        <h2>Payment schedule</h2>
        <p>{description}</p>
        <table>
          <tbody>
            <tr><th>Base price</th><td>{formatPKR(schedule.basePrice)}</td></tr>
            {schedule.charges ? <tr><th>Category charges ({CATEGORY_CHARGE_PERCENT}%)</th><td>{formatPKR(schedule.charges)}</td></tr> : null}
            <tr><th>Total</th><td>{formatPKR(schedule.total)} (≈ {formatLakhCrore(schedule.total)})</td></tr>
            {schedule.stages.map((stage) => <tr key={stage.key}><th>{stage.label} ({stage.percent}%)</th><td>{stage.count > 1 ? `${formatPKR(stage.each)} × ${stage.count} = ${formatPKR(stage.total)}` : formatPKR(stage.total)}</td></tr>)}
          </tbody>
        </table>
        <table>
          <thead><tr><th>{start ? 'Month' : 'When'}</th><th>Payment</th><th>Amount</th><th>Paid so far</th><th>Balance left</th></tr></thead>
          <tbody>
            {schedule.months.map((entry) => (
              <tr key={entry.month}>
                <td>{monthLabel(entry.month, start)}</td>
                <td>{entry.payments.map((payment) => payment.label).join(' + ')}</td>
                <td>{formatPKR(entry.amount)}</td>
                <td>{formatPKR(entry.paidToDate)}</td>
                <td>{formatPKR(entry.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Indicative schedule prepared on the Aureum website. Possession timing is indicative; the dated schedule in the booking documents is final. Prices, plans and availability are subject to confirmation by the developer. No fixed return is guaranteed.</p>
      </div>
    </div>
  );
}
