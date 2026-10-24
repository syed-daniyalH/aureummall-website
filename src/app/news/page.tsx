import { WordPressNewsPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';

export const metadata = createRouteMetadata('/news');

export default function NewsPage() {
  return <WordPressNewsPage />;
}
