import type { AnalyticsEventName } from '@/features/content-seo/data';

declare global {
  interface Window { dataLayer?: Array<Record<string, unknown>>; }
}

export function track(event: AnalyticsEventName, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
