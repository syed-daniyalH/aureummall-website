import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PROJECT_SNAPSHOT } from '../data';

export function ProjectSnapshot() {
  return (
    <section className="section snapshotSection" aria-labelledby="snapshot-heading">
      <div className="container">
        <SectionHeading
          id="snapshot-heading"
          className="sectionIntro"
          eyebrow="The project / at a glance"
          title="The details people need before the beautiful details."
          description="A concise, evidence-first snapshot keeps the first visit useful and easy to trust."
        />
        <div className="snapshotGrid">
          {PROJECT_SNAPSHOT.map((fact) => (
            <article className="snapshotCard" key={fact.label}>
              <Eyebrow>{fact.label}</Eyebrow>
              <strong>{fact.value}</strong>
              <p>{fact.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
