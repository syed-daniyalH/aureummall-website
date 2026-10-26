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
          <p className="heroLead">Ideally located in Bahria Town Lahore, Aureum Mall &amp; Residences brings peaceful living, modern convenience and seamless connectivity together.</p>
          <div className="actions">
            <ButtonLink href="/about">Discover Aureum <span aria-hidden="true">↗</span></ButtonLink>
            <ButtonLink href="/payment-plans" variant="secondary">Explore payment plan</ButtonLink>
          </div>
          <div className="heroProof" aria-label="Project information">
            <span><strong>25+</strong><small>Years of experience</small></span>
            <span><strong>05</strong><small>Ways to experience Aureum</small></span>
            <span><strong>01</strong><small>Connected destination</small></span>
          </div>
        </div>
        <div className="heroVisual" aria-label="Aureum Mall project profile">
          <div className="heroVisualFrame">
            <Image src="/assets/aureum/approved/renders/aureum-exterior-ring-road-interchange.webp" alt="Aureum Mall and Residences exterior at the Ring Road Interchange" fill priority sizes="(max-width: 900px) 90vw, 520px" />
            <span className="visualLabel">Aureum / exterior render</span><span className="visualLine" /><span className="visualCaption">The perfect blend of serenity and luxury.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
