import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SITE } from '@/lib/site';
import { LOCATION_MAP } from '@/features/project-showcase/images';
import { LiveMap } from './LiveMap';
import { SiteUpdates } from './SiteUpdates';
import { GROUNDBREAKING, SITE_UPDATES } from '../site-updates';

function LocationSection() {
  return (
    <section className="section trustLocationSection" id="trust-location-workspace">
      <div className="container">
        <SectionHeading eyebrow="The place / Lahore" title="Aureum keeps you connected." description="Ideally located in Bahria Town Lahore, Aureum Mall & Residences brings peaceful living, modern convenience and city connectivity together." />
        <div className="trustLocationGrid">
          <div className="trustFactList">
            <article className="trustFactCard"><Eyebrow>Address</Eyebrow><h3>{SITE.location}</h3><p>A landmark mixed-use destination combining residences, retail, food courts and offices.</p></article>
            <article className="trustFactCard"><Eyebrow>Minutes from everything</Eyebrow><h3>0 min from Bahria Town · 25 min from Lahore Airport</h3><p>At the Bahria Town Ring Road Interchange with SL-3 connectivity, and visible from Ring Road. Nearby: ICON Mall &amp; Towers, ABS Mall &amp; Residency and Dubai Islamic Bank.</p></article>
            <article className="trustFactCard"><Eyebrow>Plan your visit</Eyebrow><h3>Speak with Aureum</h3><p>Contact the project team for current directions, availability and a suitable time to visit.</p><ButtonLink href="/contact" variant="dark">Contact the team <span aria-hidden="true">↗</span></ButtonLink></article>
          </div>
          <figure className="trustMapFigure">
            <a href={LOCATION_MAP.src} target="_blank" rel="noopener" aria-label="Open the full-size location map"><Image src={LOCATION_MAP.src} alt={LOCATION_MAP.alt} width={1448} height={1086} sizes="(max-width: 900px) 92vw, 600px" /></a>
            <figcaption>{LOCATION_MAP.note}</figcaption>
          </figure>
        </div>
        <LiveMap className="trustLiveMap" />
        <div className="trustSourceBar"><Eyebrow>Location information</Eyebrow><p>The project is located at {SITE.location}. Contact the Aureum team for current directions and visit arrangements.</p></div>
      </div>
    </section>
  );
}

export function ConstructionUpdatesSection({ standalone = false }: { standalone?: boolean }) {
  const content = (
    <section className="section trustUpdatesSection" id="construction-register">
      <div className="container">
        <SectionHeading eyebrow="Site progress" title="The future takes shape." description="Dated video from the site, newest first. Tap any video to watch it with sound." />
        <SiteUpdates limit={standalone ? undefined : 3} />
        <div className="actions">
          {standalone ? null : <ButtonLink href="/construction-updates" variant="dark">See every site update</ButtonLink>}
          <ButtonLink href="/contact?intent=site_visit#enquiry" variant={standalone ? 'dark' : 'secondary'} className={standalone ? undefined : 'onLight'}>Book a site visit</ButtonLink>
        </div>
      </div>
    </section>
  );

  if (!standalone) return content;
  return <><section className="section trustHero"><div className="container trustHeroGrid"><div><Eyebrow>Project updates</Eyebrow><h1>Follow Aureum as it takes shape.</h1><p>Construction began on {GROUNDBREAKING.dateLabel}. Watch dated video from the site, then book a visit to see it for yourself.</p><ButtonLink href="#construction-register">Watch the latest update <span aria-hidden="true">↓</span></ButtonLink></div><div className="trustHeroStamp" aria-hidden="true"><span>Video updates from site</span><strong>{String(SITE_UPDATES.length).padStart(2, '0')}</strong></div></div></section>{content}</>;
}

function TrustFaqSection() {
  return <section className="section trustFaqSection"><div className="container"><SectionHeading eyebrow="Clear answers" title="Everything starts with the right information." description="Explore the project pathways, then contact the Aureum team for current details." /><div className="trustFaqList"><details className="trustFaqItem"><summary>Where is Aureum located?<span aria-hidden="true">+</span></summary><p>{SITE.location}</p></details><details className="trustFaqItem"><summary>What can I explore at Aureum?<span aria-hidden="true">+</span></summary><p>Aureum brings together 1 &amp; 2 bed apartments, commercial shops, corporate offices, food courts, parking and everyday amenities.</p></details><details className="trustFaqItem"><summary>Where can I see the payment plan?<span aria-hidden="true">+</span></summary><p>Visit the <a href="/payment-plans">Payment Plans</a> page or contact the Aureum team for the latest details.</p></details></div></div></section>;
}

export function TrustLocationExperience() {
  return <><section className="section trustHero"><div className="container trustHeroGrid"><div><Eyebrow>Location / Aureum Mall</Eyebrow><h1>Know the place. Plan your visit.</h1><p>Find Aureum Mall &amp; Residences in Bahria Town Lahore and connect with the project team.</p><ButtonLink href="#trust-location-workspace">Explore the location <span aria-hidden="true">↓</span></ButtonLink></div><div className="trustHeroStamp" aria-hidden="true"><span>Lahore / Bahria Town</span><strong>01</strong></div></div></section><LocationSection /><ConstructionUpdatesSection /><TrustFaqSection /></>;
}
