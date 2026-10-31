import { WordPressPropertyPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ApartmentTypesSection, ShowcaseGallery } from '@/features/project-showcase/components/ProjectShowcase';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { CUTAWAY_IMAGES, RESIDENCE_IMAGES } from '@/features/project-showcase/images';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata = createRouteMetadata('/apartments');

export default function Page() {
  return (
    <WordPressPropertyPage
      eyebrow="Residential / studios, 1 & 2 bedrooms"
      title="Live above the ordinary."
      intro="Studios, one- and two-bedroom apartments and a separate Premium Glass Collection on the 6th to 12th floors, with a private residential entrance away from the mall."
      image={RESIDENCE_IMAGES[0].src}
      imageAlt={RESIDENCE_IMAGES[0].alt}
      features={['Studios from 426 sq ft, from PKR 8,307,000', 'Private entrance, 3 dedicated lifts and a 28 × 50 ft lobby', 'Homes around an open-to-sky courtyard', '4.5-year plan with 10% booking']}
      interest="apartment"
      registerLabel="Apartment enquiry"
    >
      <ApartmentTypesSection />
      <section className="section showcaseSection">
        <div className="container">
          <SectionHeading eyebrow="Interiors" title="Light, space and calm." description="Floor-to-ceiling glazing, open living and dining areas and quiet, hotel-style corridors." />
          <ShowcaseGallery images={[...CUTAWAY_IMAGES, ...RESIDENCE_IMAGES]} />
        </div>
      </section>
      <BrochureDownloads only={['residential', 'master-catalogue']} />
    </WordPressPropertyPage>
  );
}
