import { SITE } from '@/lib/site';

/** Interest wording used in the pre-filled WhatsApp message, keyed by page path prefix. */
const INTEREST_BY_PATH: ReadonlyArray<readonly [string, string]> = [
  ['/apartments', 'an apartment'],
  ['/commercial-shops', 'a commercial shop'],
  ['/food-court', 'a food court unit'],
  ['/corporate-offices', 'a corporate office'],
  ['/payment-plans', 'the payment plan'],
  ['/location', 'a site visit'],
  ['/construction-updates', 'the construction progress'],
];

export function interestForPath(pathname: string | null | undefined) {
  if (!pathname) return undefined;
  return INTEREST_BY_PATH.find(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`))?.[1];
}

export function whatsappHref(interest?: string) {
  const message = interest
    ? `Hi Aureum team, I'm interested in ${interest}. Please share the details and payment plan.`
    : `Hi Aureum team, I'd like details about Aureum Mall & Residences.`;
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const callHref = `tel:${SITE.phoneE164}`;
