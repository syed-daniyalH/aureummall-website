export type SiteUpdate = {
  id: string;
  /** ISO date, used for <time> and ordering. */
  date: string;
  dateLabel: string;
  title: string;
  summary: string;
  video: string;
  poster: string;
  duration: string;
};

const base = '/video/site';

// Site footage from the Aureum team's construction reels (720 × 1280, with sound), newest first.
// 11 October is dated in the video itself; the other dates are when each reel was produced. Confirm before changing.
export const SITE_UPDATES: readonly SiteUpdate[] = [
  {
    id: '2026-10-27',
    date: '2026-10-27',
    dateLabel: '27 October 2026',
    title: 'Inside the excavation',
    summary: 'A walk through the deepening excavation with the Aureum team, and a reminder of the shops and the 1% monthly instalment plan.',
    video: `${base}/aureum-site-2026-10-27.mp4`,
    poster: `${base}/aureum-site-2026-10-27.webp`,
    duration: '0:59',
  },
  {
    id: '2026-10-24',
    date: '2026-10-24',
    dateLabel: '24 October 2026',
    title: 'Excavators at work',
    summary: 'Excavators continue across the site, with a walk-through from the Aureum team.',
    video: `${base}/aureum-site-2026-10-24.mp4`,
    poster: `${base}/aureum-site-2026-10-24.webp`,
    duration: '1:17',
  },
  {
    id: '2026-10-23',
    date: '2026-10-23',
    dateLabel: '23 October 2026',
    title: 'Day and night on site',
    summary: 'A site visit in safety gear, work continuing after dark, and an aerial view of the excavation beside the Ring Road Interchange.',
    video: `${base}/aureum-site-2026-10-23.mp4`,
    poster: `${base}/aureum-site-2026-10-23.webp`,
    duration: '0:31',
  },
  {
    id: '2026-10-11',
    date: '2026-10-11',
    dateLabel: '11 October 2026',
    title: 'Excavation under way',
    summary: 'Excavators load dumpers as digging spreads across the site.',
    video: `${base}/aureum-site-2026-10-11.mp4`,
    poster: `${base}/aureum-site-2026-10-11.webp`,
    duration: '0:14',
  },
  {
    id: '2026-10-05',
    date: '2026-10-05',
    dateLabel: '5 October 2026',
    title: 'Hoarding up, digging begins',
    summary: 'Site hoarding goes up along the boundary and the first excavators start clearing the ground.',
    video: `${base}/aureum-site-2026-10-05.mp4`,
    poster: `${base}/aureum-site-2026-10-05.webp`,
    duration: '0:24',
  },
];

export const GROUNDBREAKING = {
  date: '2026-10-01',
  dateLabel: '1 October 2026',
  title: 'Groundbreaking',
  summary: 'Construction of Aureum Mall & Residences began with the groundbreaking at the Bahria Town Ring Road Interchange.',
} as const;
