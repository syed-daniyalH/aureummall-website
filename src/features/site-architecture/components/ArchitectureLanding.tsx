import Image from 'next/image';
import Link from 'next/link';
import type { ShowcaseImage } from '@/features/project-showcase/components/ProjectShowcase';
import { EXTERIOR_NIGHT } from '@/features/project-showcase/images';
import type { ReactNode } from 'react';
import { LeadForm } from '@/components/LeadForm';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { JsonLd } from '@/features/content-seo/components/JsonLd';

export type ArchitectureLandingProps = {
  eyebrow: string;
  title: string;
  intro: string;
  points: readonly string[];
  ctaHref?: string;
  ctaLabel?: string;
  /** The picture beside the hero text; the building at night when a page has nothing more specific. */
  image?: ShowcaseImage;
  /** Heading and line above this page's key points. */
  summaryTitle?: string;
  summaryText?: string;
  /** Where the button under the key points goes, and its label. */
  summaryHref?: string;
  summaryLabel?: string;
  /** Page-specific sections shown after the key points. */
  children?: ReactNode;
};

export function ArchitectureLanding({
  eyebrow, title, intro, points, ctaHref = '/contact#enquiry', ctaLabel = 'Request details', image = EXTERIOR_NIGHT,
  summaryTitle = 'The essentials, at a glance.',
  summaryText = 'See prices and the payment plan, explore the building level by level, then talk to the sales team for current availability.',
  summaryHref = '/payment-plans', summaryLabel = 'View payment plans', children,
}: ArchitectureLandingProps) {
  return (
    <>
      <section className="wpInternalHero section">
        <div className="container wpInternalHeroGrid">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1>{title}</h1>
            <p>{intro}</p>
            <ButtonLink href={ctaHref}>{ctaLabel} <span aria-hidden="true">↗</span></ButtonLink>
          </div>
          <div className="wpInternalHeroImage"><Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 900px) 92vw, 560px" /></div>
        </div>
      </section>
      <section className="section wpPropertySection">
        <div className="container wpPropertyGrid">
          <div>
            <SectionHeading eyebrow="At a glance" title={summaryTitle} description={summaryText} />
            <ButtonLink href={summaryHref} variant="dark">{summaryLabel} <span aria-hidden="true">→</span></ButtonLink>
          </div>
          <ul className="wpPropertyFeatures">
            {points.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, '0')}</span><strong>{point}</strong></li>)}
          </ul>
        </div>
      </section>
      {children}
    </>
  );
}

export function FaqPage() {
  // Every answer is taken from the Aureum Catalogue (November 2026) and the published price list.
  const faqs = [
    ['Where is Aureum Mall & Residences?', 'At the Bahria Town Ring Road Interchange, Lahore: zero minutes from Ring Road and Bahria Town and about 25 minutes from Lahore airport. The site is bordered by three government roads and open on all four sides.'],
    ['Who is the developer?', 'Alfalah Real Estate & Builders, which has delivered three landmark projects in Bahria Town Karachi: Alfalah Tower, Liberty Clock Tower and Maison Theme Heights.'],
    ['What can I buy at Aureum?', 'Studios, one and two-bedroom apartments (including a two-bedroom with a servant quarter), premium Signature Glass Apartments, shops on the ground, first and second floors, food court units on the third floor and full-glass corporate offices.'],
    ['What sizes and starting prices are available?', 'Apartments from 426 to 1,727 sq ft, from PKR 8,733,000. First-floor shops from 172 to 707 sq ft, from PKR 8,600,000. Second-floor shops from 478 to 643 sq ft, from PKR 20,315,000. Food court units of 301 sq ft, from PKR 22,575,000. Offices from 1,007 to 2,595 sq ft, from PKR 25,175,000. Ground-floor prices are on request.'],
    ['How does the payment plan work for apartments and offices?', 'A 4.5-year plan: 10% at booking, 15% at confirmation, 55 monthly instalments of 1% each and 20% on completion.'],
    ['How does the payment plan work for shops and food court units?', 'A 3.5-year plan: 10% at booking, 15% at confirmation, 42 monthly instalments of 1% each, 13% across six half-yearly instalments and 20% on completion.'],
    ['What are the 10% category charges?', 'Applicable 10% category charges are added to the base price for some units, as per the official price list. Ask the sales team whether they apply to the unit you are considering; the payment calculator can include them.'],
    ['When is possession?', 'Indicative possession is 3.5 years for apartments and offices and 2.5 years for shops and food court units. Timing is subject to developer confirmation and the dated schedule in your booking documents.'],
    ['Has construction started?', 'Yes. Groundbreaking took place on 1 October 2026, and dated video from the site is published on the Construction Updates page.'],
    ['What is a Signature Glass Apartment?', 'Aureum’s premium homes: 1,491 and 1,727 sq ft layouts wrapped in floor-to-ceiling glass, presented as a category of their own with their own price list.'],
    ['What do office owners receive?', 'Every office owner receives a lifetime amenities membership card for complimentary use of the planned amenities. The membership terms are recorded in the purchase agreement.'],
    ['What amenities are planned?', 'More than twenty, including a swimming pool, gym, spa, sauna, steam room and yoga centre, a cinema, kids club, gaming zone and trampoline park, a masjid, libraries, a business centre and conference hall, a rooftop restaurant, 24/7 security and power backup. Amenities are planned and subject to developer confirmation.'],
    ['Is there parking?', 'Yes. Two basement levels for cars and bikes, with lift and stair access.'],
    ['Do residents have a separate entrance?', 'Yes. Residents have a private entrance, three dedicated lifts and a 28 × 50 ft lobby. The hotel, offices and mall each have their own entrance too.'],
    ['Can I buy from overseas?', 'Message the sales team on WhatsApp for the current price list, floor plans and payment plan, take the 360° tour and watch the site videos, then book a visit for your next trip to Lahore.'],
    ['How do I book a site visit?', 'Use the site-visit form or message the team on WhatsApp with your preferred day and time, and the team will confirm your visit.'],
    ['Are returns guaranteed?', 'No. No fixed return or capital appreciation is guaranteed, and footfall is a potential, not a guaranteed volume. Confirm prices, availability and terms with the sales team before you decide.'],
  ] as const;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
  };
  return (
    <>
      <JsonLd id="faq-page-schema" data={schema} />
      <ArchitectureLanding
        eyebrow="Aureum / frequently asked questions"
        title="Answers before you visit."
        intro="Clear answers about the location, the spaces, prices, payment plans, possession and how to speak with the sales team."
        ctaHref="#faq"
        ctaLabel="Read the answers"
        summaryTitle="The short version."
        summaryText="The four facts most buyers ask about first. Every detail is below."
        summaryHref="/payment-plans"
        summaryLabel="See every payment plan"
        points={['Apartments from PKR 8,733,000; shops from PKR 8,600,000', '10% at booking, then monthly 1% instalments', 'Indicative possession from 2.5 years', 'Groundbreaking on 1 October 2026']}
      />
      <section className="section trustFaqSection" id="faq">
        <div className="container">
          <SectionHeading eyebrow="Clear answers" title="Aureum questions, answered." description="Taken from the current Aureum Catalogue and price list. If you need a detail that is not listed here, contact the team directly." />
          <div className="trustFaqList">
            {faqs.map(([question, answer]) => <details className="trustFaqItem" key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>
    </>
  );
}

export function SiteVisitPage() {
  return (
    <>
      <ArchitectureLanding eyebrow="Aureum / book a site visit" title="Plan a focused visit to Aureum." intro="Tell the sales team when you would like to visit and which space you are exploring. They will confirm the suitable next step." points={['Choose apartments, shops, offices or food court information.', 'Share a preferred day and time in the form.', 'Receive current visit and availability details from the team.']} ctaHref="#site-visit-form" ctaLabel="Book a visit" summaryTitle="Three steps to a visit." summaryText="Tell the team when you would like to come, and they will meet you at the Bahria Town Ring Road Interchange." summaryHref="/location" summaryLabel="See the location" />
      <section className="section wpInquirySection" id="site-visit-form">
        <div className="container wpInquiryGrid">
          <div><Eyebrow>Visit request</Eyebrow><h2>Let’s arrange the right conversation.</h2><p>Complete the form and the Aureum sales team will follow up about your visit request.</p><p><Link href="/location">Review the location information →</Link></p></div>
          <div className="wpInquiryCard"><LeadForm intent="site_visit" /></div>
        </div>
      </section>
    </>
  );
}

// Describes what the website actually does (its forms, lead delivery, optional analytics and links);
// it does not add commitments the developer has not confirmed.
const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy policy',
    intro: 'This page explains what information the Aureum Mall & Residences website collects, why, and who receives it.',
    sections: [
      ['Information you share', 'When you send an enquiry, request a site visit or download a brochure, the form asks for your name and phone or WhatsApp number, and may ask for your email address, the type of space you are interested in and a message. Only the name and phone number are required.'],
      ['How it is used', 'Your details are used to answer your request: to share prices, payment plans, availability and brochures, and to arrange a site visit. They are not sold.'],
      ['Who receives it', 'Form submissions are delivered to the authorised Aureum sales team through the project’s lead system so that a member of the team can contact you.'],
      ['Analytics and cookies', 'The website may use Google Analytics 4 (with IP anonymisation) and the Meta Pixel to understand how pages are used and to measure enquiries. These services may set cookies in your browser; you can block or delete cookies in your browser settings.'],
      ['WhatsApp, phone and maps', 'WhatsApp, call and map links open services run by other companies, such as WhatsApp and Google Maps, and their own privacy terms apply once you use them.'],
      ['Your choices', 'To ask what information the sales team holds about you, or to have it corrected or removed, email the address below.'],
    ],
  },
  terms: {
    title: 'Terms & disclaimer',
    intro: 'Website information is provided for general project guidance. Confirm current availability, prices, payment terms and documentation with the Aureum sales team before making a decision.',
    sections: [
      ['Using this website', 'You may browse, share and link to the public pages for personal or business research. A web page is not a substitute for signed project documents or professional advice.'],
      ['Images and plans', 'Building and interior images are artist’s impressions, and interior and card designs are illustrative. Floor details follow the current project drawings and are subject to final approved drawings.'],
      ['Prices and payment plans', 'Prices are starting base prices from the published price list, and applicable 10% category charges are additional. Prices, payment plans and availability are subject to final confirmation; the dated instalment schedule in your booking documents is final.'],
      ['Planned features', 'Amenities, the hotel, technology features, access arrangements and specifications are planned and subject to developer confirmation. Office-owner membership terms are recorded in the purchase agreement.'],
      ['No guaranteed returns', 'Footfall is a potential, not a guaranteed volume. No fixed return or capital appreciation is guaranteed.'],
    ],
  },
} as const;

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const content = LEGAL_CONTENT[kind];
  return (
    <section className="section articleSection legalPage">
      <div className="container articleBody">
        <Eyebrow>{content.title} · updated November 2026</Eyebrow>
        <h1>{content.title}</h1>
        <p className="legalIntro">{content.intro}</p>
        {content.sections.map(([heading, text]) => (
          <div key={heading}>
            <h2>{heading}</h2>
            <p>{text}</p>
          </div>
        ))}
        <h2>Contact</h2>
        <p>For questions about the project, this page or the handling of an enquiry, contact <a href="mailto:hello@aureummall.info">hello@aureummall.info</a> or call (0322) 555 1121.</p>
      </div>
    </section>
  );
}
