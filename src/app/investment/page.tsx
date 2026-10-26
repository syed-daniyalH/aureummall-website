import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ArchitectureLanding } from '@/features/site-architecture/components/ArchitectureLanding';
export const metadata = createRouteMetadata('/investment');
export default function Page() { return <ArchitectureLanding eyebrow="Investment / Aureum" title="Explore a property pathway that fits your plans." intro="Compare residential, retail and office pathways, then request current project information before making a decision." points={['Residential, commercial and office options.', 'Location context at Bahria Town Ring Road Interchange.', 'No return or appreciation promises; confirm terms with the project team.']} />; }
