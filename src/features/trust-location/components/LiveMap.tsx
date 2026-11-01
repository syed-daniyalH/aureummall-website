import { SITE } from '@/lib/site';

/** Live Google Map of the project; the browser loads it only as it scrolls into view. */
export function LiveMap({ className = '' }: { className?: string }) {
  return (
    <figure className={`liveMap ${className}`.trim()}>
      <iframe src={SITE.mapEmbedUrl} title="Map of Aureum Mall & Residences, Bahria Town Lahore" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      <figcaption>
        <span>{SITE.location}</span>
        <a href={SITE.directionsUrl} target="_blank" rel="noopener">Get directions <span aria-hidden="true">↗</span></a>
      </figcaption>
    </figure>
  );
}
