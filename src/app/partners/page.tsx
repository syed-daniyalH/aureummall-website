import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ArchitectureLanding } from '@/features/site-architecture/components/ArchitectureLanding';
export const metadata = createRouteMetadata('/partners');
export default function Page() { return <ArchitectureLanding eyebrow="Sales partners / Aureum" title="Bring the right project information to your clients." intro="Contact the Aureum team about approved sales materials, current pathways and partner enquiries." points={['Request current project materials.', 'Choose apartments, shops, offices or food court information.', 'Keep client conversations anchored to approved details.']} ctaLabel="Contact the partner team" />; }
