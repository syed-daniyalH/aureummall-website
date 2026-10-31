import { WordPressPropertyPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ShowcaseGallery } from '@/features/project-showcase/components/ProjectShowcase';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { CUTAWAY_IMAGES, RESIDENCE_IMAGES } from '@/features/project-showcase/images';

export const metadata = createRouteMetadata('/apartments/2-bed');

export default function Page() {
  return (
    <WordPressPropertyPage
      eyebrow="Apartments / two bedrooms · from 1,103 sq ft"
      title="Room for family life."
      intro="Two-bedroom apartments from 1,103 sq ft with space for a guest room or study, from PKR 22,611,500 with 10% booking and monthly installments from PKR 226,115."
      image={CUTAWAY_IMAGES[1].src}
      imageAlt={CUTAWAY_IMAGES[1].alt}
      features={['1,103 or 1,316 sq ft at PKR 20,500 per sq ft', 'Premium Glass Collection: 1,491 and 1,727 sq ft, quoted individually', '10% booking, 15% confirmation, 55 monthly installments', 'Indicative possession in 3.5 years']}
      interest="apartment"
      registerLabel="Two bedroom apartments"
    >
      <section className="section showcaseSection"><div className="container"><ShowcaseGallery images={[RESIDENCE_IMAGES[3], RESIDENCE_IMAGES[1], RESIDENCE_IMAGES[5]]} /></div></section>
      <BrochureDownloads only={['residential']} />
    </WordPressPropertyPage>
  );
}
