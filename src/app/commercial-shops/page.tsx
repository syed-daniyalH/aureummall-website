import { WordPressPropertyPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ShowcaseGallery } from '@/features/project-showcase/components/ProjectShowcase';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { FOOD_COURT_IMAGE, LEISURE_IMAGES, MALL_IMAGES } from '@/features/project-showcase/images';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata = createRouteMetadata('/commercial-shops');

export default function Page() {
  return (
    <WordPressPropertyPage
      eyebrow="Commercial / retail and food court"
      title="Room to make an impression."
      intro="Three retail levels around a central atrium, with tall ceilings, wide passages and a glass facade visible from Ring Road. Shops from 172 sq ft and PKR 7,740,000."
      image={MALL_IMAGES[0].src}
      imageAlt={MALL_IMAGES[0].alt}
      features={['Ceiling heights of 26 ft (ground) and 18 ft (first and second)', 'A 15,224 sq ft grocery store, travelators and kiosks', 'Separate commercial entrance and 2 dedicated elevators', 'Food court beside an 11,948 sq ft playland and trampoline park']}
      interest="commercial_shop"
      registerLabel="Commercial enquiry"
    >
      <section className="section showcaseSection">
        <div className="container">
          <SectionHeading eyebrow="Shopping at Aureum" title="Display. Welcome. Inspire." description="Retail, dining and leisure that give families more reasons to visit and stay." />
          <ShowcaseGallery images={[...MALL_IMAGES, FOOD_COURT_IMAGE, ...LEISURE_IMAGES.slice(0, 2)]} branded />
        </div>
      </section>
      <BrochureDownloads only={['commercial', 'master-catalogue']} />
    </WordPressPropertyPage>
  );
}
