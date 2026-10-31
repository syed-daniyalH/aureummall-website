import { WordPressPropertyPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ShowcaseGallery } from '@/features/project-showcase/components/ProjectShowcase';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { CUTAWAY_IMAGES, RESIDENCE_IMAGES } from '@/features/project-showcase/images';

export const metadata = createRouteMetadata('/apartments/studio');

export default function Page() {
  return (
    <WordPressPropertyPage
      eyebrow="Apartments / studio · 426 sq ft"
      title="A smart, efficient first home."
      intro="Studio apartments of 426 sq ft for young professionals and first-time buyers, from PKR 8,307,000 with 10% booking (PKR 830,700) and monthly installments of PKR 83,070."
      image={CUTAWAY_IMAGES[0].src}
      imageAlt={CUTAWAY_IMAGES[0].alt}
      features={['426 sq ft at PKR 19,500 per sq ft', '10% booking, 15% confirmation, 55 monthly installments', 'Indicative possession in 3.5 years', 'Private residential entrance and lifts']}
      interest="apartment"
      registerLabel="Studio apartments"
    >
      <section className="section showcaseSection"><div className="container"><ShowcaseGallery images={[RESIDENCE_IMAGES[0], RESIDENCE_IMAGES[3], RESIDENCE_IMAGES[2]]} /></div></section>
      <BrochureDownloads only={['residential']} />
    </WordPressPropertyPage>
  );
}
