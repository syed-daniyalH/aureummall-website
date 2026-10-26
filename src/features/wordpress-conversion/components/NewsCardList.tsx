import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { NewsCardItem } from '@/features/news/posts';

type NewsCardListProps = {
  items: readonly NewsCardItem[];
};

export function NewsCardList({ items }: NewsCardListProps) {
  return (
    <div className="wpNewsList">
      {items.map((item, index) => (
        <article className="wpNewsCard" key={item.slug}>
          <span className="wpNewsIndex" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <Eyebrow>{item.date}</Eyebrow>
            <h2><Link href={item.href}>{item.title}</Link></h2>
            <p>{item.summary}</p>
            <Link href={item.href} aria-label={`${item.cta}: ${item.title}`}>{item.cta} <span aria-hidden="true">↗</span></Link>
          </div>
        </article>
      ))}
    </div>
  );
}
