import { BuildingExplorerExperience } from '@/features/building-explorer/components/BuildingExplorerExperience';
import { createRouteMetadata } from '@/features/content-seo/metadata';

export const metadata = createRouteMetadata('/building-explorer');

export default function BuildingExplorerPage() {
  return <BuildingExplorerExperience />;
}
