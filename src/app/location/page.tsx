import { TrustLocationExperience } from '@/features/trust-location/components/TrustLocationExperience';
import { createRouteMetadata } from '@/features/content-seo/metadata';
export const metadata = createRouteMetadata('/location');
export default function Page(){return <TrustLocationExperience />}
