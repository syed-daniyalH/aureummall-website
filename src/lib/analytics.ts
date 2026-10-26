import type { AnalyticsEventName } from '@/features/content-seo/data';

type Gtag = (command: 'event', name: string, params?: Record<string, unknown>) => void;
type Fbq = (command: 'track' | 'trackCustom', name: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: Gtag;
    fbq?: Fbq;
  }
}

/** Meta Pixel standard events for the key conversions. */
const META_EVENTS: Partial<Record<AnalyticsEventName, string>> = {
  form_submit: 'Lead',
  whatsapp_click: 'Contact',
  call_click: 'Contact',
};

/**
 * Sends an event to Google Tag Manager (dataLayer), GA4 (gtag) and the Meta Pixel when they are present.
 * Safe to call before any of them load: the dataLayer push is picked up by GTM later.
 */
export function track(event: AnalyticsEventName, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  try {
    window.gtag?.('event', event, params);
    const metaEvent = META_EVENTS[event];
    if (metaEvent) window.fbq?.('track', metaEvent, params);
  } catch {
    // Analytics must never break the page.
  }
}
