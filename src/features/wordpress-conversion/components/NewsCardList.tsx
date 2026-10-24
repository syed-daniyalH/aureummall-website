import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { NewsItem } from '../data';

type NewsCardListProps = {
  items: readonly NewsItem[];
};

export function NewsCardList({ items }: NewsCardListProps) {
  return (
    <div className="wpNewsList">
      {items.map((item, index) => (
        <article className="wpNewsCard" key={item.slug}>
          <span className="wpNewsIndex">0{index + 1}</span>
          <div>
            <Eyebrow>{item.date}</Eyebrow>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <Link href={item.href}>{item.cta} <span aria-hidden="true">↗</span></Link>
          </div>
        </article>
      ))}
    </div>
  );
}
