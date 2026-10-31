import Image from 'next/image';
import type { ReactNode } from 'react';
import { LeadForm } from '@/components/LeadForm';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { NewsCardItem } from '@/features/news/posts';
import { PROJECT_STATS } from '@/lib/project-facts';
import { AccessSection, BuildingLevelsSection, DeveloperSection, FloorPlanGallery, ProjectDisclaimers, ShowcaseGallery } from '@/features/project-showcase/components/ProjectShowcase';
import { CUTAWAY_IMAGES, EXTERIOR_NIGHT, EXTERIOR_NIGHT_WIDE, FLOOR_PLAN_IMAGES, FOOD_COURT_IMAGE, LEISURE_IMAGES, MALL_IMAGES, PARKING_IMAGE, RESIDENCE_IMAGES } from '@/features/project-showcase/images';
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
  /** Page-specific sections shown between the feature list and the enquiry form. */
  children?: ReactNode;
};

export function WordPressPropertyPage({ eyebrow, title, intro, image, imageAlt, features, interest, registerLabel, children }: PropertyPageProps) {
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
      {children}
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
          <div><Eyebrow>About Aureum Mall &amp; Residences</Eyebrow><h1>A 16 kanal landmark at the Ring Road Interchange.</h1><p>Aureum brings together a shopping mall, premium dining and entertainment, corporate offices, a luxury hotel and residences, all in one landmark building in Bahria Town, Lahore.</p><ButtonLink href="/building-explorer">Explore the building <span aria-hidden="true">↗</span></ButtonLink></div>
          <div className="wpInternalHeroImage"><Image src={EXTERIOR_NIGHT.src} alt={EXTERIOR_NIGHT.alt} fill priority sizes="(max-width: 900px) 92vw, 560px" /></div>
        </div>
      </section>
      <section className="section wpAboutSection">
        <div className="container wpAboutGrid"><div><Eyebrow>The project / at a glance</Eyebrow><h2>Shop, dine, work, stay and live.</h2></div><div className="wpAboutCopy"><p><strong>Shop</strong> across three retail levels around a central atrium. <strong>Dine &amp; play</strong> at the food court, playland, trampoline park and rooftop dining.</p><p><strong>Work</strong> in full-glass offices facing Ring Road. <strong>Stay &amp; live</strong> in a luxury hotel, apartments and premium glass residences.</p></div></div>
      </section>
      <section className="section wpAboutStats"><div className="container"><div className="wpAboutStatsGrid">{PROJECT_STATS.map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}</div></div></section>
      <DeveloperSection />
      <BuildingLevelsSection image={MALL_IMAGES[0]} />
      <AccessSection />
      <ProjectDisclaimers />
    </>
  );
}

const GALLERY_GROUPS = [
  { id: 'exterior', eyebrow: 'The building', title: 'A landmark at the Ring Road Interchange.', images: [EXTERIOR_NIGHT_WIDE, EXTERIOR_NIGHT], branded: false },
  { id: 'mall', eyebrow: 'The mall', title: 'Three retail levels around a central atrium.', images: [...MALL_IMAGES, FOOD_COURT_IMAGE], branded: true },
  { id: 'leisure', eyebrow: 'Dining & leisure', title: 'Where every visit becomes a day out.', images: LEISURE_IMAGES, branded: true },
  { id: 'residences', eyebrow: 'The residences', title: 'Light, space and calm.', images: [...CUTAWAY_IMAGES, ...RESIDENCE_IMAGES], branded: false },
  { id: 'parking', eyebrow: 'Parking & access', title: 'Two basement parking levels.', images: [PARKING_IMAGE], branded: false },
] as const;

export function WordPressGalleryPage() {
  return (
    <>
      <section className="wpInternalHero section"><div className="container wpSimpleHero"><Eyebrow>Gallery / project visuals</Eyebrow><h1>See the project from every useful angle.</h1><p>Explore Aureum Mall &amp; Residences through exterior and interior renders, the mall, dining and leisure, the residences and the floor plans.</p><nav className="galleryJump" aria-label="Gallery sections">{GALLERY_GROUPS.map((group) => <a key={group.id} href={`#${group.id}`}>{group.eyebrow}</a>)}<a href="#plans">Floor plans</a></nav></div></section>
      {GALLERY_GROUPS.map((group) => (
        <section className="section showcaseSection" id={group.id} key={group.id}>
          <div className="container"><SectionHeading eyebrow={group.eyebrow} title={group.title} /><ShowcaseGallery images={group.images} branded={group.branded} /></div>
        </section>
      ))}
      <section className="section showcaseSection" id="plans">
        <div className="container"><SectionHeading eyebrow="Floor plans" title="Every level of the building." description="Tap a plan to open it at full size." /><FloorPlanGallery plans={FLOOR_PLAN_IMAGES} /></div>
      </section>
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
