import { createRouteMetadata } from '@/features/content-seo/metadata';
import { LegalPage } from '@/features/site-architecture/components/ArchitectureLanding';
export const metadata = createRouteMetadata('/privacy-policy');
export default function Page() { return <LegalPage kind="privacy" />; }
