import { createRouteMetadata } from '@/features/content-seo/metadata';
import { LegalPage } from '@/features/site-architecture/components/ArchitectureLanding';
export const metadata = createRouteMetadata('/terms');
export default function Page() { return <LegalPage kind="terms" />; }
