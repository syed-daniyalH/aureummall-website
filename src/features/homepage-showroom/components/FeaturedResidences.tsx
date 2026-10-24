import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/TextLink';
import { FEATURED_RESIDENCES } from '../data';

export function FeaturedResidences() {
  return (
    <section className="section soft" aria-labelledby="featured-residences-heading">
      <div className="container">
        <SectionHeading
          id="featured-residences-heading"
          className="sectionIntro"
          eyebrow="Featured residences"
          title="Choose the scale of everyday life that feels right."
          description="Start with a clear residential category. Sizes, plans and prices will be connected from the approved register in the property catalogue module."
        />
        <div className="residenceGrid">
          {FEATURED_RESIDENCES.map((item) => (
            <article className="residenceCard" key={item.type}>
              <div className="residenceVisual" aria-hidden="true"><span>{item.index}</span><span>Media slot / approved render</span></div>
              <div className="residenceBody">
                <Eyebrow>{item.type} apartment</Eyebrow>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <TextLink href={item.href}>View residences</TextLink>
              </div>
            </article>
          ))}
        </div>
        <div className="sectionAction"><ButtonLink href="/apartments" variant="dark">Explore all residences <span aria-hidden="true">↗</span></ButtonLink></div>
      </div>
    </section>
  );
}
