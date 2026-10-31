import { WordPressPropertyPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ShowcaseGallery } from '@/features/project-showcase/components/ProjectShowcase';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { RESIDENCE_IMAGES } from '@/features/project-showcase/images';

export const metadata = createRouteMetadata('/apartments/1-bed');

export default function Page() {
  return (
    <WordPressPropertyPage
      eyebrow="Apartments / one bedroom · 622 / 658 sq ft"
      title="A separate bedroom and living area."
      intro="One-bedroom apartments of 622 and 658 sq ft, ideal for couples and working from home, from PKR 12,751,000 with 10% booking and monthly installments from PKR 127,510."
      image={RESIDENCE_IMAGES[1].src}
      imageAlt={RESIDENCE_IMAGES[1].alt}
      features={['622 or 658 sq ft at PKR 20,500 per sq ft', '10% booking, 15% confirmation, 55 monthly installments', 'Indicative possession in 3.5 years', 'Private residential entrance and lifts']}
      interest="apartment"
      registerLabel="One bedroom apartments"
    >
      <section className="section showcaseSection"><div className="container"><ShowcaseGallery images={[RESIDENCE_IMAGES[1], RESIDENCE_IMAGES[4], RESIDENCE_IMAGES[0]]} /></div></section>
      <BrochureDownloads only={['residential']} />
    </WordPressPropertyPage>
  );
}
