import postsData from './posts.json';

export type NewsFaq = { question: string; answer: string };

export type NewsPost = {
  /** URL slug under /news/. */
  slug: string;
  /** Slug the article had on the old WordPress site (used for 301 redirects). */
  legacySlug: string;
  title: string;
  /** Shorter title for search results when `title` is too long for Google (~60 characters). */
  seoTitle?: string;
  description: string;
  summary: string;
  /** WordPress publish time, Pakistan local time without offset (e.g. "2026-08-15T09:11:33"). */
  publishedAt: string;
  readingMinutes: number;
  faqs: NewsFaq[];
  /** Article body as simplified, trusted HTML (h2–h4, p, lists, links, strong/em). */
  html: string;
};

export type NewsCardItem = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  href: string;
  cta: string;
};

const POSTS = (postsData as NewsPost[]).slice().sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getAllPosts(): readonly NewsPost[] {
  return POSTS;
}

export function getPost(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}

/** ISO 8601 with the Pakistan offset, for schema.org and Open Graph. */
export function publishedIso(post: NewsPost) {
  return `${post.publishedAt}+05:00`;
}

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Karachi' });

export function formatPostDate(post: NewsPost) {
  return DATE_FORMAT.format(new Date(publishedIso(post)));
}

const STOP_WORDS = new Set(['the', 'a', 'an', 'and', 'or', 'of', 'in', 'on', 'for', 'to', 'is', 'are', 'why', 'how', 'what', 'your', 'you', 'with', 'at', 'aureum', 'mall', 'residences']);

function keywords(post: NewsPost) {
  return new Set(post.slug.split('-').filter((word) => word.length > 2 && !STOP_WORDS.has(word)));
}

/** Articles sharing the most slug keywords, newest first on ties. */
export function getRelatedPosts(slug: string, limit = 3) {
  const current = getPost(slug);
  if (!current) return [];
  const words = keywords(current);
  return POSTS.filter((post) => post.slug !== slug)
    .map((post) => ({ post, score: [...keywords(post)].filter((word) => words.has(word)).length }))
    .sort((a, b) => b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt))
    .slice(0, limit)
    .map(({ post }) => post);
}

export function toNewsCard(post: NewsPost): NewsCardItem {
  return {
    slug: post.slug,
    title: post.title,
    date: formatPostDate(post),
    summary: post.summary,
    href: `/news/${post.slug}`,
    cta: 'Read article',
  };
}

export function getNewsCards(limit?: number): NewsCardItem[] {
  return (limit ? POSTS.slice(0, limit) : POSTS).map(toNewsCard);
}
