import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ArchitectureLanding } from '@/features/site-architecture/components/ArchitectureLanding';
import { ShowcaseGallery } from '@/features/project-showcase/components/ProjectShowcase';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { FLOOR_PLAN_IMAGES, FOOD_COURT_IMAGE, LEISURE_IMAGES } from '@/features/project-showcase/images';

export const metadata = createRouteMetadata('/food-court');

export default function Page() {
  return (
    <ArchitectureLanding
      eyebrow="Food court / third floor · 25 ft"
      title="Dine. Gather. Return."
      intro="Food court units of around 301 sq ft on the third floor, beside an 11,948 sq ft playland and a 6,329 sq ft trampoline park, so parents can eat while children play."
      points={['Food court units of around 301 sq ft, from PKR 21,070,000', '11,948 sq ft playland and 6,329 sq ft trampoline park on the same level', '25 ft ceiling height and shared seating', '3.5-year plan with 10% booking; possession in 2.5 years']}
    >
      <section className="section showcaseSection"><div className="container"><ShowcaseGallery images={[FOOD_COURT_IMAGE, ...LEISURE_IMAGES, FLOOR_PLAN_IMAGES[2]]} branded /></div></section>
      <BrochureDownloads only={['commercial']} />
    </ArchitectureLanding>
  );
}
