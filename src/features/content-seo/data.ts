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
  { route: '/unit-finder', intent: 'Find a space', title: 'Find Your Space | Aureum Mall & Residences', description: 'Explore Aureum apartments, commercial shops and corporate offices, then contact the team for current details.', canonical: '/unit-finder', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/building-explorer', intent: 'Understand the building', title: 'Building Explorer', description: 'Explore Aureum Mall & Residences level by level: floor plans, unit sizes and base prices from the basements to the residences.', canonical: '/building-explorer', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/immersive-media', intent: 'Explore project media', title: 'Project Media | Aureum Mall & Residences', description: 'Take the Aureum 360° virtual tour and explore project imagery and floor plans with accessible text descriptions.', canonical: '/immersive-media', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/apartments', intent: 'Explore residences', title: 'Apartments for Sale in Bahria Town Lahore', description: 'Explore Aureum studios, 1 and 2-bed apartments from 426 to 1,316 sq ft and premium Signature Glass Apartments of 1,491 and 1,727 sq ft, with prices and payment plans.', canonical: '/apartments', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/commercial-shops', intent: 'Explore commercial retail', title: 'Commercial Shops for Sale in Lahore', description: 'Explore Aureum shops from 172 sq ft, food court units, floor plans and current payment-plan pricing in Bahria Town Lahore.', canonical: '/commercial-shops', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/corporate-offices', intent: 'Explore office space', title: 'Corporate Offices in Bahria Town Lahore', description: 'Explore Aureum corporate offices from 1,007 to 2,595 sq ft at PKR 25,000 per sq ft, with a lifetime amenities membership.', canonical: '/corporate-offices', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/apartments/studio', intent: 'Explore studio apartments', title: 'Studio Apartments in Bahria Town Lahore', description: 'Studio apartments of 426 sq ft at Aureum, Bahria Town Lahore, from PKR 8,733,000 with a 4.5-year payment plan and 10% booking.', canonical: '/apartments/studio', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/apartments/1-bed', intent: 'Explore one bedroom apartments', title: '1 Bed Apartments in Bahria Town Lahore', description: 'Outer-facing one-bedroom apartments of 622 and 658 sq ft at Aureum, Bahria Town Lahore, from PKR 13,373,000 with a 4.5-year payment plan.', canonical: '/apartments/1-bed', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/apartments/2-bed', intent: 'Explore two bedroom apartments', title: '2 Bed Apartments in Bahria Town Lahore', description: 'Two-bedroom apartments of 1,103 sq ft, or 1,316 sq ft with a servant quarter, at Aureum, Bahria Town Lahore, from PKR 23,714,500 on a 4.5-year plan.', canonical: '/apartments/2-bed', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/commercial-shops/ground-floor', intent: 'Explore ground floor shops', title: 'Ground Floor Shops at Aureum Mall', description: 'Large-format retail and showroom space on the 26 ft ground floor of Aureum Mall, Bahria Town Lahore. Prices on request.', canonical: '/commercial-shops/ground-floor', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/commercial-shops/first-floor', intent: 'Explore first floor shops', title: 'First Floor Shops at Aureum Mall', description: 'First-floor shops of 172 to 707 sq ft at Aureum Mall, Bahria Town Lahore, from PKR 8,600,000 at PKR 50,000 per sq ft.', canonical: '/commercial-shops/first-floor', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/food-court', intent: 'Explore food court space', title: 'Food Court Opportunities at Aureum Mall', description: '301 sq ft food court units from PKR 22,575,000 beside the playland and trampoline park at Aureum Mall, Bahria Town Lahore.', canonical: '/food-court', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/floor-plans', intent: 'Explore floor plans', title: 'Floor Plans | Aureum Mall & Residences', description: 'Current project floor plans for every level of Aureum Mall & Residences, from the parking basements to the residential and office floors, subject to final approval.', canonical: '/floor-plans', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/amenities', intent: 'Explore amenities', title: 'Amenities | Aureum Mall & Residences', description: 'Explore the everyday amenities and shared spaces planned for Aureum Mall & Residences.', canonical: '/amenities', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/overseas-buyers', intent: 'Support overseas buyers', title: 'Overseas Buyers | Aureum Mall & Residences', description: 'Buying at Aureum Mall & Residences from abroad: current prices, payment plans and a direct line to the sales team.', canonical: '/overseas-buyers', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/investment', intent: 'Explore investment options', title: 'Invest in Aureum | Aureum Mall & Residences', description: 'Apartments, shops and offices at Aureum Mall & Residences, Bahria Town Lahore, with catalogue prices and payment plans. No guaranteed returns.', canonical: '/investment', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/faq', intent: 'Answer project questions', title: 'FAQ | Aureum Mall & Residences', description: 'Find clear answers about Aureum Mall & Residences, payment plans, location and site visits.', canonical: '/faq', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/partners', intent: 'Support sales partners', title: 'Sales Partners | Aureum Mall & Residences', description: 'Contact the Aureum team about sales partner information and current project materials.', canonical: '/partners', indexable: true, changeFrequency: 'monthly', priority: 0.6 },
  { route: '/book-site-visit', intent: 'Book a site visit', title: 'Book a Site Visit | Aureum Mall & Residences', description: 'Request a focused visit to Aureum Mall & Residences and share your preferred timing.', canonical: '/book-site-visit', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/privacy-policy', intent: 'Read privacy policy', title: 'Privacy Policy | Aureum Mall & Residences', description: 'Read how Aureum handles information shared through the website.', canonical: '/privacy-policy', indexable: true, changeFrequency: 'monthly', priority: 0.3 },
  { route: '/terms', intent: 'Read terms and disclaimer', title: 'Terms & Disclaimer | Aureum Mall & Residences', description: 'Read the website terms and project information disclaimer.', canonical: '/terms', indexable: true, changeFrequency: 'monthly', priority: 0.3 },
  { route: '/payment-plans', intent: 'Understand payment structure', title: 'Payment Plan 2026 | Aureum Mall & Residences', description: 'Aureum payment plans: studios from PKR 8.733M, offices at PKR 25,000/sq ft and first-floor shops from PKR 8.6M, with 10% booking.', canonical: '/payment-plans', indexable: true, changeFrequency: 'monthly', priority: 0.8 },
  { route: '/payment-plans/apartments', intent: 'Apartment payment plan', title: 'Apartments Payment Plan | Aureum Mall & Residences', description: 'Aureum apartment payment plan: studios from PKR 8,733,000, 1 and 2-bed and Signature Glass Apartments, 10% booking and a 4.5-year plan.', canonical: '/payment-plans/apartments', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/payment-plans/offices', intent: 'Office payment plan', title: 'Corporate Offices Payment Plan | Aureum Mall', description: 'Aureum corporate office payment plan: 1,007 to 2,595 sq ft at PKR 25,000 per sq ft, from PKR 25,175,000, 10% booking and a 4.5-year plan.', canonical: '/payment-plans/offices', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/payment-plans/first-floor-shops', intent: 'First floor shop payment plan', title: 'First Floor Shops Payment Plan | Aureum Mall', description: 'Aureum first-floor shop payment plan: 172 to 707 sq ft at PKR 50,000 per sq ft, from PKR 8,600,000, on a 3.5-year plan.', canonical: '/payment-plans/first-floor-shops', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/payment-plans/second-floor-shops', intent: 'Second floor shop payment plan', title: 'Second Floor Shops Payment Plan | Aureum Mall', description: 'Aureum second-floor shop payment plan: 478 to 643 sq ft at PKR 42,500 per sq ft, from PKR 20,315,000, on a 3.5-year plan.', canonical: '/payment-plans/second-floor-shops', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
  { route: '/payment-plans/food-court', intent: 'Food court payment plan', title: 'Food Court Payment Plan | Aureum Mall', description: 'Aureum food court payment plan: 301 sq ft third-floor units at PKR 75,000 per sq ft, from PKR 22,575,000, on a 3.5-year plan.', canonical: '/payment-plans/food-court', indexable: true, changeFrequency: 'monthly', priority: 0.7 },
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
  priceCalculatorSelect: 'price_calculator_select',
  scheduleDownload: 'payment_schedule_download',
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export function getSeoRouteContract(route: string) {
  const normalized = route === '' ? '/' : route;
  return SEO_ROUTE_CONTRACTS.find((contract) => contract.route === normalized);
}
