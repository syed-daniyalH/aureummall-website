/**
 * First-touch attribution for leads: the page a visitor first landed on, their referrer and any UTM tags.
 * Stored in sessionStorage so it survives navigation to /contact before the form is sent.
 */
export type Attribution = {
  landingPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  fbclid?: string;
};

const STORAGE_KEY = 'aureum:attribution';

const PARAMS: Array<[keyof Attribution, string]> = [
  ['utmSource', 'utm_source'],
  ['utmMedium', 'utm_medium'],
  ['utmCampaign', 'utm_campaign'],
  ['utmContent', 'utm_content'],
  ['utmTerm', 'utm_term'],
  ['gclid', 'gclid'],
  ['fbclid', 'fbclid'],
];

function read(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/** Call once per page view. Keeps the first landing page; a new campaign click (UTM/click id) replaces it. */
export function captureAttribution() {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  const fromUrl: Attribution = {};
  for (const [key, param] of PARAMS) {
    const value = url.searchParams.get(param);
    if (value) fromUrl[key] = value.slice(0, 160);
  }
  const hasCampaign = Object.keys(fromUrl).length > 0;
  const existing = read();
  if (existing && !hasCampaign) return;
  const referrer = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : undefined;
  const next: Attribution = { landingPage: window.location.href.slice(0, 500), referrer: referrer?.slice(0, 500), ...fromUrl };
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode or storage blocked: the form falls back to the current page.
  }
}

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  return read() ?? { landingPage: window.location.href.slice(0, 500) };
}
