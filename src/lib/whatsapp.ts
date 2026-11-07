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

/**
 * A WhatsApp link for one team member. With their own number the message greets them by
 * `callName`; on the shared sales line it asks the team to pass the enquiry to that person.
 */
export function personWhatsappHref(name: string | null, number?: string, callName?: string) {
  const short = callName ?? name?.split(' ')[0];
  const message = !name
    ? `Hi Aureum team, I'm interested in Aureum Mall & Residences. Please share the details and payment plan.`
    : number
      ? `Hi ${short}, I'm interested in Aureum Mall & Residences. Please share the details and payment plan.`
      : `Hi Aureum team, I'd like to speak with ${name} about Aureum Mall & Residences. Please share the details and payment plan.`;
  return `https://wa.me/${number ?? SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const callHref = `tel:${SITE.phoneE164}`;
