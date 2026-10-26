// 301/308 redirects from the old WordPress site (aureummall.info) to the new URLs.
// Next.js first strips trailing slashes ("/about/" → "/about"), so each rule only needs the slash-less form.
// Source: Redirect Map tab of the SEO master plan + every post published on WordPress (39, exported 26 Oct 2026).
// Add any other URL that Search Console → Pages shows as indexed.

/** Blog posts: old root-level permalinks → /news/<slug>. */
const POST_REDIRECTS = [
  { source: '/buying-apartments-bahria-town-lahore', destination: '/news/buying-apartments-bahria-town-lahore', permanent: true },
  { source: '/high-rise-apartments-lahore', destination: '/news/high-rise-apartments-lahore', permanent: true },
  { source: '/commercial-property-bahria-town-lahore', destination: '/news/commercial-property-bahria-town-lahore', permanent: true },
  { source: '/mixed-use-development-benefits', destination: '/news/mixed-use-development-benefits', permanent: true },
  { source: '/food-courts-lahore-property-value', destination: '/news/food-courts-lahore-property-value', permanent: true },
  { source: '/apartment-investment-pakistan-roi', destination: '/news/apartment-investment-pakistan-roi', permanent: true },
  { source: '/rental-income-lahore-apartments', destination: '/news/rental-income-lahore-apartments', permanent: true },
  { source: '/bahria-town-investment-guide', destination: '/news/bahria-town-investment-guide', permanent: true },
  { source: '/luxury-apartments-lahore-features', destination: '/news/luxury-apartments-lahore-features', permanent: true },
  { source: '/commercial-outlets-high-rise-benefits', destination: '/news/commercial-outlets-high-rise-benefits', permanent: true },
  { source: '/family-apartments-buying-guide', destination: '/news/family-apartments-buying-guide', permanent: true },
  { source: '/amenities-in-apartments-property-value', destination: '/news/amenities-in-apartments-property-value', permanent: true },
  { source: '/aureum-mall-residences-grand-launch', destination: '/news/aureum-mall-residences-grand-launch', permanent: true },
  { source: '/investment-guide-lahore', destination: '/news/investment-guide-lahore', permanent: true },
  { source: '/apartment-financing-installment-plans', destination: '/news/apartment-financing-installment-plans', permanent: true },
  { source: '/roi-apartments-pakistan', destination: '/news/roi-apartments-pakistan', permanent: true },
  { source: '/food-business-mixed-use-projects', destination: '/news/food-business-mixed-use-projects', permanent: true },
  { source: '/complete-lifestyle', destination: '/news/complete-lifestyle', permanent: true },
  { source: '/real-estate-trends-lahore-2026', destination: '/news/real-estate-trends-lahore-2026', permanent: true },
  { source: '/property-appreciation-factors', destination: '/news/property-appreciation-factors', permanent: true },
  { source: '/office-spaces-lahore-modern-commercial-towers', destination: '/news/office-spaces-lahore-modern-commercial-towers', permanent: true },
  { source: '/bahria-town-lifestyle-guide', destination: '/news/bahria-town-lifestyle-guide', permanent: true },
  { source: '/smart-apartment-features', destination: '/news/smart-apartment-features', permanent: true },
  { source: '/apartment-security-features', destination: '/news/apartment-security-features', permanent: true },
  { source: '/high-rise-investment-guide', destination: '/news/high-rise-investment-guide', permanent: true },
  { source: '/commercial-investment-long-term-wealth', destination: '/news/commercial-investment-long-term-wealth', permanent: true },
  { source: '/real-estate-mistakes-property-buyers', destination: '/news/real-estate-mistakes-property-buyers', permanent: true },
  { source: '/apartment-buying-guide-checklist', destination: '/news/apartment-buying-guide-checklist', permanent: true },
  { source: '/bahria-town-ring-road-property-values', destination: '/news/bahria-town-ring-road-property-values', permanent: true },
  { source: '/mixed-use-projects-lahore-urban-living', destination: '/news/mixed-use-projects-lahore-urban-living', permanent: true },
  { source: '/apartment-resale-value-tips', destination: '/news/apartment-resale-value-tips', permanent: true },
  { source: '/aureum-mall-residences-lifestyle-destination', destination: '/news/aureum-mall-lifestyle-destination', permanent: true },
  { source: '/aureum-mall-residences-project-guide', destination: '/news/aureum-mall-residences-project-guide', permanent: true },
  { source: '/aureum-mall-residences-payment-plan', destination: '/news/aureum-mall-payment-plan-explained', permanent: true },
  { source: '/aureum-mall-residences-location-ring-road', destination: '/news/aureum-mall-location-ring-road-connectivity', permanent: true },
  { source: '/aureum-mall-residences-groundbreaking-on-1-october-2026-the-future-takes-shape', destination: '/news/aureum-mall-groundbreaking-1-october-2026', permanent: true },
  { source: '/why-the-ring-road-interchange-is-a-smart-address-for-your-business', destination: '/news/why-the-ring-road-interchange-is-a-smart-address-for-your-business', permanent: true },
  { source: '/own-or-rent-why-more-lahore-businesses-are-buying-their-office', destination: '/news/own-or-rent-why-more-lahore-businesses-are-buying-their-office', permanent: true },
  { source: '/studio-one-bedroom-or-two-bedroom-choosing-the-right-apartment-for-you', destination: '/news/studio-one-bedroom-or-two-bedroom-choosing-the-right-apartment-for-you', permanent: true },
];

/** WordPress archive and system URLs. */
const ARCHIVE_REDIRECTS = [
  { source: '/author/:path*', destination: '/news', permanent: true },
  { source: '/tag/:path*', destination: '/news', permanent: true },
  { source: '/category/:path*', destination: '/news', permanent: true },
  { source: '/blog', destination: '/news', permanent: true },
  { source: '/blogs', destination: '/news', permanent: true },
  { source: '/feed', destination: '/news', permanent: true },
  { source: '/news/page/:page(\\d+)', destination: '/news', permanent: true },
  { source: '/page/:page(\\d+)', destination: '/news', permanent: true },
];

/**
 * The 125 MB project profile PDF is not deployed (too large). Until a compressed copy is added to
 * public/downloads/, send old links to the payment plans page instead of a 404. Temporary on purpose.
 */
const FILE_REDIRECTS = [
  { source: '/wp-content/uploads/2026/08/Aureum-Project-Profile.pdf', destination: '/payment-plans', permanent: false },
];

export const WORDPRESS_REDIRECTS = [...POST_REDIRECTS, ...ARCHIVE_REDIRECTS, ...FILE_REDIRECTS];
