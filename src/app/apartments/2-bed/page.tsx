import { WordPressPropertyPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
export const metadata = createRouteMetadata('/apartments/2-bed');
export default function Page() { return <WordPressPropertyPage eyebrow="Apartments / 2 bed" title="Two bedroom apartments at Aureum." intro="Explore a two bedroom apartment pathway for everyday living at Bahria Town Ring Road Interchange." image="/assets/aureum/payment-plans-02.jpg" imageAlt="Aureum Mall and Residences project artwork" features={['Two bedroom living pathway', 'Connected destination with everyday amenities', 'Current plans and availability by request']} interest="apartment" registerLabel="Two bedroom apartments" />; }
