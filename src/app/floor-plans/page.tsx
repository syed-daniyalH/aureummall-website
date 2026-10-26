import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ArchitectureLanding } from '@/features/site-architecture/components/ArchitectureLanding';
export const metadata = createRouteMetadata('/floor-plans');
export default function Page() { return <ArchitectureLanding eyebrow="Floor plans / Aureum" title="Understand the spaces before you visit." intro="Review the project floor plan pathways and request the current drawings and unit details from the Aureum team." points={['Ground and first floor plan context.', 'Residential plan pathways for apartments.', 'Current drawings confirmed by the project team.']} ctaHref="/immersive-media" ctaLabel="Explore project media" />; }
