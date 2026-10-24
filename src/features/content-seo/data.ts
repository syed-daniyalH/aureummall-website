export type SeoRouteContract = {
  route: string;
  intent: string;
  title: string;
  description: string;
  canonical: string;
  indexable: boolean;
  changeFrequency: 'weekly' | 'monthly';
  priority: number;
};

export const SEO_ROUTE_CONTRACTS: readonly SeoRouteContract[] = [
  { route: '/', intent: 'Project overview', title: 'Aureum Mall & Residences | Bahria Town Lahore', description: 'Explore Aureum Mall & Residences in Bahria Town Lahore: apartments, commercial shops, corporate offices, payment plans, location and project updates.', canonical: '/', indexable: true, changeFrequency: 'weekly', priority: 1 },
  { route: '/about', intent: 'About the project', title: 'About Aureum Mall & Residences', description: 'Learn about Aureum Mall & Residences, the mixed-use destination at Bahria Town Ring Road Interchange, Lahore.', canonical: '/about', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/gallery', intent: 'Explore project visuals', title: 'Gallery | Aureum Mall & Residences', description: 'Explore Aureum Mall project visuals, payment-plan artwork, floor plans and neighbourhood context.', canonical: '/gallery', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/news', intent: 'Read project updates', title: 'News & Insights | Aureum Mall & Residences', description: 'Read Aureum Mall & Residences project news, location context and payment-plan guidance.', canonical: '/news', indexable: true, changeFrequency: 'weekly', priority: 0.7 },
  { route: '/unit-finder', intent: 'Find a property pathway', title: 'Find Your Space | Aureum Mall & Residences', description: 'Explore Aureum apartments, commercial shops and corporate offices, then contact the team for current details.', canonical: '/unit-finder', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/building-explorer', intent: 'Understand the building', title: 'Building Explorer', description: 'Explore Aureum by residential, retail and office layers with an accessible building interaction.', canonical: '/building-explorer', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/immersive-media', intent: 'Explore project media', title: 'Project Media | Aureum Mall & Residences', description: 'Explore Aureum project imagery, film and floor plans with accessible text descriptions.', canonical: '/immersive-media', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/apartments', intent: 'Explore residences', title: 'Apartments for Sale in Bahria Town Lahore', description: 'Explore Aureum apartment layouts, sizes, payment plans and enquiry options.', canonical: '/apartments', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/commercial-shops', intent: 'Explore commercial retail', title: 'Commercial Shops for Sale in Lahore', description: 'Explore Aureum commercial shop sizes, floors, payment plans and enquiry options.', canonical: '/commercial-shops', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/corporate-offices', intent: 'Explore office space', title: 'Corporate Offices in Bahria Town Lahore', description: 'Explore Aureum corporate office sizes, payment plans and enquiry options.', canonical: '/corporate-offices', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/payment-plans', intent: 'Understand payment structure', title: 'Payment Plan 2026 | Aureum Mall & Residences', description: 'Read the Aureum Project Profile Payment Plan 2026 in accessible HTML tables for apartments, offices and shops.', canonical: '/payment-plans', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/location', intent: 'Verify location and trust information', title: 'Location & Trust', description: 'Explore Aureum location facts, verified progress, approval references and evidence-first project answers.', canonical: '/location', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/construction-updates', intent: 'Review project progress', title: 'Construction Updates', description: 'Follow Aureum Mall & Residences project progress and the latest public updates.', canonical: '/construction-updates', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/contact', intent: 'Contact the project team', title: 'Contact', description: 'Contact the Aureum Mall & Residences project team for current availability, pricing and project information.', canonical: '/contact', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
];

export const ANALYTICS_EVENTS = {
  pageView: 'page_view',
  formStart: 'form_start',
  formSubmitAttempt: 'form_submit_attempt',
  leadSuccess: 'lead_success',
  unitFinderFilter: 'unit_finder_filter',
  unitFinderShare: 'unit_finder_share',
  mediaOpen: 'media_open',
  faqExpand: 'faq_expand',
  locationMapOpen: 'location_map_open',
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export function getSeoRouteContract(route: string) {
  const normalized = route === '' ? '/' : route;
  return SEO_ROUTE_CONTRACTS.find((contract) => contract.route === normalized);
}
