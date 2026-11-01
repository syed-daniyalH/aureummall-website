import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { BackgroundFilm } from '@/features/immersive-media/components/BrandFilm';

export function Hero() {
  return (
    <section className="heroCinema" aria-labelledby="hero-title">
      <Image className="heroCinemaImage" src="/assets/aureum/approved/renders/aureum-exterior-night.webp" alt="Aureum Mall and Residences at night, with the glass atrium entrance" fill priority sizes="100vw" />
      <BackgroundFilm className="heroCinemaFilm" />
      <div className="heroCinemaShade" aria-hidden="true" />
      <div className="container heroCinemaInner">
        <p className="heroCinemaKicker">Bahria Town · Ring Road Interchange · Lahore</p>
        <h1 id="hero-title">Aureum Mall <span>&amp; Residences</span></h1>
        <p className="heroCinemaLead">A 16 kanal landmark of shopping, dining, workplaces, a luxury hotel and residences.</p>
        <div className="actions">
          <ButtonLink href="/about">Discover Aureum</ButtonLink>
          <ButtonLink href="/payment-plans" variant="secondary">View payment plans</ButtonLink>
        </div>
      </div>
      <div className="container heroCinemaFoot">
        <dl className="heroCinemaFacts" aria-label="Project information">
          <div><dt>Site</dt><dd>16 kanal</dd></div>
          <div><dt>Bahria Town</dt><dd>0 min</dd></div>
          <div><dt>Lahore airport</dt><dd>25 min</dd></div>
        </dl>
        <span className="heroCinemaNote">Artist’s impression</span>
      </div>
    </section>
  );
}
