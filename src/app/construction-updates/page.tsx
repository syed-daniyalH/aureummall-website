import { ConstructionUpdatesSection } from '@/features/trust-location/components/TrustLocationExperience';
import { createRouteMetadata } from '@/features/content-seo/metadata';
export const metadata = createRouteMetadata('/construction-updates');
export default function Page(){return <ConstructionUpdatesSection standalone />}
