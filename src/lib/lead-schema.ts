import { z } from 'zod';

export const PROPERTY_INTERESTS = ['apartment', 'commercial_shop', 'food_court', 'corporate_office', 'other'] as const;
export const LEAD_INTENTS = ['enquiry', 'site_visit', 'payment_plan', 'brochure'] as const;

export const PROPERTY_INTEREST_LABELS: Record<(typeof PROPERTY_INTERESTS)[number], string> = {
  apartment: 'Apartment',
  commercial_shop: 'Commercial Shop',
  food_court: 'Food Court Unit',
  corporate_office: 'Corporate Office',
  other: 'Other',
};

/** Country calling codes offered in the form; Pakistan first, then the main overseas-buyer markets. */
export const COUNTRY_CODES = [
  { code: '+92', label: 'Pakistan (+92)' },
  { code: '+971', label: 'UAE (+971)' },
  { code: '+966', label: 'Saudi Arabia (+966)' },
  { code: '+44', label: 'United Kingdom (+44)' },
  { code: '+1', label: 'USA / Canada (+1)' },
  { code: '+974', label: 'Qatar (+974)' },
  { code: '+968', label: 'Oman (+968)' },
  { code: '+965', label: 'Kuwait (+965)' },
  { code: '+973', label: 'Bahrain (+973)' },
  { code: '+61', label: 'Australia (+61)' },
  { code: '+49', label: 'Germany (+49)' },
  { code: '+39', label: 'Italy (+39)' },
  { code: '+34', label: 'Spain (+34)' },
  { code: '+33', label: 'France (+33)' },
] as const;

const optionalText = (max: number) => z.string().trim().max(max).optional().transform((value) => value || undefined);

export const LeadSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your name.').max(120),
  countryCode: z.string().trim().regex(/^\+\d{1,4}$/, 'Please choose a country code.').default('+92'),
  phone: z
    .string()
    .trim()
    .max(30)
    .transform((value) => value.replace(/[\s\-().]/g, ''))
    .refine((value) => /^\+?\d{7,15}$/.test(value), 'Please enter a valid phone number.'),
  email: z
    .string()
    .trim()
    .max(160)
    .optional()
    .refine((value) => !value || z.email().safeParse(value).success, 'Please enter a valid email.')
    .transform((value) => value || undefined),
  propertyInterest: z.enum(PROPERTY_INTERESTS).default('apartment'),
  intent: z.enum(LEAD_INTENTS).default('enquiry'),
  message: optionalText(1000),
  landingPage: optionalText(500),
  pageUrl: optionalText(500),
  referrer: optionalText(500),
  utmSource: optionalText(160),
  utmMedium: optionalText(160),
  utmCampaign: optionalText(160),
  utmContent: optionalText(160),
  utmTerm: optionalText(160),
  gclid: optionalText(200),
  fbclid: optionalText(300),
  /** Honeypot: hidden from people, so any value means a bot filled the form. */
  company: z.string().optional(),
  /** Milliseconds since epoch when the form became interactive (bot timing check). */
  startedAt: z.coerce.number().optional(),
});

export type LeadInput = z.infer<typeof LeadSchema>;

/** Full international number, e.g. "+923001234567". A number typed with its own "+" wins over the picker. */
export function toE164(countryCode: string, phone: string) {
  if (phone.startsWith('+')) return phone;
  if (phone.startsWith('00')) return `+${phone.slice(2)}`;
  const national = phone.replace(/^0+/, '');
  return `${countryCode}${national}`;
}
