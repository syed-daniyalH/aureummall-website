import { LeadForm } from '@/components/LeadForm';
import { SITE } from '@/lib/site';
import { callHref, whatsappHref } from '@/lib/whatsapp';
import { createRouteMetadata } from '@/features/content-seo/metadata';

export const metadata = createRouteMetadata('/contact');

export default function Page() {
  return (
    <section className="section">
      <div className="container split">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>Talk to the Aureum sales team</h1>
          <p className="contactLines">
            <a href={callHref}>{SITE.phoneDisplay}</a>
            <a href={whatsappHref()} target="_blank" rel="noopener">
              WhatsApp {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span>{SITE.location}</span>
          </p>
        </div>
        <div id="enquiry" className="enquiryAnchor">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
