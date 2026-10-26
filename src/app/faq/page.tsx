import { createRouteMetadata } from '@/features/content-seo/metadata';
import { FaqPage } from '@/features/site-architecture/components/ArchitectureLanding';
export const metadata = createRouteMetadata('/faq');
export default function Page() { return <FaqPage />; }
