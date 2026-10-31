import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ArchitectureLanding } from '@/features/site-architecture/components/ArchitectureLanding';
import { FloorPlanGallery, ShowcaseGallery } from '@/features/project-showcase/components/ProjectShowcase';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { CUTAWAY_IMAGES, FLOOR_PLAN_IMAGES } from '@/features/project-showcase/images';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata = createRouteMetadata('/floor-plans');

export default function Page() {
  return (
    <ArchitectureLanding
      eyebrow="Floor plans / Aureum"
      title="Understand the spaces before you visit."
      intro="Review every level of Aureum, from the two basement parking levels and three retail floors to the food court and the typical residential floor. Tap any plan to open it at full size."
      points={['Ground, first, second and third (food court) floors', 'Typical residential floor: 6th to 12th', 'Two basement parking levels', 'Representative apartment layouts']}
      ctaHref="#plans"
      ctaLabel="See the floor plans"
    >
      <section className="section showcaseSection" id="plans">
        <div className="container">
          <SectionHeading eyebrow="Floor by floor" title="Every level of the building." description="Plans follow the current project drawings and are subject to final approved drawings." />
          <FloorPlanGallery plans={FLOOR_PLAN_IMAGES} />
        </div>
      </section>
      <section className="section showcaseSection">
        <div className="container">
          <SectionHeading eyebrow="Apartments" title="Representative layouts." description="Layouts are illustrative and not to scale. Area and configuration vary by unit." />
          <ShowcaseGallery images={CUTAWAY_IMAGES} />
        </div>
      </section>
      <BrochureDownloads only={['master-catalogue', 'commercial']} />
    </ArchitectureLanding>
  );
}
