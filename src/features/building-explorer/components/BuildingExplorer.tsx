'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { calcHref, formatLakhCrore, formatPKR, formatSqFt, startingPrice, unitsForTables } from '@/features/payment-plans/units';
import { EXPLORER_LEVELS, type ExplorerLevel } from '../data';

function LevelDetails({ level, panelId }: { level: ExplorerLevel; panelId: string }) {
  const units = unitsForTables(level.tableIds);
  const [plan] = level.plans;

  return (
    <div className="bxPanel" id={panelId} role="tabpanel" aria-live="polite">
      <div className="bxPanelHead">
        <Eyebrow>{level.meta ?? 'Aureum'}</Eyebrow>
        <h3>{level.name}</h3>
        <p>{level.summary}</p>
      </div>

      {plan ? (
        <a className="bxPlan" href={plan.src} target="_blank" rel="noopener" aria-label={`Open the full-size ${level.name.toLowerCase()} plan`}>
          <Image src={plan.src} alt={plan.alt} fill sizes="(max-width: 900px) 92vw, 560px" />
          <span>{level.plans.length > 1 ? `${level.plans.length} plans · tap to open` : 'Tap to open the plan'} ↗</span>
        </a>
      ) : null}

      {units.length ? (
        <div className="bxUnits">
          <p className="bxUnitsTitle">Units on this level</p>
          <ul>
            {units.map((unit) => (
              <li key={unit.id}>
                <a href={calcHref(unit.id)}>
                  <span><strong>{unit.row.type}</strong>{formatSqFt(unit.row.sizeSqFt)}</span>
                  <span className="bxUnitPrice">{formatPKR(unit.row.totalPrice)}<small>Calculate ↓</small></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {level.pricesNote ? <p className="bxNote">{level.pricesNote}</p> : null}
      <ButtonLink href={level.href} variant="dark">{level.hrefLabel}</ButtonLink>
    </div>
  );
}

/** Interactive elevation: pick a level to see what is there, its plan and the units with base prices. */
export function BuildingExplorer({ initialLevel = 'residences' }: { initialLevel?: string }) {
  const [activeId, setActiveId] = useState(initialLevel);
  const active = EXPLORER_LEVELS.find((level) => level.id === activeId) ?? EXPLORER_LEVELS[0];
  const uid = useId();
  const panelId = `${uid}-panel`;

  return (
    <div className="bxLayout">
      <div className="bxElevation">
        <div className="bxStack" role="tablist" aria-label="Building levels" aria-orientation="vertical">
          {EXPLORER_LEVELS.map((level) => {
            const from = startingPrice(level.tableIds);
            const selected = level.id === active.id;
            return (
              <button
                key={level.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                className={`bxLevel bxLevel-${level.shape}${selected ? ' isActive' : ''}`}
                onClick={() => setActiveId(level.id)}
              >
                <span className="bxLevelName">{level.name}</span>
                <span className="bxLevelMeta">{from ? `From ${formatLakhCrore(from)}` : level.meta ?? ''}</span>
              </button>
            );
          })}
        </div>
        <p className="bxHint">Tap a level to see its plan and prices</p>
      </div>
      <LevelDetails level={active} panelId={panelId} />
    </div>
  );
}
