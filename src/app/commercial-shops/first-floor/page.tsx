import { WordPressPropertyPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ShowcaseGallery } from '@/features/project-showcase/components/ProjectShowcase';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { MALL_IMAGES } from '@/features/project-showcase/images';

export const metadata = createRouteMetadata('/commercial-shops/first-floor');

export default function Page() {
  return (
    <WordPressPropertyPage
      eyebrow="Commercial / first floor · 18 ft"
      title="First floor shops at Aureum Mall."
      intro="Shops from 172 to 707 sq ft around the central atrium, anchored by a 15,224 sq ft grocery store. From PKR 7,740,000 at PKR 45,000 per sq ft."
      image={MALL_IMAGES[1].src}
      imageAlt={MALL_IMAGES[1].alt}
      features={['Shops from 172 to 707 sq ft', 'Anchored by a 15,224 sq ft grocery store', '3.5-year plan: 10% booking, 42 monthly + half-yearly installments', 'Indicative possession in 2.5 years']}
      interest="commercial_shop"
      registerLabel="First floor shops"
    >
      <section className="section showcaseSection"><div className="container"><ShowcaseGallery images={[MALL_IMAGES[1], MALL_IMAGES[2]]} branded /></div></section>
      <BrochureDownloads only={['commercial']} />
    </WordPressPropertyPage>
  );
}
