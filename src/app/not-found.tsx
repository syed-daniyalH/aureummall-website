import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';

export default function NotFound() {
  return (
    <section className="recoveryPage">
      <div className="container recoveryCard">
        <Eyebrow>404 / Not found</Eyebrow>
        <h1>This path has not been opened yet.</h1>
        <p>Return to the Aureum showroom or use the Unit Finder to choose a clear next direction.</p>
        <div className="actions"><ButtonLink href="/" variant="dark">Back to homepage</ButtonLink><ButtonLink href="/unit-finder" variant="secondary" className="onLight">Open Unit Finder</ButtonLink></div>
      </div>
    </section>
  );
}
