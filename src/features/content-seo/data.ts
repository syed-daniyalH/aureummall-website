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
  { route: '/immersive-media', intent: 'Explore project media', title: 'Project Media | Aureum Mall & Residences', description: 'Take the Aureum 360° virtual tour and explore project imagery and floor plans with accessible text descriptions.', canonical: '/immersive-media', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/apartments', intent: 'Explore residences', title: 'Apartments for Sale in Bahria Town Lahore', description: 'Explore Aureum apartment layouts, sizes, payment plans and enquiry options.', canonical: '/apartments', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/commercial-shops', intent: 'Explore commercial retail', title: 'Commercial Shops for Sale in Lahore', description: 'Explore Aureum commercial shop sizes, floors, payment plans and enquiry options.', canonical: '/commercial-shops', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/corporate-offices', intent: 'Explore office space', title: 'Corporate Offices in Bahria Town Lahore', description: 'Explore Aureum corporate office sizes, payment plans and enquiry options.', canonical: '/corporate-offices', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/apartments/studio', intent: 'Explore studio apartments', title: 'Studio Apartments in Bahria Town Lahore', description: 'Explore the Aureum studio apartment pathway and request current layout, availability and payment details.', canonical: '/apartments/studio', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/apartments/1-bed', intent: 'Explore one bedroom apartments', title: '1 Bed Apartments in Bahria Town Lahore', description: 'Explore the Aureum one bedroom apartment pathway and request current layout, availability and payment details.', canonical: '/apartments/1-bed', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/apartments/2-bed', intent: 'Explore two bedroom apartments', title: '2 Bed Apartments in Bahria Town Lahore', description: 'Explore the Aureum two bedroom apartment pathway and request current layout, availability and payment details.', canonical: '/apartments/2-bed', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/commercial-shops/ground-floor', intent: 'Explore ground floor shops', title: 'Ground Floor Shops at Aureum Mall', description: 'Explore the ground floor retail pathway at Aureum Mall and request current unit information.', canonical: '/commercial-shops/ground-floor', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/commercial-shops/first-floor', intent: 'Explore first floor shops', title: 'First Floor Shops at Aureum Mall', description: 'Explore the first floor retail pathway at Aureum Mall and request current unit information.', canonical: '/commercial-shops/first-floor', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/food-court', intent: 'Explore food court space', title: 'Food Court Opportunities at Aureum Mall', description: 'Explore the Aureum food court pathway and request current information for your business plans.', canonical: '/food-court', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/floor-plans', intent: 'Explore floor plans', title: 'Floor Plans | Aureum Mall & Residences', description: 'Review Aureum floor plan pathways and contact the team for current drawings and unit details.', canonical: '/floor-plans', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/amenities', intent: 'Explore amenities', title: 'Amenities | Aureum Mall & Residences', description: 'Explore the everyday amenities and shared spaces planned for Aureum Mall & Residences.', canonical: '/amenities', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/overseas-buyers', intent: 'Support overseas buyers', title: 'Overseas Buyers | Aureum Mall & Residences', description: 'Request clear project information and a guided enquiry pathway from overseas.', canonical: '/overseas-buyers', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/investment', intent: 'Explore investment pathways', title: 'Investment Pathways | Aureum Mall & Residences', description: 'Explore residential, retail and office investment pathways and request current project information.', canonical: '/investment', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/faq', intent: 'Answer project questions', title: 'FAQ | Aureum Mall & Residences', description: 'Find clear answers about Aureum Mall & Residences, payment plans, location and site visits.', canonical: '/faq', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/partners', intent: 'Support sales partners', title: 'Sales Partners | Aureum Mall & Residences', description: 'Contact the Aureum team about sales partner information and current project materials.', canonical: '/partners', indexable: true, changeFrequency: 'monthly', priority: 0.6 },
  { route: '/book-site-visit', intent: 'Book a site visit', title: 'Book a Site Visit | Aureum Mall & Residences', description: 'Request a focused visit to Aureum Mall & Residences and share your preferred timing.', canonical: '/book-site-visit', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/privacy-policy', intent: 'Read privacy policy', title: 'Privacy Policy | Aureum Mall & Residences', description: 'Read how Aureum handles information shared through the website.', canonical: '/privacy-policy', indexable: true, changeFrequency: 'monthly', priority: 0.3 },
  { route: '/terms', intent: 'Read terms and disclaimer', title: 'Terms & Disclaimer | Aureum Mall & Residences', description: 'Read the website terms and project information disclaimer.', canonical: '/terms', indexable: true, changeFrequency: 'monthly', priority: 0.3 },
  { route: '/payment-plans', intent: 'Understand payment structure', title: 'Payment Plan 2026 | Aureum Mall & Residences', description: 'Read the Aureum Project Profile Payment Plan 2026 in accessible HTML tables for apartments, offices and shops.', canonical: '/payment-plans', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/location', intent: 'Verify location and trust information', title: 'Location & Trust', description: 'Explore Aureum location facts, verified progress, approval references and evidence-first project answers.', canonical: '/location', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/construction-updates', intent: 'Review project progress', title: 'Construction Updates', description: 'Follow Aureum Mall & Residences project progress and the latest public updates.', canonical: '/construction-updates', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/contact', intent: 'Contact the project team', title: 'Contact', description: 'Contact the Aureum Mall & Residences project team for current availability, pricing and project information.', canonical: '/contact', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/thank-you', intent: 'Confirm an enquiry was received', title: 'Thank You', description: 'Your enquiry has reached the Aureum Mall & Residences sales team.', canonical: '/thank-you', indexable: false, changeFrequency: 'monthly', priority: 0 },
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
  formSubmit: 'form_submit',
  formError: 'form_error',
  whatsappClick: 'whatsapp_click',
  callClick: 'call_click',
  brochureDownload: 'brochure_download',
  virtualTourOpen: 'virtual_tour_open',
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export function getSeoRouteContract(route: string) {
  const normalized = route === '' ? '/' : route;
  return SEO_ROUTE_CONTRACTS.find((contract) => contract.route === normalized);
}
