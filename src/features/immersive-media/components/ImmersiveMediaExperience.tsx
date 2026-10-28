'use client';

import { useCallback, useMemo, useState } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PROJECT_MEDIA, MEDIA_PRINCIPLES, type ImmersiveMediaAsset } from '../data';
import { MediaAssetCard } from './MediaAssetCard';
import { MediaLightbox } from './MediaLightbox';
import { VirtualTourEmbed } from './VirtualTourEmbed';

function MediaRegister({ assets, onOpen }: { assets: readonly ImmersiveMediaAsset[]; onOpen: (asset: ImmersiveMediaAsset) => void }) {
  return <div className="mediaGallery">{assets.map((asset) => <MediaAssetCard key={asset.id} asset={asset} onOpen={() => onOpen(asset)} />)}</div>;
}

export function ImmersiveMediaExperience() {
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const selectedAsset = useMemo(() => PROJECT_MEDIA.find((asset) => asset.id === selectedAssetId), [selectedAssetId]);
  const visualAssets = useMemo(() => PROJECT_MEDIA.filter((asset) => asset.kind === 'image'), []);
  const floorPlans = useMemo(() => PROJECT_MEDIA.filter((asset) => asset.kind === 'floor-plan'), []);
  const closeViewer = useCallback(() => setSelectedAssetId(null), []);

  return (
    <>
      <section className="section mediaHero">
        <div className="container mediaHeroGrid">
          <div>
            <Eyebrow>Project media</Eyebrow>
            <h1>Let the space become familiar before the visit.</h1>
            <p>Walk through Aureum Mall &amp; Residences in a 360° virtual tour, then explore the project artwork, payment-plan visuals and floor plans.</p>
            <div className="mediaHeroActions">
              <ButtonLink href="#virtual-tour">Start the 360° tour <span aria-hidden="true">↓</span></ButtonLink>
              <ButtonLink href="#media-workspace" variant="secondary">Open the project gallery</ButtonLink>
            </div>
          </div>
          <div className="mediaHeroStamp" aria-hidden="true"><span>360° tour / images / plans</span><strong>06</strong></div>
        </div>
      </section>

      <section className="section tourSection" id="virtual-tour" aria-labelledby="tour-heading">
        <div className="container">
          <SectionHeading id="tour-heading" eyebrow="360° virtual tour" title="Look around before you visit." description="Drag or swipe to look in every direction, then follow the markers from the street-level arrival into the mall, residences and lifestyle spaces." />
          <VirtualTourEmbed placement="immersive_media" />
        </div>
      </section>

      <section className="section mediaWorkspace" id="media-workspace">
        <div className="container">
          <SectionHeading id="media-heading" eyebrow="Aureum project gallery" title="See the project clearly." description="Browse the project visuals and open any item for a larger view with its description and context." />
          <div className="mediaRegisterMeta" aria-label="Project media status"><span><strong>{String(PROJECT_MEDIA.length).padStart(2, '0')}</strong> project assets</span><span>Local gallery</span><span>Accessible descriptions</span></div>
          <MediaRegister assets={visualAssets} onOpen={(asset) => setSelectedAssetId(asset.id)} />
        </div>
      </section>

      <section className="section mediaFloorPlans">
        <div className="container">
          <SectionHeading eyebrow="Floor plans" title="Explore the building dimensions." description="Review the available floor plans alongside their labels, then contact the team for current details." />
          <MediaRegister assets={floorPlans} onOpen={(asset) => setSelectedAssetId(asset.id)} />
        </div>
      </section>

      <section className="section mediaPrinciples">
        <div className="container mediaPrinciplesGrid">
          <div><Eyebrow>Project information</Eyebrow><h2>See more, understand more.</h2></div>
          <ul>{MEDIA_PRINCIPLES.map((principle) => <li key={principle}>{principle}</li>)}</ul>
        </div>
      </section>

      {selectedAsset ? <MediaLightbox asset={selectedAsset} onClose={closeViewer} /> : null}
    </>
  );
}
