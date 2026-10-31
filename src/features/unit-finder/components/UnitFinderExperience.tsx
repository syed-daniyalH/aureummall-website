import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';

const SPACE_PATHS = [
  {
    label: '01',
    title: 'Apartments',
    description: 'Explore 1 & 2 bed apartments designed for peaceful living, modern convenience and everyday connection.',
    href: '/apartments',
  },
  {
    label: '02',
    title: 'Commercial shops',
    description: 'Discover a visible retail destination with food courts, customer access and wide parking.',
    href: '/commercial-shops',
  },
  {
    label: '03',
    title: 'Corporate offices',
    description: 'Find a professional address alongside the residential and retail layers of Aureum Mall.',
    href: '/corporate-offices',
  },
] as const;

export function UnitFinderExperience() {
  return (
    <>
      <section className="wpInternalHero section">
        <div className="container wpInternalHeroGrid">
          <div>
            <Eyebrow>Find your space</Eyebrow>
            <h1>Explore the right pathway at Aureum.</h1>
            <p>Choose the part of Aureum Mall &amp; Residences that fits your plans. Contact the team for the latest availability, pricing and next steps.</p>
            <ButtonLink href="/contact">Talk to the Aureum team <span aria-hidden="true">↗</span></ButtonLink>
          </div>
          <div className="wpInternalHeroImage"><Image src="/assets/aureum/approved/mall/aureum-mall-atrium.webp" alt="Aureum Mall central atrium" fill priority sizes="(max-width: 900px) 92vw, 560px" /></div>
        </div>
      </section>

      <section className="section wpPropertySection">
        <div className="container">
          <SectionHeading eyebrow="Aureum / choose a pathway" title="Start with the space that matters to you." description="Aureum brings living, working and retail together at Bahria Town, Ring Road Interchange, Lahore." />
          <ul className="wpPropertyFeatures">
            {SPACE_PATHS.map((space) => <li key={space.title}><span>{space.label}</span><div><strong>{space.title}</strong><p>{space.description}</p><ButtonLink href={space.href} variant="secondary">Explore {space.title.toLowerCase()} <span aria-hidden="true">↗</span></ButtonLink></div></li>)}
          </ul>
        </div>
      </section>

      <section className="section wpInquirySection">
        <div className="container wpInquiryGrid">
          <div><Eyebrow>Current availability</Eyebrow><h2>Let the project team guide your next step.</h2><p>Share your requirements and receive the latest project information directly from Aureum Mall &amp; Residences.</p></div>
          <div className="wpInquiryCard"><ButtonLink href="/contact" variant="dark">Contact Aureum <span aria-hidden="true">↗</span></ButtonLink></div>
        </div>
      </section>
    </>
  );
}
