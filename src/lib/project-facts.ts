// Project facts transcribed from the Aureum catalogue, category brochures and factsheet (November 2026).
// Keep every public number here so pages never drift from the approved sales material.

export const DEVELOPER = {
  name: 'Alfalah Real Estate & Builders',
  shortName: 'AREB',
  logo: '/assets/aureum/approved/developer/areb-logo.webp',
  summary:
    'Alfalah Real Estate & Builders is transforming urban landscapes across Karachi and Lahore. With three landmark developments delivered in Bahria Town Karachi, Alfalah brings proven experience in commercial, retail and residential towers to its most ambitious project yet: Aureum Mall & Residences.',
  stats: [
    ['3', 'Landmark projects in Karachi'],
    ['95%', 'Occupancy across completed projects'],
    ['2', 'Cities: Karachi & Lahore'],
  ],
  // Photos and highlights from the catalogue's portfolio page ("Landmarks that define Karachi").
  portfolio: [
    {
      name: 'Alfalah Tower',
      detail: 'Commercial & retail hub, Bahria Town Karachi',
      image: '/assets/aureum/approved/developer/alfalah-tower-karachi.jpg',
      highlights: ['Ground-level retail spaces', 'Premium bank offices', 'Restaurant and F&B outlets', 'Modern glass façade'],
    },
    {
      name: 'Liberty Clock Tower',
      detail: 'Iconic mixed-use development, Bahria Town Karachi',
      image: '/assets/aureum/approved/developer/liberty-clock-tower-karachi.jpg',
      highlights: ['Curved contemporary architecture', 'Residential towers above a retail complex', 'Signature clock tower', 'A recognised Karachi landmark'],
    },
    {
      name: 'Maison Theme Heights',
      detail: 'Residential tower facing the Theme Park, Bahria Town Karachi',
      image: '/assets/aureum/approved/developer/maison-theme-heights-karachi.jpg',
      highlights: ['Location on the main boulevard', 'Smart home integration', 'Spacious unit layouts', 'Premium amenities and facilities'],
    },
  ],
} as const;

/** The people who lead the developer and the project, shown on the About page. */
export const LEADERSHIP = [
  {
    name: 'Mian Muhammad Ashraf',
    role: 'Chairman',
    organisations: ['Alfalah Real Estate & Builders', 'Aureum Mall & Residences'],
    bio: 'Mian Muhammad Ashraf leads Alfalah Real Estate & Builders, the developer behind three landmark projects in Bahria Town Karachi. As chairman, he brings that record of delivered commercial, retail and residential towers to Aureum Mall & Residences, the group’s most ambitious project yet, at the Bahria Town Ring Road Interchange in Lahore.',
    image: { src: '/assets/aureum/approved/leadership/mian-muhammad-ashraf-chairman.jpg', alt: 'Mian Muhammad Ashraf, Chairman of Alfalah Real Estate & Builders and Aureum Mall & Residences, at his desk', position: '57% 30%', zoom: 1 },
    inset: { src: '/assets/aureum/approved/leadership/mian-muhammad-ashraf-event.webp', alt: 'Mian Muhammad Ashraf at an Aureum event', position: '50% 25%' },
  },
  {
    name: 'Mian Waqas Ashraf',
    role: 'Chief Executive Officer',
    organisations: ['Aureum Mall & Residences'],
    bio: 'Mian Waqas Ashraf leads the Aureum Mall & Residences project team as chief executive, taking the development from its groundbreaking on 1 October 2026 through construction to handover, and building the mall, offices and residences around the people who will shop, work and live there.',
    image: { src: '/assets/aureum/approved/leadership/mian-waqas-ashraf-ceo.webp', alt: 'Portrait of Mian Waqas Ashraf, Chief Executive Officer of Aureum Mall & Residences', position: '50% 0%', zoom: 1.1 },
    inset: null,
  },
] as const;

/** The current main sales and project team, sourced from the named photos in team/2026. */
export type TeamMember = {
  id: string;
  name: string | null;
  role: string | null;
  image: string;
  position?: string;
  /** Crop zoom used to bring full-body source portraits into the shared card framing. */
  imageZoom?: number;
  /** 'gold' tints a black-and-white source photo in the Aureum champagne-gold duotone. */
  tone?: 'gold';
  /** What the person handles, e.g. "Apartments", "Overseas buyers". Shown on the Team page. */
  focus?: readonly string[];
  languages?: readonly string[];
  /** Their own WhatsApp number in international digits (923001234567); the main sales line otherwise. */
  whatsapp?: string;
  /** A short role-aligned line shown on the Team page. */
  quote?: string;
};

const TEAM_PHOTOS = '/assets/aureum/approved/team/2026';

export const TEAM: readonly TeamMember[] = [
  { id: 'arslan-ayub', name: 'Arslan Ayub', role: 'Marketing Head', image: `${TEAM_PHOTOS}/Marketing Head (Arslan Ayub).jpg`, quote: 'A strong brand gives every visit, every message and every detail a clear sense of place.' },
  { id: 'dua-rana', name: 'Dua Rana', role: 'Sales Manager', image: `${TEAM_PHOTOS}/Sales Manager Dua Rana.jpg`, quote: 'A good sales experience begins with listening, then turns the right question into the right opportunity.' },
  { id: 'hamzah-mughal', name: 'Hamzah Mughal', role: 'Senior Graphic Designer', image: `${TEAM_PHOTOS}/Senior Graphic Designer (Hamzah Mughal).jpeg`, quote: 'Good design makes the value of a place visible before a client ever steps inside.' },
  { id: 'saqib-ali-rao', name: 'Saqib Ali Rao', role: 'Senior Sales Associate', image: `${TEAM_PHOTOS}/(Senior Sales Associate )(Saqib-Ali-Rao).jpeg`, tone: 'gold', quote: 'I look at investment through two lenses: what it is worth today and what it can become tomorrow.' },
  { id: 'umaima-ahsan', name: 'Umaima Ahsan', role: 'Senior Sales Associate', image: `${TEAM_PHOTOS}/(Senior Sales Associate )(Umaima Ahsan).jpg`, imageZoom: 1.12, quote: 'The best conversation starts with understanding what a buyer wants to build, not just what they want to buy.' },
  { id: 'rimsha-khan', name: 'Rimsha Khan', role: 'Senior Sales Associate', image: `${TEAM_PHOTOS}/Senior Sales Associate (Rimsha-Khan).jpg`, quote: 'Clarity turns a first enquiry into a confident decision.' },
  { id: 'tayyab-rabbani', name: 'Tayyab Rabbani', role: 'Senior Sales Associate', image: `${TEAM_PHOTOS}/Tayyab-Rabbani(Senior Sales Associate ).jpg`, quote: 'Every detail matters when a future home or business begins with a conversation.' },
  { id: 'adan-shykh', name: 'Adan Shykh', role: 'Sales Associate', image: `${TEAM_PHOTOS}/Sales Associate (Adan-Shykh).jpg`, quote: 'The right space starts with asking the right questions.' },
  { id: 'haris-ali', name: 'Haris Ali', role: 'Sales Associate', image: `${TEAM_PHOTOS}/Sales Associate Haris Ali).jpg`, quote: 'A thoughtful introduction can turn a property search into a clear next step.' },
  { id: 'ghulam-ahmad', name: 'Ghulam Ahmad', role: 'Sales Associate', image: `${TEAM_PHOTOS}/Sales Associate(Ghulam Ahmad).jpg`, quote: 'Good guidance keeps the search focused on fit, value and the life ahead.' },
  { id: 'saad-amjad', name: 'Saad Amjad', role: 'Sales Associate', image: `${TEAM_PHOTOS}/Sales Associate(Saad Amjad).jpg`, quote: 'Every enquiry deserves a clear answer and a route forward.' },
  { id: 'wali-nasir', name: 'Wali Nasir', role: 'Sales Associate', image: `${TEAM_PHOTOS}/Sales Associate(Wali Nasir).jpeg`, imageZoom: 1.7, position: '50% 30%', quote: 'The best way to represent a place is to understand the people it is meant for.' },
];

/** All named members from the main team folder are published on the site. */
export function visibleTeam() {
  return TEAM;
}

export const PROJECT_STATS = [
  ['16', 'Kanal landmark'],
  ['3', 'Retail levels'],
  ['20+', 'Planned amenities'],
  ['25 min', 'From Lahore airport'],
] as const;

export const BUILDING_LEVELS = [
  { level: 'Residences', detail: 'Apartments, Signature Glass Apartments and offices on the 6th to 12th floors' },
  { level: 'Hotel', detail: 'A luxury hotel with its own entrance lobby' },
  { level: 'Third floor', detail: 'Food court, 11,948 sq ft playland and 6,329 sq ft trampoline park', height: '25 ft' },
  { level: 'Second floor', detail: 'Shops and kiosks around the central atrium', height: '18 ft' },
  { level: 'First floor', detail: 'Shops, kiosks, a 15,224 sq ft grocery store and travelators', height: '18 ft' },
  { level: 'Ground floor', detail: 'Large-format retail, a showroom and the central atrium', height: '26 ft' },
  { level: 'Basements', detail: 'Two levels of car and bike parking' },
] as const;

export const AMENITIES = [
  'Food Court', '24/7 Security', 'Business Centre', 'Kids Club', 'Cinema', 'Conference Hall', 'Gym',
  'High-Speed Elevators', 'Indoor Sports', 'Power Backup', 'Swimming Pool', 'Masjid', 'Libraries',
  'Rooftop Restaurant', 'Sauna', 'Gaming Zone', 'Yoga Centre', 'Spa', 'Trampoline Park', 'Steam Room',
] as const;

export const ACCESS = [
  { title: 'Residences', detail: 'Private entrance, 3 dedicated lifts and a 28 × 50 ft lobby' },
  { title: 'Offices', detail: 'Dedicated entrance lobby and separate elevators' },
  { title: 'Mall', detail: 'Commercial entrance and 2 dedicated elevators' },
  { title: 'Parking', detail: 'Two basements for cars and bikes' },
] as const;

/**
 * The apartment types from the Aureum Catalogue (November 2026). `rowType` links each type to its rows in the
 * apartments price table, so sizes and prices on the page always come from the price list itself.
 */
export const APARTMENT_TYPES = [
  {
    id: 'studio',
    name: 'The Studio',
    rowType: 'Studio',
    premium: false,
    summary: 'A smartly planned open-plan home that combines sleeping, living and storage in one elegant space.',
    idealFor: 'Young professionals, first-time buyers and investors seeking strong rental demand.',
    layout: ['Open-plan bedroom and living area', 'Seating corner beside the window', 'Built-in wardrobe and media wall', 'Kitchenette with full-height storage', 'Private bathroom and balcony'],
  },
  {
    id: 'one-bedroom',
    name: 'The One Bedroom',
    rowType: '1 Bedroom',
    premium: false,
    summary: 'A separate bedroom and a dedicated lounge give privacy and comfort, with an outward-facing aspect.',
    idealFor: 'Couples, professionals working from home and long-term tenants.',
    layout: ['Separate bedroom with window seating', 'Built-in wardrobe and media unit', 'Spacious lounge and living area', 'Private bathroom', 'Balcony access'],
  },
  {
    id: 'two-bedroom',
    name: 'The Two Bedroom',
    rowType: '2 Bedrooms',
    premium: false,
    summary: 'Two en-suite bedrooms frame a generous open living and dining area, planned for family life.',
    idealFor: 'Families, and buyers who want a guest room or study.',
    layout: ['Two bedrooms, each with its own bathroom', 'Bedroom balconies', 'Open-plan living and dining area', 'Separate kitchen', 'Guest washroom'],
  },
  {
    id: 'two-bedroom-servant',
    name: 'The Two Bedroom + Servant Quarter',
    rowType: '2 Bedrooms + Servant Quarter',
    premium: false,
    summary: 'The two-bedroom home with a dedicated servant quarter, for households that want live-in help close at hand.',
    idealFor: 'Larger families and households with live-in staff.',
    layout: ['Two bedrooms, each with its own bathroom', 'Dedicated servant quarter', 'Open-plan living and dining area', 'Separate kitchen', 'Guest washroom'],
  },
  {
    id: 'signature-glass',
    name: 'Signature Glass Apartments',
    rowType: 'Signature Glass',
    premium: true,
    summary: 'Aureum’s most exclusive homes, wrapped in floor-to-ceiling glass, with sweeping views of Lahore and natural light in every room.',
    idealFor: 'Larger families, and buyers who host guests and want the best views in the building.',
    layout: ['The largest homes at Aureum', 'Full-height glass frontage with wide city views', 'Generous living, dining and bedroom space', 'Proportions suited to hosting guests', 'A category of its own, with its own price list'],
  },
] as const;

export type Brochure = {
  id: string;
  title: string;
  description: string;
  file: string;
  cover: string;
  coverAlt: string;
  format: 'Catalogue' | 'Collection' | 'Brochure' | 'Factsheet';
  interest: 'apartment' | 'commercial_shop' | 'corporate_office' | 'other';
};

export const BROCHURES: readonly Brochure[] = [
  {
    id: 'master-catalogue',
    title: 'The Aureum Catalogue',
    description: 'The complete project: location, architecture, retail, dining, offices, residences, amenities, floor plans and pricing.',
    file: '/brochures/aureum-mall-and-residences-catalogue.pdf',
    cover: '/assets/aureum/approved/brochures/aureum-master-catalogue-cover.webp',
    coverAlt: 'Cover of The Aureum Catalogue, showing Aureum Mall and Residences at dusk',
    format: 'Catalogue',
    interest: 'other',
  },
  {
    id: 'residential',
    title: 'The Residential Collection',
    description: 'Every apartment variant from 426 to 1,727 sq ft, including inner and outer layouts, Signature Glass Apartments and the current payment table.',
    file: '/brochures/aureum-residential-collection.pdf',
    cover: '/assets/aureum/approved/brochures/aureum-residential-collection-cover.webp',
    coverAlt: 'Cover of The Residential Collection, showing a glass-fronted Aureum apartment interior',
    format: 'Collection',
    interest: 'apartment',
  },
  {
    id: 'offices',
    title: 'The Office Collection',
    description: 'Full-glass Ring Road offices from 1,007 to 2,595 sq ft, current pricing and the lifetime amenities membership.',
    file: '/brochures/aureum-office-collection.pdf',
    cover: '/assets/aureum/approved/brochures/aureum-office-collection-cover.webp',
    coverAlt: 'Cover of The Office Collection, showing Aureum’s full-glass office frontage',
    format: 'Collection',
    interest: 'corporate_office',
  },
  {
    id: 'commercial',
    title: 'Commercial & Food Court',
    description: 'Shops, food court opportunities, floor-by-floor plans and the current commercial payment schedule.',
    file: '/brochures/aureum-commercial-and-food-court-brochure.pdf',
    cover: '/assets/aureum/approved/brochures/aureum-commercial-food-court-cover.webp',
    coverAlt: 'Cover of the Aureum Commercial and Food Court brochure, showing a premium retail corridor',
    format: 'Brochure',
    interest: 'commercial_shop',
  },
  {
    id: 'factsheet',
    title: 'Project Factsheet',
    description: 'A concise two-page overview of the location, building levels, available property types, prices, payment plans and amenities.',
    file: '/brochures/aureum-project-factsheet.pdf',
    cover: '/assets/aureum/approved/brochures/aureum-project-factsheet-cover.webp',
    coverAlt: 'Cover of the Aureum Mall and Residences project factsheet',
    format: 'Factsheet',
    interest: 'other',
  },
];

export const IMAGE_DISCLAIMER = 'Artist’s impression. Brand signage is illustrative and does not indicate confirmed tenants.';

export const PROJECT_DISCLAIMERS = [
  'Building and interior images are artist’s impressions. Fit-out and interior concepts are illustrative.',
  'Amenities, technology features, hotel, access arrangements and specifications are planned and subject to developer confirmation.',
  'Floor plans follow the current project drawings and are subject to final approved drawings.',
  'Prices, payment plans and availability are subject to final confirmation.',
  'No fixed rental return or capital appreciation is guaranteed.',
] as const;
