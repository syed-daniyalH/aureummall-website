import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function Hero() {
  return (
    <section className="hero">
      <div className="heroBackdrop" aria-hidden="true" />
      <div className="container heroGrid">
        <div className="heroContent">
          <Eyebrow>The perfect blend of serenity and luxury</Eyebrow>
          <h1>Aureum Mall <span>&amp; Residences</span></h1>
          <p className="heroLead">A 16 kanal landmark of shopping, dining, entertainment, workplaces, a luxury hotel and residences at the Bahria Town Ring Road Interchange, Lahore.</p>
          <div className="actions">
            <ButtonLink href="/about">Discover Aureum <span aria-hidden="true">↗</span></ButtonLink>
            <ButtonLink href="/payment-plans" variant="secondary">Explore payment plan</ButtonLink>
          </div>
          <div className="heroProof" aria-label="Project information">
            <span><strong>16</strong><small>Kanal landmark</small></span>
            <span><strong>0 min</strong><small>From Bahria Town</small></span>
            <span><strong>25 min</strong><small>From Lahore airport</small></span>
          </div>
        </div>
        <div className="heroVisual" aria-label="Aureum Mall project profile">
          <div className="heroVisualFrame">
            <Image src="/assets/aureum/approved/renders/aureum-exterior-night.webp" alt="Aureum Mall and Residences at night, with the glass atrium entrance" fill priority sizes="(max-width: 900px) 90vw, 520px" />
            <span className="visualLabel">Aureum / artist’s impression</span><span className="visualLine" /><span className="visualCaption">The perfect blend of serenity and luxury.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
