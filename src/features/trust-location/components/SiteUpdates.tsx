'use client';

import { ANALYTICS_EVENTS } from '@/features/content-seo/data';
import { track } from '@/lib/analytics';
import { GROUNDBREAKING, SITE_UPDATES, type SiteUpdate } from '../site-updates';

// Only one site video plays at a time.
function pauseOthers(current: HTMLVideoElement) {
  document.querySelectorAll<HTMLVideoElement>('video[data-site-update]').forEach((video) => {
    if (video !== current) video.pause();
  });
}

function SiteVideo({ update }: { update: SiteUpdate }) {
  return (
    <video
      data-site-update={update.id}
      src={update.video}
      poster={update.poster}
      controls
      playsInline
      preload="none"
      controlsList="nodownload"
      aria-label={`Site update, ${update.dateLabel}: ${update.title}`}
      onPlay={(event) => {
        pauseOthers(event.currentTarget);
        track(ANALYTICS_EVENTS.mediaOpen, { media: 'site_update', update: update.id });
      }}
    />
  );
}

function UpdateCard({ update }: { update: SiteUpdate }) {
  return (
    <article className="siteUpdateCard">
      <div className="siteUpdateVideo">
        <SiteVideo update={update} />
      </div>
      <time dateTime={update.date}>{update.dateLabel}</time>
      <h3>{update.title}</h3>
      <p>{update.summary}</p>
    </article>
  );
}

/** Dated site footage: the latest update featured, earlier ones as cards, ending at the groundbreaking. */
export function SiteUpdates({ limit }: { limit?: number }) {
  const [latest, ...earlier] = SITE_UPDATES;
  const shown = limit === undefined ? earlier : earlier.slice(0, Math.max(0, limit - 1));

  return (
    <div className="siteUpdates">
      <article className="siteUpdateFeatured">
        <div className="siteUpdateVideo">
          <SiteVideo update={latest} />
        </div>
        <div className="siteUpdateFeaturedCopy">
          <p className="siteUpdateBadge">Latest from site · {latest.duration}</p>
          <time dateTime={latest.date}>{latest.dateLabel}</time>
          <h3>{latest.title}</h3>
          <p>{latest.summary}</p>
          <p className="siteUpdateCount">{SITE_UPDATES.length} video updates since the groundbreaking on {GROUNDBREAKING.dateLabel}.</p>
        </div>
      </article>

      {shown.length ? (
        <div className="siteUpdateGrid">
          {shown.map((update) => <UpdateCard key={update.id} update={update} />)}
        </div>
      ) : null}

      {limit === undefined ? (
        <div className="siteMilestone">
          <time dateTime={GROUNDBREAKING.date}>{GROUNDBREAKING.dateLabel}</time>
          <div>
            <h3>{GROUNDBREAKING.title}</h3>
            <p>{GROUNDBREAKING.summary}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
