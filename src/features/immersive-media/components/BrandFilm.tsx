'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BRAND_FILM } from '../data';

function wantsMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !connection?.saveData;
}

type BackgroundFilmProps = { className?: string; poster: string; sizes: string };

/**
 * The official film as a silent, looping, non-interactive background layer. The poster sits over it until the
 * first frame plays, then fades away. Visitors who prefer reduced motion or save data see only the poster.
 */
export function BackgroundFilm({ className = '', poster, sizes }: BackgroundFilmProps) {
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setEnabled(wantsMotion()));
  }, []);

  if (!enabled) return null;

  return (
    <div className={`bgFilm ${playing ? 'isVisible' : ''} ${className}`.trim()} aria-hidden="true">
      <video autoPlay muted loop playsInline preload="auto" disablePictureInPicture onPlaying={() => setPlaying(true)}>
        {BRAND_FILM.sources.map((source) => <source key={source.src} src={source.src} type="video/mp4" media={'media' in source ? source.media : undefined} />)}
      </video>
      <Image className="bgFilmCover" src={poster} alt="" fill sizes={sizes} />
    </div>
  );
}

/** A framed, auto-playing film block (used on the media page). */
export function BrandFilmSection({ placement }: { placement: string }) {
  return (
    <section className="section filmSection" aria-labelledby={`film-heading-${placement}`}>
      <div className="container">
        <div className="filmIntro">
          <Eyebrow>The official film</Eyebrow>
          <h2 id={`film-heading-${placement}`}>See Aureum come to life.</h2>
        </div>
        <div className="filmFrame" role="img" aria-label={BRAND_FILM.posterAlt}>
          <Image className="filmPosterImage" src={BRAND_FILM.poster} alt="" fill sizes="(max-width: 1240px) 96vw, 1240px" />
          <BackgroundFilm poster={BRAND_FILM.poster} sizes="(max-width: 1240px) 96vw, 1240px" />
        </div>
      </div>
    </section>
  );
}
