import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SITE } from '@/lib/site';

function LocationSection() {
  return (
    <section className="section trustLocationSection" id="trust-location-workspace">
      <div className="container">
        <SectionHeading eyebrow="The place / Lahore" title="Aureum keeps you connected." description="Ideally located in Bahria Town Lahore, Aureum Mall & Residences brings peaceful living, modern convenience and city connectivity together." />
        <div className="trustLocationGrid">
          <div className="trustFactList">
            <article className="trustFactCard"><Eyebrow>Address</Eyebrow><h3>{SITE.location}</h3><p>A landmark mixed-use destination combining residences, retail, food courts and offices.</p></article>
            <article className="trustFactCard"><Eyebrow>Nearby connection</Eyebrow><h3>Ring Road Interchange</h3><p>Located beside the Ring Road connection in Bahria Town Lahore for convenient access across the city.</p></article>
            <article className="trustFactCard"><Eyebrow>Plan your visit</Eyebrow><h3>Speak with Aureum</h3><p>Contact the project team for current directions, availability and a suitable time to visit.</p><ButtonLink href="/contact" variant="dark">Contact the team <span aria-hidden="true">↗</span></ButtonLink></article>
          </div>
          <div className="trustMapPanel trustMapPanelSource" role="img" aria-label="Aureum Mall location map">
            <Image className="trustMapImage" src="/assets/aureum/map.png" alt="Aureum Mall location map in Bahria Town Lahore" fill sizes="(max-width: 900px) 92vw, 560px" />
            <div className="trustMapOverlay">
              <div className="trustMapTop"><span>Aureum Mall &amp; Residences</span><span>Lahore</span></div>
              <div className="trustMapCenter"><span aria-hidden="true">◎</span><strong>{SITE.location}</strong><p>Explore the location and contact the team for the latest approach information.</p></div>
              <div className="trustMapBottom"><span>Address</span><span>Ring Road</span><span>Bahria Town</span></div>
            </div>
          </div>
        </div>
        <div className="trustSourceBar"><Eyebrow>Location information</Eyebrow><p>The project is located at {SITE.location}. Contact the Aureum team for current directions and visit arrangements.</p></div>
      </div>
    </section>
  );
}

export function ConstructionUpdatesSection({ standalone = false }: { standalone?: boolean }) {
  const content = (
    <section className="section trustUpdatesSection" id="construction-register">
      <div className="container">
        <SectionHeading eyebrow="Latest project update" title="The future takes shape." description="Follow Aureum Mall & Residences as the project moves forward." />
        <div className="trustTimeline">
          <article className="trustTimelineItem"><span>1 October 2026</span><div><Eyebrow>Aureum Mall &amp; Residences Groundbreaking</Eyebrow><p>Every landmark begins with a vision, but it is construction that turns that vision into reality. Aureum Mall &amp; Residences is taking shape as a destination for living, business and everyday experiences.</p><ButtonLink href="/contact" variant="dark">Talk to the team <span aria-hidden="true">↗</span></ButtonLink></div></article>
        </div>
      </div>
    </section>
  );

  if (!standalone) return content;
  return <><section className="section trustHero"><div className="container trustHeroGrid"><div><Eyebrow>Project updates</Eyebrow><h1>Follow Aureum as it takes shape.</h1><p>Read the latest project progress and contact the team for current information.</p><ButtonLink href="#construction-register">Read the latest update <span aria-hidden="true">↓</span></ButtonLink></div><div className="trustHeroStamp" aria-hidden="true"><span>Progress / updates</span><strong>01</strong></div></div></section>{content}</>;
}

function TrustFaqSection() {
  return <section className="section trustFaqSection"><div className="container"><SectionHeading eyebrow="Clear answers" title="Everything starts with the right information." description="Explore the project pathways, then contact the Aureum team for current details." /><div className="trustFaqList"><details className="trustFaqItem"><summary>Where is Aureum located?<span aria-hidden="true">+</span></summary><p>{SITE.location}</p></details><details className="trustFaqItem"><summary>What can I explore at Aureum?<span aria-hidden="true">+</span></summary><p>Aureum brings together 1 &amp; 2 bed apartments, commercial shops, corporate offices, food courts, parking and everyday amenities.</p></details><details className="trustFaqItem"><summary>Where can I see the payment plan?<span aria-hidden="true">+</span></summary><p>Visit the <a href="/payment-plans">Payment Plans</a> page or contact the Aureum team for the latest details.</p></details></div></div></section>;
}

export function TrustLocationExperience() {
  return <><section className="section trustHero"><div className="container trustHeroGrid"><div><Eyebrow>Location / Aureum Mall</Eyebrow><h1>Know the place. Plan your visit.</h1><p>Find Aureum Mall &amp; Residences in Bahria Town Lahore and connect with the project team.</p><ButtonLink href="#trust-location-workspace">Explore the location <span aria-hidden="true">↓</span></ButtonLink></div><div className="trustHeroStamp" aria-hidden="true"><span>Lahore / Bahria Town</span><strong>01</strong></div></div></section><LocationSection /><ConstructionUpdatesSection /><TrustFaqSection /></>;
}
