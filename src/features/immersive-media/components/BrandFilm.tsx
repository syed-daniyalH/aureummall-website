'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BRAND_FILM } from '../data';

// YouTube shows a spinner and the video title for its first moments; keep the poster on top until they have passed.
const YOUTUBE_REVEAL_DELAY_MS = 4000;

function wantsMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !connection?.saveData;
}

type BackgroundFilmProps = { className?: string; poster: string; sizes: string };

/**
 * The official film as a silent, looping, non-interactive background layer, with the poster laid over it until it is
 * playing. The film itself is never made transparent: browsers pause muted videos they consider invisible.
 * Visitors who prefer reduced motion or save data get no film at all, only the parent's own poster.
 */
export function BackgroundFilm({ className = '', poster, sizes }: BackgroundFilmProps) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setEnabled(wantsMotion()));
  }, []);

  if (!enabled) return null;

  const classes = `bgFilm ${visible ? 'isVisible' : ''} ${className}`.trim();
  const cover = <Image className="bgFilmCover" src={poster} alt="" fill sizes={sizes} />;

  if (BRAND_FILM.file) {
    return (
      <div className={classes} aria-hidden="true">
        <video src={BRAND_FILM.file} autoPlay muted loop playsInline preload="auto" onPlaying={() => setVisible(true)} />
        {cover}
      </div>
    );
  }

  return (
    <div className={classes} aria-hidden="true">
      <YouTubeFilm onVisibleChange={setVisible} />
      {cover}
    </div>
  );
}

const YOUTUBE_ORIGIN = 'https://www.youtube-nocookie.com';
// How long before the end to cover the film, and how long the poster stays up while it restarts out of sight.
const END_COVER_SECONDS = 1.2;
// YouTube shows its title bar for about three seconds after any seek, so keep the poster up a little longer than that.
const RESTART_COVER_MS = 3600;
const PLAYING = 1;
const ENDED = 0;

/**
 * Drives the YouTube player over its postMessage API so its own UI never shows: captions are switched off,
 * and instead of YouTube's loop (which flashes the end screen) the film is covered just before the end,
 * restarted from 0 and revealed again. While it buffers or pauses the poster covers it too.
 */
function YouTubeFilm({ onVisibleChange }: { onVisibleChange: (visible: boolean) => void }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const id = BRAND_FILM.youtubeId;
  const src = `${YOUTUBE_ORIGIN}/embed/${id}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0&cc_load_policy=0&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;

  useEffect(() => {
    const timers: number[] = [];
    let duration = 0;
    let state = -1;
    let introDone = false;
    let restarting = false;

    const send = (message: object) => frameRef.current?.contentWindow?.postMessage(JSON.stringify(message), YOUTUBE_ORIGIN);
    const command = (func: string, args: unknown[] = []) => send({ event: 'command', func, args });
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    const update = () => onVisibleChange(introDone && !restarting && state === PLAYING);
    // cc_load_policy=0 does not stop auto-generated captions, and YouTube turns them back on after a seek.
    const hideCaptions = () => [0, 800, 2000, 3200].forEach((delay) => later(() => command('unloadModule', ['captions']), delay));

    function restart() {
      restarting = true;
      update();
      later(() => {
        command('seekTo', [0, true]);
        command('playVideo');
        hideCaptions();
        later(() => {
          restarting = false;
          update();
        }, RESTART_COVER_MS);
      }, 1400);
    }

    function onMessage(event: MessageEvent) {
      if (event.origin !== YOUTUBE_ORIGIN || event.source !== frameRef.current?.contentWindow || typeof event.data !== 'string') return;
      let info: { duration?: number; currentTime?: number; playerState?: number } | undefined;
      try {
        info = JSON.parse(event.data).info;
      } catch {
        return;
      }
      if (!info || typeof info !== 'object') return;
      if (typeof info.duration === 'number' && info.duration > 0) duration = info.duration;
      if (typeof info.playerState === 'number') state = info.playerState;
      const nearEnd = duration > 0 && typeof info.currentTime === 'number' && info.currentTime >= duration - END_COVER_SECONDS;
      if (!restarting && (nearEnd || state === ENDED)) restart();
      else update();
    }

    function onLoad() {
      send({ event: 'listening', id: 'aureum-film', channel: 'widget' });
      hideCaptions();
      later(() => {
        introDone = true;
        update();
      }, YOUTUBE_REVEAL_DELAY_MS);
      // If the player never reports its state, show the film anyway rather than hiding it for good.
      later(() => {
        if (state !== -1) return;
        state = PLAYING;
        update();
      }, YOUTUBE_REVEAL_DELAY_MS + 3000);
    }

    const frame = frameRef.current;
    window.addEventListener('message', onMessage);
    frame?.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('message', onMessage);
      frame?.removeEventListener('load', onLoad);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [onVisibleChange]);

  return <iframe ref={frameRef} src={src} title={BRAND_FILM.title} tabIndex={-1} allow="autoplay; encrypted-media" />;
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
