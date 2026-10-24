'use client';

import { useState } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BUILDING_LAYERS, type BuildingLayer } from '../data';

type LayerButtonProps = {
  layer: BuildingLayer;
  index: number;
  selected: boolean;
  onSelect: () => void;
};

function LayerButton({ layer, index, selected, onSelect }: LayerButtonProps) {
  return (
    <button
      className={`explorerZone explorerZone-${index + 1}`}
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls="explorer-context-panel"
      onClick={onSelect}
    >
      <span>0{index + 1}</span>
      <strong>{layer.label}</strong>
      <small>{selected ? 'Selected' : 'Explore'}</small>
    </button>
  );
}

function ExplorerContext({ layer }: { layer: BuildingLayer }) {
  return (
    <div className="explorerContext" id="explorer-context-panel" role="tabpanel" aria-live="polite">
      <Eyebrow>{layer.eyebrow}</Eyebrow>
      <h3>{layer.title}</h3>
      <p>{layer.description}</p>
      <p className="explorerDetail">{layer.detail}</p>
      <div className="actions">
        <ButtonLink href={layer.unitHref} variant="dark">Find matching units <span aria-hidden="true">↗</span></ButtonLink>
        <ButtonLink href={layer.planHref} variant="secondary">View payment path</ButtonLink>
      </div>
    </div>
  );
}

export function BuildingExplorerExperience() {
  const [activeId, setActiveId] = useState(BUILDING_LAYERS[2].id);
  const active = BUILDING_LAYERS.find((layer) => layer.id === activeId) ?? BUILDING_LAYERS[0];

  return (
    <>
      <section className="section explorerHero">
        <div className="container explorerHeroGrid">
          <div>
            <Eyebrow>Building explorer</Eyebrow>
            <h1>See how the destination comes together.</h1>
            <p>Move through the building by purpose. The same information remains available as an accessible list for every visitor.</p>
            <ButtonLink href="#explorer-workspace">Explore the layers <span aria-hidden="true">↓</span></ButtonLink>
          </div>
          <div className="explorerHeroStamp" aria-hidden="true"><span>Retail / office / residential</span><strong>03</strong></div>
        </div>
      </section>
      <section className="section explorerWorkspace" id="explorer-workspace">
        <div className="container">
          <SectionHeading
            id="explorer-heading"
            eyebrow="One building / three ways to arrive"
            title="Choose a layer and keep the context close."
            description="Choose a layer to understand how retail, offices and residences come together at Aureum Mall."
          />
          <div className="explorerLayout">
            <div className="explorerVisualPanel">
              <div className="explorerVisualTop"><span>AUREUM / ELEVATION PREVIEW</span><span>01 — 03</span></div>
              <div className="explorerStack" role="tablist" aria-label="Building layers">
                {BUILDING_LAYERS.map((layer, index) => <LayerButton key={layer.id} layer={layer} index={index} selected={layer.id === active.id} onSelect={() => setActiveId(layer.id)} />)}
              </div>
              <div className="explorerVisualBottom"><span>Tap or click a layer</span><span>Explore project pathways</span></div>
            </div>
            <ExplorerContext layer={active} />
          </div>
          <div className="explorerFallback" aria-labelledby="explorer-fallback-heading">
            <div className="explorerFallbackIntro"><Eyebrow>Accessible fallback</Eyebrow><h2 id="explorer-fallback-heading">The same information, in a straightforward list.</h2></div>
            <ol className="explorerList">
              {BUILDING_LAYERS.map((layer, index) => <li key={layer.id}><button type="button" onClick={() => setActiveId(layer.id)} aria-current={layer.id === active.id ? 'true' : undefined}><span>0{index + 1}</span><strong>{layer.label}</strong><small>{layer.detail}</small></button></li>)}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
