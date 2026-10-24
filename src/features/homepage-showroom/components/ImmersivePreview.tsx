import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ImmersivePreview() {
  return (
    <section className="section immersiveSection" aria-labelledby="immersive-heading">
      <div className="container immersiveGrid">
        <div className="immersiveVisual" aria-hidden="true"><span>360° / EXPERIENCE SLOT</span><strong>Move through the idea of home.</strong><i /></div>
        <div className="immersiveCopy">
          <SectionHeading
            id="immersive-heading"
            eyebrow="An immersive next step"
            title="Let the space become familiar before the visit."
            description="This presentation slot is ready for an approved 360° apartment experience. Until then, it stays honest about the media still required."
          />
          <Eyebrow>Coming with approved media</Eyebrow>
          <ButtonLink href="/immersive-media" variant="dark">Open media experience <span aria-hidden="true">↗</span></ButtonLink>
        </div>
      </div>
    </section>
  );
}
