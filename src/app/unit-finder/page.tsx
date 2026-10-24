import { UnitFinderExperience } from '@/features/unit-finder/components/UnitFinderExperience';
import { createRouteMetadata } from '@/features/content-seo/metadata';

export const metadata = createRouteMetadata('/unit-finder');

export default function UnitFinderPage() {
  return <UnitFinderExperience />;
}
