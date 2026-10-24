import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { getSeoRouteContract } from './data';

export function createRouteMetadata(route: string): Metadata {
  const contract = getSeoRouteContract(route);
  if (!contract) throw new Error(`Missing SEO route contract for ${route}`);

  return {
    title: contract.title,
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
