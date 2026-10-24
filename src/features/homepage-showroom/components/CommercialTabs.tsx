'use client';

import { useState } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMMERCIAL_DESTINATIONS } from '../data';

export function CommercialTabs() {
  const [activeId, setActiveId] = useState<(typeof COMMERCIAL_DESTINATIONS)[number]['id']>('shops');
  const active = COMMERCIAL_DESTINATIONS.find((item) => item.id === activeId) ?? COMMERCIAL_DESTINATIONS[0];

  return (
    <section className="section commercialSection" aria-labelledby="commercial-heading">
      <div className="container">
        <SectionHeading
          id="commercial-heading"
          className="sectionIntro"
          eyebrow="Beyond the residence"
          title="Aureum has a clear path for every kind of arrival."
          description="Keep retail, food and office discovery visible without making commercial buyers search through residential content."
        />
        <div className="commercialPanel">
          <div className="commercialTabs" role="tablist" aria-label="Commercial and office pathways">
            {COMMERCIAL_DESTINATIONS.map((item) => (
              <button
                className="commercialTab"
                key={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === active.id}
                aria-controls={`commercial-panel-${item.id}`}
                onClick={() => setActiveId(item.id)}
              >
                <span>{item.label}</span>
                <small>{item.id === active.id ? 'Selected' : 'Explore'}</small>
              </button>
            ))}
          </div>
          <div className="commercialPanelContent" id={`commercial-panel-${active.id}`} role="tabpanel">
            <Eyebrow>{active.eyebrow}</Eyebrow>
            <h3>{active.title}</h3>
            <p>{active.description}</p>
            <ButtonLink href={active.href} variant="secondary">Open {active.label} pathway <span aria-hidden="true">↗</span></ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
