'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { ANALYTICS_EVENTS } from '@/features/content-seo/data';
import { track } from '@/lib/analytics';
import { whatsappHref } from '@/lib/whatsapp';
import { PAYMENT_SOURCE_LABEL, SOURCE_PAYMENT_TABLES } from '../data';
import { CALC_HASH_PREFIX, PRICED_UNITS, describeUnit, formatLakhCrore, formatPKR, formatSqFt } from '../units';

type Stage = { key: string; label: string; detail: string; total: number; percent: number };

/** Pick a category and a unit to see the base price and every stage of the catalogue payment plan. */
export function PriceCalculator({ id = 'price-calculator' }: { id?: string }) {
  const [unitId, setUnitId] = useState(PRICED_UNITS[0].id);
  const rootRef = useRef<HTMLDivElement>(null);
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

  function choose(nextId: string) {
    setUnitId(nextId);
    track(ANALYTICS_EVENTS.priceCalculatorSelect, { unit: nextId });
  }

  const stages: Stage[] = [
    { key: 'booking', label: 'Booking', detail: '10% on booking', total: row.booking, percent: 10 },
    { key: 'confirmation', label: 'Confirmation', detail: '15% on confirmation', total: row.confirmation, percent: 15 },
    { key: 'monthly', label: 'Monthly', detail: `${formatPKR(row.monthlyInstallment)} × ${table.monthlyCount} months`, total: row.monthlyInstallment * table.monthlyCount, percent: table.monthlyCount },
    ...(row.halfYearly ? [{ key: 'halfYearly', label: 'Half-yearly', detail: `${formatPKR(row.halfYearly)} × 6`, total: row.halfYearly * 6, percent: 13 }] : []),
    { key: 'completion', label: 'On completion', detail: '20% on possession', total: row.completion, percent: 20 },
  ];

  const description = describeUnit(unit);
  const whatsapp = whatsappHref(`a ${description}, base price ${formatPKR(row.totalPrice)}`);

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
        <p className="calcTerms">{table.installmentLabel} · {table.possessionLabel}</p>
      </div>

      <div className="calcResult" aria-live="polite" aria-labelledby={`${uid}-total`}>
        <p className="calcUnit">{description}</p>
        <p className="calcTotal" id={`${uid}-total`}>
          <span>Base price</span>
          <strong>{formatPKR(row.totalPrice)}</strong>
          <small>≈ {formatLakhCrore(row.totalPrice)} · {formatSqFt(row.sizeSqFt)} at {formatPKR(row.ratePerSqFt)} per sq ft</small>
        </p>

        <div className="calcBar" aria-hidden="true">
          {stages.map((stage) => <span key={stage.key} className={`calcBar-${stage.key}`} style={{ flexGrow: stage.percent }} />)}
        </div>

        <dl className="calcStages">
          {stages.map((stage) => (
            <div key={stage.key}>
              <dt><i className={`calcDot calcBar-${stage.key}`} aria-hidden="true" />{stage.label}<small>{stage.detail}</small></dt>
              <dd>{formatPKR(stage.total)}</dd>
            </div>
          ))}
        </dl>

        <div className="calcFirst">
          <span>Due at booking and confirmation</span>
          <strong>{formatPKR(row.booking + row.confirmation)}</strong>
        </div>

        <div className="actions">
          <a className="button primary" href={whatsapp} target="_blank" rel="noopener" onClick={() => track(ANALYTICS_EVENTS.whatsappClick, { placement: 'price_calculator', unit: unit.id })}>Ask about this unit on WhatsApp</a>
          <ButtonLink href="/contact?intent=site_visit#enquiry" variant="secondary">Book a visit</ButtonLink>
        </div>
        <p className="calcNote">Base prices from the {PAYMENT_SOURCE_LABEL}. Applicable 10% category charges are additional. Prices, plans and availability are subject to final confirmation.</p>
      </div>
    </div>
  );
}
