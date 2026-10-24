export const NEWS_ITEMS = [
  {
    title: 'Aureum Mall Residences Groundbreaking on 1 October 2026: The Future Takes Shape',
    slug: 'aureum-mall-residences-groundbreaking-on-1-october-2026-the-future-takes-shape',
    date: '1 October 2026',
    summary: 'Construction update for Aureum Mall & Residences as the project takes shape.',
    href: '/construction-updates',
    cta: 'Read project updates',
  },
  {
    title: 'Aureum Mall Residences Location: Ring Road Connectivity',
    slug: 'aureum-mall-residences-location-ring-road',
    date: '2026',
    summary: 'Location context for Aureum Mall & Residences in Bahria Town Lahore.',
    href: '/location',
    cta: 'Explore the location',
  },
  {
    title: 'Aureum Mall Residences Payment Plan',
    slug: 'aureum-mall-residences-payment-plan',
    date: '2026',
    summary: 'Understand the payment plan and the route to current project details.',
    href: '/payment-plans',
    cta: 'View payment plans',
  },
] as const;

export type NewsItem = (typeof NEWS_ITEMS)[number];
