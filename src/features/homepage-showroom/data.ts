export const HOMEPAGE_PROPERTY_CHOICES = [
  {
    index: '01',
    eyebrow: 'Live / Residences',
    title: 'Apartments',
    description: 'A calm, considered home shaped around light, connection and everyday ease.',
    href: '/apartments',
  },
  {
    index: '02',
    eyebrow: 'Gather / Retail',
    title: 'Commercial Shops',
    description: 'A visible retail address for brands, makers and the moments people remember.',
    href: '/commercial-shops',
  },
  {
    index: '03',
    eyebrow: 'Work / Offices',
    title: 'Corporate Offices',
    description: 'A confident place to build the next chapter of your business.',
    href: '/corporate-offices',
  },
] as const;

export const PROJECT_SNAPSHOT = [
  {
    label: 'Setting',
    value: 'Bahria Town / Ring Road Interchange, Lahore',
    note: 'The current project location identity.',
  },
  {
    label: 'Format',
    value: 'Mixed-use destination',
    note: 'Residential, retail and office pathways in one experience.',
  },
  {
    label: 'Information standard',
    value: 'Evidence-first',
    note: 'Prices, sizes and approvals appear only after sign-off.',
  },
] as const;

export const FEATURED_RESIDENCES = [
  {
    index: '01',
    type: 'Studio',
    title: 'A focused beginning',
    description: 'A compact residential pathway for a life designed with intention.',
    href: '/apartments',
  },
  {
    index: '02',
    type: '1-Bed',
    title: 'Room to settle in',
    description: 'A balanced home experience for everyday living and quiet retreat.',
    href: '/apartments',
  },
  {
    index: '03',
    type: '2-Bed',
    title: 'More space to belong',
    description: 'A considered residential option for a fuller everyday rhythm.',
    href: '/apartments',
  },
] as const;

export const COMMERCIAL_DESTINATIONS = [
  {
    id: 'shops',
    label: 'Shops',
    eyebrow: 'Retail / visibility',
    title: 'A place for the next customer to find you.',
    description: 'Explore the commercial pathway and connect the right unit information once the approved register is loaded.',
    href: '/commercial-shops',
  },
  {
    id: 'food-court',
    label: 'Food Court',
    eyebrow: 'Gather / atmosphere',
    title: 'A shared destination built around moments.',
    description: 'Use this space for the approved food and lifestyle experience once the final project information is confirmed.',
    href: '/commercial-shops',
  },
  {
    id: 'offices',
    label: 'Offices',
    eyebrow: 'Work / presence',
    title: 'A professional address with presence.',
    description: 'Move directly to the office pathway without making business buyers search through residential content.',
    href: '/corporate-offices',
  },
] as const;

export const PAYMENT_STEPS = [
  { label: 'Booking', value: 'Official amount pending approval' },
  { label: 'Confirmation', value: 'Official amount pending approval' },
  { label: 'Installments', value: 'Schedule pending approval' },
  { label: 'Completion', value: 'Terms pending approval' },
] as const;

export const HOMEPAGE_FAQS = [
  {
    question: 'What can I explore at Aureum?',
    answer: 'The website is organized around three clear pathways: apartments, commercial shops and corporate offices.',
  },
  {
    question: 'Where is Aureum located?',
    answer: 'The current site identity places Aureum in Bahria Town at the Ring Road Interchange in Lahore.',
  },
  {
    question: 'Where can I see the official payment plan?',
    answer: 'Use the Payment Plans page. The published schedule will be rendered from the approved source of truth rather than from an image-only upload.',
  },
  {
    question: 'Can I arrange a site visit?',
    answer: 'Use the contact form to request details. The final delivery workflow is intentionally not connected until it is approved.',
  },
] as const;
