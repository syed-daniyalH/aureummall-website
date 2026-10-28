'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ANALYTICS_EVENTS } from '@/features/content-seo/data';
import { track } from '@/lib/analytics';
import { VIRTUAL_TOUR } from '../data';

/**
 * The 360° tour loads only after the visitor asks for it, so the panorama viewer never slows the page down.
 * "Open full screen" opens the standalone tour in a new tab for phones and gyroscope viewing.
 */
export function VirtualTourEmbed({ placement }: { placement: string }) {
  const [isActive, setIsActive] = useState(false);

  function start() {
    setIsActive(true);
    track(ANALYTICS_EVENTS.virtualTourOpen, { placement, mode: 'embedded' });
  }

  return (
    <figure className="tourEmbed">
      <div className="tourFrame">
        {isActive ? (
          <iframe
            src={VIRTUAL_TOUR.url}
            title="Aureum Mall & Residences 360° virtual tour"
            allow="fullscreen; accelerometer; gyroscope; xr-spatial-tracking"
          />
        ) : (
          <button type="button" className="tourPoster" onClick={start}>
            <Image src={VIRTUAL_TOUR.poster} alt={VIRTUAL_TOUR.posterAlt} fill sizes="(max-width: 900px) 92vw, 720px" />
            <span className="tourBadge" aria-hidden="true">360°</span>
            <span className="tourStart">
              <span className="tourStartIcon" aria-hidden="true">▶</span>
              Start the 360° tour
            </span>
          </button>
        )}
      </div>
      <figcaption className="tourMeta">
        <p>{VIRTUAL_TOUR.note}</p>
        <a
          href={VIRTUAL_TOUR.url}
          target="_blank"
          rel="noopener"
          onClick={() => track(ANALYTICS_EVENTS.virtualTourOpen, { placement, mode: 'new_tab' })}
        >
          Open full screen <span aria-hidden="true">↗</span>
        </a>
      </figcaption>
    </figure>
  );
}
