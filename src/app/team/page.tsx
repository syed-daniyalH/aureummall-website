import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { LeadershipSection, TeamDirectory } from '@/features/project-showcase/components/ProjectShowcase';
import { SITE } from '@/lib/site';
import { callHref } from '@/lib/whatsapp';

export const metadata = createRouteMetadata('/team');

const TEAM_PHOTO = '/assets/aureum/approved/team/aureum-sales-team.webp';

export default function TeamPage() {
  return (
    <>
      <section className="wpInternalHero section">
        <div className="container wpInternalHeroGrid">
          <div>
            <Eyebrow>Our team / Aureum Mall &amp; Residences</Eyebrow>
            <h1>Meet the Aureum team.</h1>
            <p>The leadership behind the project and the sales and project team who will show you the site, explain the payment plan and answer your questions.</p>
            <div className="actions">
              <ButtonLink href="#team">Meet the team <span aria-hidden="true">↓</span></ButtonLink>
              <ButtonLink href="/contact?intent=site_visit#enquiry" variant="secondary">Book a visit</ButtonLink>
            </div>
          </div>
          <div className="wpInternalHeroImage"><Image src={TEAM_PHOTO} alt="The Aureum sales team in front of the Aureum Mall site hoarding" fill priority sizes="(max-width: 900px) 92vw, 560px" /></div>
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
