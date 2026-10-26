import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { SEO_ROUTE_CONTRACTS } from '@/features/content-seo/data';
import { getAllPosts, publishedIso } from '@/features/news/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = SEO_ROUTE_CONTRACTS.filter((contract) => contract.indexable).map((contract) => ({
    url: `${SITE.url}${contract.canonical === '/' ? '' : contract.canonical}`,
    lastModified: new Date(),
    changeFrequency: contract.changeFrequency,
    priority: contract.priority,
  }));

  const articles: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE.url}/news/${post.slug}`,
    lastModified: new Date(publishedIso(post)),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
