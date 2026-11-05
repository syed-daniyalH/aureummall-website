import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { SITE } from '@/lib/site';
import { callHref, whatsappHref } from '@/lib/whatsapp';

export const metadata = createRouteMetadata('/thank-you');

export default function ThankYouPage() {
  return (
    <section className="wpInternalHero section thankYou">
      <div className="container wpSimpleHero">
        <Eyebrow>Enquiry received</Eyebrow>
        <h1>Thank you. Our sales team will be in touch shortly.</h1>
        <p>
          A member of the {SITE.name} team will contact you, usually within one working day. If you would like an answer sooner,
          message us on WhatsApp or call {SITE.phoneDisplay}.
        </p>
        <div className="actions">
          <a className="button primary" href={whatsappHref()} target="_blank" rel="noopener">
            Chat on WhatsApp
          </a>
          <a className="button secondary" href={callHref}>
            Call {SITE.phoneDisplay}
          </a>
        </div>
        <nav className="thankYouNext" aria-label="While you wait">
          <span>While you wait</span>
          <Link href="/payment-plans">See the payment plans <span aria-hidden="true">→</span></Link>
          <Link href="/gallery">Browse the gallery <span aria-hidden="true">→</span></Link>
          <Link href="/immersive-media#virtual-tour">Take the 360° tour <span aria-hidden="true">→</span></Link>
        </nav>
      </div>
    </section>
  );
}
