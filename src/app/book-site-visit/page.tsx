import { createRouteMetadata } from '@/features/content-seo/metadata';
import { SiteVisitPage } from '@/features/site-architecture/components/ArchitectureLanding';
export const metadata = createRouteMetadata('/book-site-visit');
export default function Page() { return <SiteVisitPage />; }
