import Image from 'next/image';
import Link from 'next/link';
import type { NewsCardItem } from '@/features/news/posts';

type NewsCardListProps = {
  items: readonly NewsCardItem[];
};

/** The latest article as a wide feature, then every other article as a picture card in a grid. */
export function NewsCardList({ items }: NewsCardListProps) {
  const [featured, ...rest] = items;
  if (!featured) return null;

  return (
    <div className="newsCards">
      <article className="newsCard isFeatured">
        <Link href={featured.href} className="newsCardImage" tabIndex={-1} aria-hidden="true">
          {featured.image ? <Image src={featured.image} alt="" fill sizes="(max-width: 860px) 92vw, 720px" priority /> : null}
        </Link>
        <div className="newsCardBody">
          <p className="newsCardMeta"><span>Latest</span>{featured.date}</p>
          <h2><Link href={featured.href}>{featured.title}</Link></h2>
          <p className="newsCardSummary">{featured.summary}</p>
          <Link href={featured.href} className="newsCardMore" aria-label={`${featured.cta}: ${featured.title}`}>{featured.cta} <span aria-hidden="true">→</span></Link>
        </div>
      </article>
      <ul className="newsGrid">
        {rest.map((item) => (
          <li key={item.slug}>
            <article className="newsCard">
              <Link href={item.href} className="newsCardImage" tabIndex={-1} aria-hidden="true">
                {item.image ? <Image src={item.image} alt="" fill sizes="(max-width: 860px) 92vw, 400px" /> : null}
              </Link>
              <div className="newsCardBody">
                <p className="newsCardMeta">{item.date}</p>
                <h3><Link href={item.href}>{item.title}</Link></h3>
                <p className="newsCardSummary">{item.summary}</p>
                <Link href={item.href} className="newsCardMore" aria-label={`${item.cta}: ${item.title}`}>{item.cta} <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
