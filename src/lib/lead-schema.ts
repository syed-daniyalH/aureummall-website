import { z } from 'zod';

export const LeadSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  whatsapp: z.string().trim().max(30).optional(),
  email: z.string().email().optional().or(z.literal('')),
  propertyInterest: z.enum(['apartment', 'commercial_shop', 'corporate_office', 'other']),
  budgetRange: z.string().trim().max(80).optional(),
  buyingTimeline: z.string().trim().max(80).optional(),
  city: z.string().trim().max(80).optional(),
  preferredContact: z.enum(['phone', 'whatsapp', 'email']).optional(),
  message: z.string().trim().max(1000).optional(),
  landingPage: z.string().url().optional(),
  referrer: z.string().max(500).optional(),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(160).optional(),
  utmContent: z.string().max(160).optional(),
  utmTerm: z.string().max(160).optional(),
});

export type LeadInput = z.infer<typeof LeadSchema>;
