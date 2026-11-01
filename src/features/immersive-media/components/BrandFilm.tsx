'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BRAND_FILM } from '../data';

// YouTube shows a spinner and the video title for its first moments; keep the poster on top until they have passed.
const YOUTUBE_REVEAL_DELAY_MS = 3200;

function wantsMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !connection?.saveData;
}

/**
 * The official film as a silent, looping, non-interactive background layer. It sits behind whatever poster
 * the parent renders and fades in once playing. Visitors who prefer reduced motion or save data see only the poster.
 */
export function BackgroundFilm({ className = '' }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setEnabled(wantsMotion()));
  }, []);

  if (!enabled) return null;

  const classes = `bgFilm ${visible ? 'isVisible' : ''} ${className}`.trim();

  if (BRAND_FILM.file) {
    return (
      <div className={classes} aria-hidden="true">
        <video src={BRAND_FILM.file} autoPlay muted loop playsInline preload="auto" onPlaying={() => setVisible(true)} />
      </div>
    );
  }

  const id = BRAND_FILM.youtubeId;
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0`;
  return (
    <div className={classes} aria-hidden="true">
      <iframe src={src} title={BRAND_FILM.title} tabIndex={-1} allow="autoplay; encrypted-media" onLoad={() => window.setTimeout(() => setVisible(true), YOUTUBE_REVEAL_DELAY_MS)} />
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
          <BackgroundFilm />
        </div>
      </div>
    </section>
  );
}
