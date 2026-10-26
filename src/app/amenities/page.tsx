import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ArchitectureLanding } from '@/features/site-architecture/components/ArchitectureLanding';
export const metadata = createRouteMetadata('/amenities');
export default function Page() { return <ArchitectureLanding eyebrow="Aureum / amenities" title="Everyday spaces for living, business and connection." intro="Explore the amenities pathway at Aureum Mall & Residences and request the current approved project information." points={['Residential, retail and office pathways in one destination.', 'Everyday convenience close to the project address.', 'Current amenities confirmed by the project team.']} />; }
