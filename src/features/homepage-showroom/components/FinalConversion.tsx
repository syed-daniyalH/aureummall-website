import { LeadForm } from '@/components/LeadForm';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function FinalConversion() {
  return (
    <section className="section soft finalConversion" aria-labelledby="final-conversion-heading">
      <div className="container split">
        <div>
          <Eyebrow>Find the right space at Aureum</Eyebrow>
          <h2 id="final-conversion-heading">Make the next step feel simple.</h2>
          <p>The existing form remains the starting interaction. Its final delivery destination will be connected only after the approved website workflow is confirmed.</p>
          <div className="actions"><ButtonLink href="/payment-plans" variant="dark">Get Payment Plan</ButtonLink><ButtonLink href="/contact" variant="secondary" className="onLight">Book a Site Visit</ButtonLink></div>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
