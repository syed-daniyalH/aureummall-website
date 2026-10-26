import { WordPressPropertyPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
export const metadata = createRouteMetadata('/commercial-shops/first-floor');
export default function Page() { return <WordPressPropertyPage eyebrow="Commercial / first floor" title="First floor shops at Aureum Mall." intro="Explore the first floor retail pathway and request current shop information from the project team." image="/assets/aureum/payment-plans-07.jpg" imageAlt="Aureum Mall commercial project artwork" features={['First floor retail pathway', 'A connected mixed-use destination', 'Current unit details shared by the team']} interest="commercial_shop" registerLabel="First floor shops" />; }
