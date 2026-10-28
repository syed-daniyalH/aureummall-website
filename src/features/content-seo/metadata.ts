import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { getSeoRouteContract } from './data';

/** Must match the title template suffix in app/layout.tsx. */
export const TITLE_SUFFIX = ' | Aureum Mall';
const MAX_TITLE_LENGTH = 60;

/**
 * Titles that already name the brand, or would pass ~60 characters (where Google truncates) with the
 * suffix added, are used as-is; the rest get the layout's " | Aureum Mall" suffix.
 */
export function pageTitle(title: string): Metadata['title'] {
  return title.includes('Aureum') || title.length + TITLE_SUFFIX.length > MAX_TITLE_LENGTH ? { absolute: title } : title;
}

export function createRouteMetadata(route: string): Metadata {
  const contract = getSeoRouteContract(route);
  if (!contract) throw new Error(`Missing SEO route contract for ${route}`);

  return {
    title: pageTitle(contract.title),
    description: contract.description,
    alternates: { canonical: contract.canonical },
    robots: contract.indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: contract.title,
      description: contract.description,
      url: `${SITE.url}${contract.canonical}`,
      type: 'website',
    },
  };
}
