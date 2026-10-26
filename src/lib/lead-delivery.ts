import { PROPERTY_INTEREST_LABELS, toE164, type LeadInput } from '@/lib/lead-schema';

export type LeadRecord = {
  submittedAt: string;
  fullName: string;
  phone: string;
  email: string;
  propertyInterest: string;
  intent: string;
  message: string;
  pageUrl: string;
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  gclid: string;
  fbclid: string;
  ip: string;
  userAgent: string;
};

export function toLeadRecord(lead: LeadInput, meta: { ip: string; userAgent: string }): LeadRecord {
  return {
    submittedAt: new Date().toISOString(),
    fullName: lead.fullName,
    phone: toE164(lead.countryCode, lead.phone),
    email: lead.email ?? '',
    propertyInterest: PROPERTY_INTEREST_LABELS[lead.propertyInterest],
    intent: lead.intent,
    message: lead.message ?? '',
    pageUrl: lead.pageUrl ?? '',
    landingPage: lead.landingPage ?? '',
    referrer: lead.referrer ?? '',
    utmSource: lead.utmSource ?? '',
    utmMedium: lead.utmMedium ?? '',
    utmCampaign: lead.utmCampaign ?? '',
    utmContent: lead.utmContent ?? '',
    utmTerm: lead.utmTerm ?? '',
    gclid: lead.gclid ?? '',
    fbclid: lead.fbclid ?? '',
    ip: meta.ip,
    userAgent: meta.userAgent.slice(0, 300),
  };
}

export type DeliveryResult = { ok: true } | { ok: false; reason: 'not_configured' | 'webhook_failed' };

/**
 * Sends the lead to LEAD_WEBHOOK_URL as JSON (a Google Apps Script web app that appends to a Google Sheet,
 * or any CRM webhook). In local development without a webhook the lead is printed to the terminal instead.
 */
export async function deliverLead(record: LeadRecord): Promise<DeliveryResult> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[lead] LEAD_WEBHOOK_URL is not set; lead not delivered (development only):', record);
      return { ok: true };
    }
    console.error('[lead] LEAD_WEBHOOK_URL is not set in production; lead could not be delivered.');
    return { ok: false, reason: 'not_configured' };
  }

  const body = JSON.stringify({ ...record, secret: process.env.LEAD_WEBHOOK_SECRET ?? '' });
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
      });
      if (response.ok) {
        const text = await response.text();
        // The Google Sheet script answers {"ok":false} when the shared secret does not match.
        if (!/"ok"\s*:\s*false/.test(text)) return { ok: true };
        console.error('[lead] Webhook rejected the lead:', text.slice(0, 200));
        return { ok: false, reason: 'webhook_failed' };
      }
      console.error(`[lead] Webhook answered ${response.status} (attempt ${attempt}).`);
    } catch (error) {
      console.error(`[lead] Webhook request failed (attempt ${attempt}):`, error);
    }
  }
  return { ok: false, reason: 'webhook_failed' };
}
