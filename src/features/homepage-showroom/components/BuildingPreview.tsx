'use client';

import { useState } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';

const BUILDING_ZONES = [
  { id: 'retail', label: 'Retail', detail: 'Ground-level discovery for shops and shared destinations.' },
  { id: 'office', label: 'Office', detail: 'A professional layer for focused work and business presence.' },
  { id: 'residential', label: 'Residential', detail: 'A vertical home experience for the everyday.' },
] as const;

export function BuildingPreview() {
  const [activeId, setActiveId] = useState<(typeof BUILDING_ZONES)[number]['id']>('residential');
  const active = BUILDING_ZONES.find((zone) => zone.id === activeId) ?? BUILDING_ZONES[0];

  return (
    <section className="section buildingSection" aria-labelledby="building-heading">
      <div className="container buildingGrid">
        <div>
          <SectionHeading
            id="building-heading"
            eyebrow="The building / in layers"
            title="Understand the destination before you enter it."
            description="This preview establishes the interaction pattern for the future Unit Explorer."
          />
          <div className="buildingCopy" aria-live="polite">
            <Eyebrow>{active.label} layer</Eyebrow>
            <p>{active.detail}</p>
            <ButtonLink href="/building-explorer" variant="dark">Explore the Building <span aria-hidden="true">→</span></ButtonLink>
          </div>
        </div>
        <div className="buildingSchematic">
          <div className="buildingSchematicTop"><span>AUREUM / PREVIEW</span><span>01 — 03</span></div>
          <div className="buildingStack" aria-label="Select a building layer">
            {BUILDING_ZONES.map((zone, index) => (
              <button
                className={`buildingZone buildingZone-${index + 1}`}
                key={zone.id}
                type="button"
                aria-pressed={zone.id === active.id}
                onClick={() => setActiveId(zone.id)}
              >
                <span>0{index + 1}</span><strong>{zone.label}</strong>
              </button>
            ))}
          </div>
          <div className="buildingSchematicBottom"><span>Interactive layers</span><span>Data connection pending</span></div>
        </div>
      </div>
    </section>
  );
}
