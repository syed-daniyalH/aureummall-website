import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ArchitectureLanding } from '@/features/site-architecture/components/ArchitectureLanding';
import { AccessSection, AmenitiesSection } from '@/features/project-showcase/components/ProjectShowcase';
import { FOOD_COURT_IMAGE, LEISURE_IMAGES, PARKING_IMAGE } from '@/features/project-showcase/images';

export const metadata = createRouteMetadata('/amenities');

export default function Page() {
  return (
    <ArchitectureLanding
      eyebrow="Aureum / amenities"
      title="More than an address."
      intro="Twenty planned amenities, from a swimming pool, gym, spa and sauna to a cinema, kids club, masjid and rooftop restaurant, with 24/7 security and power backup."
      points={['Wellness: swimming pool, gym, spa, sauna and yoga centre', 'Family: playland, trampoline park, gaming zone and kids club', 'Business: business centre and conference hall', 'Peace of mind: 24/7 security, IBMS and power backup']}
    >
      <AmenitiesSection images={[...LEISURE_IMAGES.slice(0, 2), FOOD_COURT_IMAGE, PARKING_IMAGE]} />
      <AccessSection />
    </ArchitectureLanding>
  );
}
