import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ArchitectureLanding } from '@/features/site-architecture/components/ArchitectureLanding';
export const metadata = createRouteMetadata('/food-court');
export default function Page() { return <ArchitectureLanding eyebrow="Food court / Aureum Mall" title="A food court pathway for everyday connection." intro="Explore the food and lifestyle opportunity within Aureum Mall and request the current information for your plans." points={['A dedicated food and lifestyle pathway.', 'Part of a connected mixed-use destination.', 'Current unit information shared directly by the project team.']} />; }
