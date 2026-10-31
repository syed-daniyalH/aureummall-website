// Project facts transcribed from the Aureum Master Catalogue and brochures (October 2026).
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
  portfolio: [
    { name: 'Alfalah Tower', detail: 'Commercial & retail hub, Bahria Town Karachi' },
    { name: 'Liberty Clock Tower', detail: 'Iconic mixed-use development, Bahria Town Karachi' },
    { name: 'Maison Theme Heights', detail: 'Premier residential tower facing the Theme Park, Bahria Town Karachi' },
  ],
} as const;

export const PROJECT_STATS = [
  ['16', 'Kanal landmark'],
  ['3', 'Retail levels'],
  ['20', 'Planned amenities'],
  ['25 min', 'From Lahore airport'],
] as const;

export const BUILDING_LEVELS = [
  { level: 'Residences', detail: 'Apartments, premium glass residences and offices on the 6th to 12th floors' },
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
  'Rooftop Restaurant', 'Sauna', 'Gaming Zone', 'Yoga Centre', 'Spa', 'Trampoline Park', 'Building Management System (IBMS)',
] as const;

export const ACCESS = [
  { title: 'Residences', detail: 'Private entrance, 3 dedicated lifts and a 28 × 50 ft lobby' },
  { title: 'Offices', detail: 'Dedicated entrance lobby and separate elevators' },
  { title: 'Mall', detail: 'Commercial entrance and 2 dedicated elevators' },
  { title: 'Parking', detail: 'Two basements for cars and bikes' },
] as const;

export const APARTMENT_TYPES = [
  { name: 'Studio', size: '426 sq ft', from: 'PKR 8,307,000', summary: 'A smart, efficient home for young professionals and first-time buyers.' },
  { name: 'One bedroom', size: '622 / 658 sq ft', from: 'PKR 12,751,000', summary: 'A separate bedroom and living area, ideal for couples and working from home.' },
  { name: 'Two bedrooms', size: 'From 1,103 sq ft', from: 'PKR 22,611,500', summary: 'Room for family life, a guest room or a study.' },
  { name: 'Premium Glass Collection', size: '1,491 / 1,727 sq ft', from: 'Quoted individually', summary: 'Generous proportions and expansive glazing that opens each home to its surroundings.' },
] as const;

export type Brochure = {
  id: string;
  title: string;
  description: string;
  file: string;
  details: string;
  interest: 'apartment' | 'commercial_shop' | 'corporate_office' | 'other';
};

export const BROCHURES: readonly Brochure[] = [
  { id: 'master-catalogue', title: 'The Aureum Catalogue', description: 'The complete project: retail, dining, offices, residences, amenities, floor plans and pricing.', file: '/brochures/aureum-master-catalogue.pdf', details: 'PDF · 26 pages · 13 MB', interest: 'other' },
  { id: 'residential', title: 'Residential Collection', description: 'Studios, one- and two-bedroom apartments with layouts and starting prices.', file: '/brochures/aureum-residential-brochure.pdf', details: 'PDF · 3 pages · 4 MB', interest: 'apartment' },
  { id: 'offices', title: 'Corporate Offices', description: 'Full-glass offices facing Ring Road, sizes, pricing and the lifetime amenities membership.', file: '/brochures/aureum-offices-brochure.pdf', details: 'PDF · 12 pages · 2.5 MB', interest: 'corporate_office' },
  { id: 'commercial', title: 'Commercial Collection', description: 'Shops and food court units, floor-by-floor plans and the commercial payment plan.', file: '/brochures/aureum-commercial-brochure.pdf', details: 'PDF · 12 pages · 4.4 MB', interest: 'commercial_shop' },
];

export const IMAGE_DISCLAIMER = 'Artist’s impression. Brand signage is illustrative and does not indicate confirmed tenants.';

export const PROJECT_DISCLAIMERS = [
  'Building and interior images are artist’s impressions. Fit-out and interior concepts are illustrative.',
  'Amenities, technology features, hotel, access arrangements and specifications are planned and subject to developer confirmation.',
  'Floor plans follow the current project drawings and are subject to final approved drawings.',
  'Prices, payment plans and availability are subject to final confirmation.',
  'No fixed rental return or capital appreciation is guaranteed.',
] as const;
