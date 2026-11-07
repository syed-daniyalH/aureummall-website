import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { LeadershipSection, salesTeam, TeamDirectory } from '@/features/project-showcase/components/ProjectShowcase';
import { SITE } from '@/lib/site';
import { callHref } from '@/lib/whatsapp';

export const metadata = createRouteMetadata('/team');

/** The hero shows the team itself: a mosaic of six sales portraits rather than one person. */
const HERO_FACES = salesTeam().slice(0, 6);

export default function TeamPage() {
  return (
    <>
      <section className="wpInternalHero section">
        <div className="container wpInternalHeroGrid">
          <div>
            <Eyebrow>Our team / Aureum Mall &amp; Residences</Eyebrow>
            <h1>Meet the Aureum team.</h1>
            <p>The leadership shaping Aureum, and the advisors who guide you personally from your first site visit through every stage of your investment, backed by a dedicated marketing and creative team.</p>
            <div className="actions">
              <ButtonLink href="#team">Meet the team <span aria-hidden="true">↓</span></ButtonLink>
              <ButtonLink href="/contact?intent=site_visit#enquiry" variant="secondary">Book a visit</ButtonLink>
            </div>
          </div>
          <div className="wpInternalHeroImage teamHeroMosaic" role="img" aria-label={`Portraits of the Aureum sales team: ${HERO_FACES.map((m) => m.name).join(', ')}`}>
            {HERO_FACES.map((member, index) => (
              <div className="teamHeroTile" key={member.id}>
                <Image src={member.image} alt="" fill priority={index < 3} sizes="(max-width: 900px) 31vw, 190px" style={{ objectPosition: member.position ?? '50% 18%' }} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <LeadershipSection />
      <TeamDirectory />
      <section className="section teamCta" aria-labelledby="team-cta-heading">
        <div className="container teamCtaInner">
          <div>
            <Eyebrow>Visit the site</Eyebrow>
            <h2 id="team-cta-heading">Prefer to meet in person?</h2>
            <p>Book a visit and a member of the team will meet you at the Bahria Town Ring Road Interchange.</p>
          </div>
          <div className="actions">
            <ButtonLink href="/contact?intent=site_visit#enquiry">Book a visit</ButtonLink>
            <a className="button secondary" href={callHref}>Call {SITE.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </>
  );
}
