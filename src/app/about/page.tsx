import { WordPressAboutPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';

export const metadata = createRouteMetadata('/about');

export default function AboutPage() {
  return <WordPressAboutPage />;
}
