import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { JsonLd } from '@/features/content-seo/components/JsonLd';
import { formatPostDate, getAllPosts, getPost, getRelatedPosts, publishedIso } from '@/features/news/posts';
import { SITE } from '@/lib/site';

type ArticlePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/news/${post.slug}`;
  return {
    // Titles that already carry the brand are used as-is so the brand is not repeated.
    title: post.title.includes('Aureum') ? { absolute: post.title } : post.title,
    description: post.description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `${SITE.url}${path}`,
      siteName: SITE.name,
      publishedTime: publishedIso(post),
      locale: 'en_PK',
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE.url}/news/${post.slug}`;
  const related = getRelatedPosts(post.slug, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: publishedIso(post),
    dateModified: publishedIso(post),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    inLanguage: 'en',
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/assets/aureum/Logo.png` },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'News & Guides', item: `${SITE.url}/news` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  const faqSchema = post.faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null;

  return (
    <>
      <JsonLd id="article-schema" data={articleSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      {faqSchema && <JsonLd id="faq-schema" data={faqSchema} />}

      <section className="wpInternalHero section articleHero">
        <div className="container articleHeroInner">
          <nav aria-label="Breadcrumb" className="breadcrumbs">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/news">News &amp; Guides</Link>
              </li>
              <li aria-current="page">{post.title}</li>
            </ol>
          </nav>
          <h1>{post.title}</h1>
          <p className="articleMeta">
            <time dateTime={publishedIso(post)}>{formatPostDate(post)}</time>
            <span aria-hidden="true"> · </span>
            {post.readingMinutes} min read
          </p>
        </div>
      </section>

      <section className="section articleSection">
        <div className="container articleLayout">
          <article className="articleBody" dangerouslySetInnerHTML={{ __html: post.html }} />

          <aside className="articleAside" aria-label="Talk to the sales team">
            <div className="articleCta">
              <Eyebrow>Aureum Mall &amp; Residences</Eyebrow>
              <p className="articleCtaTitle">Apartments, shops and offices at Bahria Town Ring Road Interchange.</p>
              <p>Get the current payment plan and availability from our sales team.</p>
              <WhatsAppLink className="button primary" placement="article_aside">
                WhatsApp the sales team
              </WhatsAppLink>
              <ButtonLink href="/contact#enquiry" variant="dark">
                Send an enquiry
              </ButtonLink>
              <Link className="articleCtaLink" href="/payment-plans">
                View payment plans →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section wpNewsSection articleRelated" aria-labelledby="related-heading">
          <div className="container">
            <h2 id="related-heading">Keep reading</h2>
            <ul className="relatedGrid">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/news/${item.slug}`}>
                    <span className="relatedDate">{formatPostDate(item)}</span>
                    <span className="relatedTitle">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
