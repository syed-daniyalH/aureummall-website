'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { ANALYTICS_EVENTS } from '@/features/content-seo/data';
import { track } from '@/lib/analytics';
import { whatsappHref } from '@/lib/whatsapp';
import { PAYMENT_SOURCE_LABEL, SOURCE_PAYMENT_TABLES } from '../data';
import { CALC_HASH_PREFIX, PRICED_UNITS, describeUnit, formatLakhCrore, formatPKR, formatSqFt } from '../units';

type Stage = { key: string; when: string; label: string; detail: string; total: number; percent: number };

const COUNT_MS = 900;

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

/** Pick a category and a unit to see the base price and the payment plan as a timeline, booking to possession. */
export function PriceCalculator({ id = 'price-calculator' }: { id?: string }) {
  const [unitId, setUnitId] = useState(PRICED_UNITS[0].id);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const unit = PRICED_UNITS.find((item) => item.id === unitId) ?? PRICED_UNITS[0];
  const { table, row } = unit;
  const tableUnits = PRICED_UNITS.filter((item) => item.table.id === table.id);

  // Links such as #calc-apartments-0 (from the building explorer) pre-select a unit and bring the calculator into view.
  useEffect(() => {
    function applyHash() {
      if (!window.location.hash.startsWith(CALC_HASH_PREFIX)) return;
      const match = PRICED_UNITS.find((item) => `${CALC_HASH_PREFIX}${item.id}` === window.location.hash);
      if (!match) return;
      setUnitId(match.id);
      rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  // Hold the timeline animation until the card is on screen, so visitors see the line draw.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setInView(true);
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  function choose(nextId: string) {
    setUnitId(nextId);
    track(ANALYTICS_EVENTS.priceCalculatorSelect, { unit: nextId });
  }

  const stages: Stage[] = [
    { key: 'booking', when: 'At booking', label: 'Booking', detail: 'Reserves your unit', total: row.booking, percent: 10 },
    { key: 'confirmation', when: 'On confirmation', label: 'Confirmation', detail: 'Confirms the allotment', total: row.confirmation, percent: 15 },
    { key: 'monthly', when: `Months 1–${table.monthlyCount}`, label: 'Monthly', detail: `${formatPKR(row.monthlyInstallment)} × ${table.monthlyCount}`, total: row.monthlyInstallment * table.monthlyCount, percent: table.monthlyCount },
    ...(row.halfYearly ? [{ key: 'halfYearly', when: 'Every 6 months', label: 'Half-yearly', detail: `${formatPKR(row.halfYearly)} × 6`, total: row.halfYearly * 6, percent: 13 }] : []),
    { key: 'completion', when: 'On possession', label: 'Completion', detail: 'Paid at handover', total: row.completion, percent: 20 },
  ];

  const description = describeUnit(unit);
  const whatsapp = whatsappHref(`a ${description}, base price ${formatPKR(row.totalPrice)}`);
  const timelineStyle = { '--steps': stages.length } as CSSProperties;

  return (
    <div className="calc" id={id} ref={rootRef}>
      <div className="calcControls">
        <fieldset>
          <legend>Category</legend>
          <div className="calcPills">
            {SOURCE_PAYMENT_TABLES.map((item) => (
              <button key={item.id} type="button" aria-pressed={item.id === table.id} onClick={() => choose(`${item.id}-0`)}>{item.title}</button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Unit</legend>
          <div className="calcPills">
            {tableUnits.map((item) => (
              <button key={item.id} type="button" aria-pressed={item.id === unit.id} onClick={() => choose(item.id)}>
                {item.row.type} · {formatSqFt(item.row.sizeSqFt)}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className={`calcCard${inView ? ' isInView' : ''}`} ref={cardRef} aria-live="polite" aria-labelledby={`${uid}-total`}>
        <div className="calcHead">
          <div>
            <p className="calcUnit">{description}</p>
            <p className="calcTotal" id={`${uid}-total`}>
              <span>Base price</span>
              <strong><Amount value={row.totalPrice} /></strong>
              <small>≈ {formatLakhCrore(row.totalPrice)} · {formatSqFt(row.sizeSqFt)} at {formatPKR(row.ratePerSqFt)} per sq ft</small>
            </p>
          </div>
          <div className="calcDue">
            <span>Due at booking &amp; confirmation</span>
            <strong><Amount value={row.booking + row.confirmation} /></strong>
            <small>{table.installmentLabel}</small>
          </div>
        </div>

        {/* Keyed by unit so the line draws and the stages light up again on every change. */}
        <ol className="calcTimeline" key={unit.id} style={timelineStyle} aria-label="Payment plan stages">
          {stages.map((stage, index) => (
            <li key={stage.key} className={`calcStep calcStep-${stage.key}`} style={{ '--i': index } as CSSProperties}>
              <span className="calcNode" aria-hidden="true" />
              <p className="calcWhen">{stage.when}</p>
              <p className="calcPct">{stage.percent}%</p>
              <p className="calcAmount"><Amount value={stage.total} /></p>
              <p className="calcLabel">{stage.label}<small>{stage.detail}</small></p>
            </li>
          ))}
        </ol>

        <div className="calcFoot">
          <div className="actions">
            <a className="button primary" href={whatsapp} target="_blank" rel="noopener" onClick={() => track(ANALYTICS_EVENTS.whatsappClick, { placement: 'price_calculator', unit: unit.id })}>Ask about this unit on WhatsApp</a>
            <ButtonLink href="/contact?intent=site_visit#enquiry" variant="secondary">Book a visit</ButtonLink>
          </div>
          <p className="calcNote">{table.possessionLabel}. Base prices from the {PAYMENT_SOURCE_LABEL}; applicable 10% category charges are additional. Prices, plans and availability are subject to final confirmation.</p>
        </div>
      </div>
    </div>
  );
}
