import { LeadForm } from '@/components/LeadForm';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SITE } from '@/lib/site';
import { callHref, whatsappHref } from '@/lib/whatsapp';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { LiveMap } from '@/features/trust-location/components/LiveMap';

export const metadata = createRouteMetadata('/contact');

const CONTACT_METHODS = [
  { label: 'Call the sales team', value: SITE.phoneDisplay, href: callHref, external: false },
  { label: 'WhatsApp', value: `Message ${SITE.phoneDisplay}`, href: whatsappHref(), external: true },
  { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, external: false },
  { label: 'Visit the site', value: SITE.location, href: SITE.directionsUrl, external: true },
] as const;

export default function Page() {
  return (
    <>
      <section className="wpInternalHero section contactHero">
        <div className="container contactGrid">
          <div className="contactIntro">
            <Eyebrow>Contact / sales team</Eyebrow>
            <h1>Talk to the Aureum sales team.</h1>
            <p>Ask about availability, the current payment plan or a site visit. Call, send a WhatsApp message or leave your details and the team will get back to you.</p>
            <ul className="contactMethods">
              {CONTACT_METHODS.map((method) => (
                <li key={method.label}>
                  <a href={method.href} {...(method.external ? { target: '_blank', rel: 'noopener' } : {})}>
                    <span className="contactMethodLabel">{method.label}</span>
                    <span className="contactMethodValue">{method.value}</span>
                    <span className="contactMethodArrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div id="enquiry" className="enquiryAnchor wpInquiryCard contactFormCard">
            <p className="contactFormTitle">Request details</p>
            <p className="contactFormNote">Takes under a minute. The team replies by phone or WhatsApp.</p>
            <LeadForm />
          </div>
        </div>
      </section>
      <section className="section contactVisit" aria-labelledby="contact-visit-heading">
        <div className="container contactVisitGrid">
          <div>
            <Eyebrow>Find us</Eyebrow>
            <h2 id="contact-visit-heading">At the Bahria Town Ring Road Interchange.</h2>
            <p>Zero minutes from Ring Road and Bahria Town, and about 25 minutes from Lahore airport. Book a visit and the team will meet you on site.</p>
          </div>
          <LiveMap className="contactMap" />
        </div>
      </section>
    </>
  );
}
