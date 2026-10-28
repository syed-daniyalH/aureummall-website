import Image from 'next/image';
import { LeadForm } from '@/components/LeadForm';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { NewsCardItem } from '@/features/news/posts';
import { NewsCardList } from './NewsCardList';

type PropertyPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  features: readonly string[];
  interest: 'apartment' | 'commercial_shop' | 'corporate_office';
  registerLabel: string;
};

export function WordPressPropertyPage({ eyebrow, title, intro, image, imageAlt, features, interest, registerLabel }: PropertyPageProps) {
  return (
    <>
      <section className="wpInternalHero section">
        <div className="container wpInternalHeroGrid">
          <div><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{intro}</p><ButtonLink href="#enquiry">Request details <span aria-hidden="true">↘</span></ButtonLink></div>
          <div className="wpInternalHeroImage"><Image src={image} alt={imageAlt} fill priority sizes="(max-width: 900px) 92vw, 560px" /></div>
        </div>
      </section>
      <section className="section wpPropertySection">
        <div className="container wpPropertyGrid">
          <div><SectionHeading eyebrow="Aureum / your next step" title="Clear information for the next decision." description="Aureum brings residential, commercial and office spaces together in one connected destination. Explore the pathway that fits your plans." /><ButtonLink href="/payment-plans" variant="dark">See payment plans <span aria-hidden="true">→</span></ButtonLink></div>
          <ul className="wpPropertyFeatures">{features.map((feature, index) => <li key={feature}><span>0{index + 1}</span><strong>{feature}</strong></li>)}</ul>
        </div>
      </section>
      <section className="section wpInquirySection" id="enquiry">
        <div className="container wpInquiryGrid">
          <div><Eyebrow>{registerLabel}</Eyebrow><h2>Bring your plans into one conversation.</h2><p>Tell us which space you are exploring and the Aureum team will share the latest details with you.</p><div className="wpContactFacts"><span>Bahria Town, Ring Road Interchange, Lahore</span><a href="tel:+923225551121">(0322) 555 1121</a><a href="mailto:hello@aureummall.info">hello@aureummall.info</a></div></div><div className="wpInquiryCard"><LeadForm defaultInterest={interest} /></div>
        </div>
      </section>
    </>
  );
}

export function WordPressAboutPage() {
  return (
    <>
      <section className="wpInternalHero section">
        <div className="container wpInternalHeroGrid">
          <div><Eyebrow>About Aureum Mall &amp; Residences</Eyebrow><h1>A destination shaped around serenity, luxury and connection.</h1><p>Aureum Mall &amp; Residences brings apartments, commercial spaces, food courts and offices together at Bahria Town, Ring Road Interchange, Lahore.</p><ButtonLink href="/building-explorer">Explore the building <span aria-hidden="true">↗</span></ButtonLink></div>
          <div className="wpInternalHeroImage"><Image src="/assets/aureum/approved/payment-plans/payment-plan-02.webp" alt="Aureum Mall and Residences project building" fill priority sizes="(max-width: 900px) 92vw, 560px" /></div>
        </div>
      </section>
      <section className="section wpAboutSection">
        <div className="container wpAboutGrid"><div><Eyebrow>The project / at a glance</Eyebrow><h2>One address, many ways to experience Aureum.</h2></div><div className="wpAboutCopy"><p>Aureum Mall &amp; Residences brings apartments, commercial spaces, food courts and offices together at Bahria Town, Ring Road Interchange, Lahore.</p><p>Discover thoughtfully designed spaces, world-class amenities and a connected destination shaped around serenity, luxury and convenience.</p></div></div>
      </section>
      <section className="section wpAboutStats"><div className="container"><div className="wpAboutStatsGrid">{[['25+', 'Years of experience'], ['05', 'Ways to experience Aureum'], ['210+', 'Total apartments'], ['80+', 'Quality features']].map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}</div></div></section>
    </>
  );
}

const GALLERY_ASSETS = [
  { src: '/assets/aureum/approved/payment-plans/payment-plan-02.webp', alt: 'Aureum Mall project profile artwork', label: 'Project profile' },
  { src: '/assets/aureum/approved/payment-plans/payment-plan-10.webp', alt: 'Aureum Mall payment plan artwork', label: 'Payment plans' },
  { src: '/assets/aureum/approved/payment-plans/payment-plan-07.webp', alt: 'Aureum Mall payment plan artwork detail', label: 'Investment view' },
  { src: '/assets/aureum/approved/floor-plans/aureum-ground-floor-plan.webp', alt: 'Aureum Mall ground floor plan', label: 'Ground floor plan' },
  { src: '/assets/aureum/approved/floor-plans/aureum-first-floor-plan.webp', alt: 'Aureum Mall first floor plan', label: 'First floor plan' },
  { src: '/assets/aureum/neighborhoods.jpg', alt: 'Aureum Mall neighbourhood context', label: 'Neighbourhoods' },
] as const;

export function WordPressGalleryPage() {
  return (
    <>
      <section className="wpInternalHero section"><div className="container wpSimpleHero"><Eyebrow>Gallery / project visuals</Eyebrow><h1>See the project from every useful angle.</h1><p>Explore the Aureum Mall &amp; Residences project profile, payment plans, floor plans and neighbourhood context.</p></div></section>
      <section className="section wpGallerySection"><div className="container"><SectionHeading eyebrow="Aureum project gallery" title="A visual library for the destination." description="Browse the spaces, plans and project information that help you understand Aureum before your visit." /><div className="wpGalleryGrid">{GALLERY_ASSETS.map((asset) => <article className="wpGalleryCard" key={asset.src}><div className="wpGalleryImage"><Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 700px) 92vw, 33vw" /></div><div><Eyebrow>{asset.label}</Eyebrow><h3>{asset.alt}</h3></div></article>)}</div></div></section>
    </>
  );
}

export function WordPressNewsPage({ items }: { items: readonly NewsCardItem[] }) {
  return (
    <>
      <section className="wpInternalHero section"><div className="container wpSimpleHero"><Eyebrow>Blogs / Aureum insights</Eyebrow><h1>News &amp; Guides from Aureum Mall &amp; Residences</h1><p>Follow Aureum Mall &amp; Residences through project updates, location information and payment-plan guidance.</p></div></section>
      <section className="section wpNewsSection"><div className="container"><SectionHeading eyebrow="Latest from Aureum" title="Keep up with the project." description="Read the latest Aureum Mall &amp; Residences updates and useful information for your next step." /><NewsCardList items={items} /></div></section>
    </>
  );
}
