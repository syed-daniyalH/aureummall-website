import Link from 'next/link';
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
};

export function ArchitectureLanding({ eyebrow, title, intro, points, ctaHref = '/contact#enquiry', ctaLabel = 'Request details' }: ArchitectureLandingProps) {
  return (
    <>
      <section className="wpInternalHero section">
        <div className="container wpSimpleHero">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          <p>{intro}</p>
          <ButtonLink href={ctaHref}>{ctaLabel} <span aria-hidden="true">↗</span></ButtonLink>
        </div>
      </section>
      <section className="section wpPropertySection">
        <div className="container wpPropertyGrid">
          <div>
            <SectionHeading eyebrow="Aureum / information" title="A clear next step for your plans." description="Explore the available pathway, then contact the project team for the current approved details." />
            <ButtonLink href="/payment-plans" variant="dark">View payment plans <span aria-hidden="true">→</span></ButtonLink>
          </div>
          <ul className="wpPropertyFeatures">
            {points.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, '0')}</span><strong>{point}</strong></li>)}
          </ul>
        </div>
      </section>
    </>
  );
}

export function FaqPage() {
  const faqs = [
    ['Where is Aureum Mall & Residences?', 'Aureum Mall & Residences is planned at Bahria Town, Ring Road Interchange, Lahore.'],
    ['What property types are available?', 'The project brings together apartments, commercial shops, corporate offices and food court pathways.'],
    ['Where can I see the payment plan?', 'Visit the Payment Plans page or contact the team for the latest approved schedule.'],
    ['How can I book a site visit?', 'Use the site-visit form to share your preferred timing and the sales team will confirm the next step.'],
  ] as const;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
  };
  return (
    <>
      <JsonLd id="faq-page-schema" data={schema} />
      <ArchitectureLanding eyebrow="Aureum / frequently asked questions" title="The information you need before the next step." intro="Find clear answers about the project, available pathways and how to speak with the team." points={['Current information is shared by the project team.', 'Payment schedules are presented in accessible HTML.', 'Site visits can be requested through the enquiry form.']} />
      <section className="section trustFaqSection">
        <div className="container">
          <SectionHeading eyebrow="Clear answers" title="Aureum questions, answered." description="If you need a detail that is not listed here, contact the team directly." />
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
      <ArchitectureLanding eyebrow="Aureum / book a site visit" title="Plan a focused visit to Aureum." intro="Tell the sales team when you would like to visit and which space you are exploring. They will confirm the suitable next step." points={['Choose apartments, shops, offices or food court information.', 'Share a preferred day and time in the form.', 'Receive current visit and availability details from the team.']} ctaHref="#site-visit-form" ctaLabel="Book a visit" />
      <section className="section wpInquirySection" id="site-visit-form">
        <div className="container wpInquiryGrid">
          <div><Eyebrow>Visit request</Eyebrow><h2>Let’s arrange the right conversation.</h2><p>Complete the form and the Aureum sales team will follow up about your visit request.</p><p><Link href="/location">Review the location information →</Link></p></div>
          <div className="wpInquiryCard"><LeadForm intent="site_visit" /></div>
        </div>
      </section>
    </>
  );
}

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const privacy = kind === 'privacy';
  return (
    <section className="section articleSection">
      <div className="container articleBody">
        <Eyebrow>{privacy ? 'Privacy policy' : 'Terms & disclaimer'}</Eyebrow>
        <h1>{privacy ? 'Privacy policy' : 'Terms & disclaimer'}</h1>
        <p>{privacy ? 'This page explains how information shared through the Aureum website is used to respond to enquiries, site-visit requests and information requests.' : 'Website information is provided for general project guidance. Confirm current availability, prices, payment terms and documentation with the Aureum project team before making a decision.'}</p>
        <h2>{privacy ? 'Information you share' : 'Using this website'}</h2>
        <p>{privacy ? 'Contact details and enquiry information are used to respond to your request and may be shared with the authorised sales team for that purpose.' : 'You may browse, share and link to the public pages for personal or business research. Do not rely on a page as a substitute for signed project documents or professional advice.'}</p>
        <h2>{privacy ? 'Contact' : 'Project information'}</h2>
        <p>For questions about the project or the handling of an enquiry, contact <a href="mailto:hello@aureummall.info">hello@aureummall.info</a>.</p>
      </div>
    </section>
  );
}
