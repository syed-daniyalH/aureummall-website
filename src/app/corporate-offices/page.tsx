import { WordPressPropertyPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { AccessSection, AmenitiesSection, ShowcaseGallery } from '@/features/project-showcase/components/ProjectShowcase';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { EXTERIOR_NIGHT, OFFICE_IMAGES } from '@/features/project-showcase/images';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata = createRouteMetadata('/corporate-offices');

export default function Page() {
  return (
    <WordPressPropertyPage
      eyebrow="Corporate / office spaces"
      title="Full glass. Ring Road views."
      intro="Every office has full-glass frontage on the main side of Aureum, facing Ring Road. Offices of 1,007 to 2,595 sq ft at PKR 25,000 per sq ft, from PKR 25,175,000, and every owner receives a lifetime amenities membership."
      image={OFFICE_IMAGES[0].src}
      imageAlt={OFFICE_IMAGES[0].alt}
      features={['1,007 / 1,009 / 1,295 / 2,595 sq ft at PKR 25,000 per sq ft', 'Lifetime complimentary amenities membership for owners', 'Separate entrance lobby and dedicated elevators', '4.5-year plan with 10% booking; possession in 3.5 years']}
      interest="corporate_office"
      registerLabel="Corporate office enquiry"
    >
      <section className="section showcaseSection">
        <div className="container">
          <SectionHeading eyebrow="Inside the offices" title="A premium place to work." description="Natural light from the full-height glass curtain wall, a separate office arrival and lobby, and basement parking for owners, staff and visitors." />
          <ShowcaseGallery images={[...OFFICE_IMAGES, EXTERIOR_NIGHT]} />
        </div>
      </section>
      <AccessSection />
      <AmenitiesSection />
      <BrochureDownloads only={['offices', 'master-catalogue', 'factsheet']} />
    </WordPressPropertyPage>
  );
}
