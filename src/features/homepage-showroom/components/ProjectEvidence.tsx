import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';

const EVIDENCE_LINKS = [
  { eyebrow: 'Location', title: 'See the setting clearly.', description: 'Open the location pathway for the approved map, approach information and source-backed context.', href: '/location', label: 'View location' },
  { eyebrow: 'Construction', title: 'Follow the project as it moves.', description: 'Publish dated progress updates with real project media and a clear stage history.', href: '/construction-updates', label: 'View updates' },
  { eyebrow: 'Trust', title: 'Keep project information close.', description: 'Make company facts and approved documents easy to find when they are ready to publish.', href: '/contact', label: 'Request information' },
] as const;

export function ProjectEvidence() {
  return (
    <section className="section evidenceSection" aria-labelledby="evidence-heading">
      <div className="container">
        <SectionHeading
          id="evidence-heading"
          className="sectionIntro"
          eyebrow="Proof, not noise"
          title="A premium experience still has to answer serious questions."
          description="Location, progress and trust information are part of the showroom—not hidden after the sales pitch."
        />
        <div className="evidenceGrid">
          {EVIDENCE_LINKS.map((item) => (
            <article className="evidenceCard" key={item.eyebrow}>
              <Eyebrow>{item.eyebrow}</Eyebrow>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ButtonLink href={item.href} variant="dark">{item.label} <span aria-hidden="true">↗</span></ButtonLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
