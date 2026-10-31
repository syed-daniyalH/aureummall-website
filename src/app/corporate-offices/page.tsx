import { WordPressPropertyPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { AccessSection, AmenitiesSection } from '@/features/project-showcase/components/ProjectShowcase';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { EXTERIOR_NIGHT } from '@/features/project-showcase/images';

export const metadata = createRouteMetadata('/corporate-offices');

export default function Page() {
  return (
    <WordPressPropertyPage
      eyebrow="Corporate / office spaces"
      title="Full glass. Ring Road views."
      intro="Every office has full-glass frontage on the main side of Aureum, facing Ring Road. Offices of 1,007 to 2,595 sq ft at PKR 23,500 per sq ft, and every owner receives a lifetime amenities membership."
      image={EXTERIOR_NIGHT.src}
      imageAlt={EXTERIOR_NIGHT.alt}
      features={['1,007 / 1,009 / 1,295 / 2,595 sq ft at PKR 23,500 per sq ft', 'Lifetime complimentary amenities membership for owners', 'Separate entrance lobby and dedicated elevators', '4.5-year plan with 10% booking; possession in 3.5 years']}
      interest="corporate_office"
      registerLabel="Corporate office enquiry"
    >
      <AccessSection />
      <AmenitiesSection />
      <BrochureDownloads only={['offices', 'master-catalogue']} />
    </WordPressPropertyPage>
  );
}
