import { ButtonLink } from '@/components/ui/ButtonLink';
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
        <p className="thankYouNext">
          While you wait: <ButtonLink href="/payment-plans" variant="secondary">See the payment plans</ButtonLink>
        </p>
      </div>
    </section>
  );
}
