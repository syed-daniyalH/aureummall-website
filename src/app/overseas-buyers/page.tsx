import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ArchitectureLanding } from '@/features/site-architecture/components/ArchitectureLanding';
export const metadata = createRouteMetadata('/overseas-buyers');
export default function Page() { return <ArchitectureLanding eyebrow="Overseas buyers / Aureum" title="A clear information path from wherever you are." intro="Request current project information, payment details and a guided conversation with the Aureum sales team." points={['Share your preferred property pathway.', 'Receive current details through a direct enquiry.', 'Arrange a visit or follow-up conversation when it suits you.']} />; }
