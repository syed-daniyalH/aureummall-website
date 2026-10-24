import { WordPressGalleryPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';

export const metadata = createRouteMetadata('/gallery');

export default function GalleryPage() {
  return <WordPressGalleryPage />;
}
