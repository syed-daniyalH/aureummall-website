import { WordPressNewsPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { getNewsCards } from '@/features/news/posts';

export const metadata = createRouteMetadata('/news');

export default function NewsPage() {
  return <WordPressNewsPage items={getNewsCards()} />;
}
