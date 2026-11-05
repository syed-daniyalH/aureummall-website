import Link from 'next/link';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PlanPickerSection } from '@/features/payment-plans/components/PlanPickerSection';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { EXTERIOR_NIGHT } from '@/features/project-showcase/images';
import { ArchitectureLanding } from '@/features/site-architecture/components/ArchitectureLanding';
import { whatsappHref } from '@/lib/whatsapp';

export const metadata = createRouteMetadata('/overseas-buyers');

/** How a buyer abroad can get to know the project using what the website already offers. */
const STEPS = [
  { title: 'Message the team on WhatsApp', text: 'Send a message from wherever you are. The team shares the current price list, floor plans and payment plan for the space you are interested in.', href: whatsappHref('buying from overseas'), label: 'Open WhatsApp', external: true },
  { title: 'See the project remotely', text: 'Take the 360° tour, browse the gallery and watch dated video from the construction site since the 1 October 2026 groundbreaking.', href: '/immersive-media#virtual-tour', label: 'Start the 360° tour', external: false },
  { title: 'Plan every instalment', text: 'Use the payment calculator to see what is due each month, with or without category charges, and download the schedule as a PDF.', href: '/payment-plans#price-calculator', label: 'Open the calculator', external: false },
  { title: 'Visit on your next trip', text: 'Book a site visit for your next trip to Lahore, and the team will meet you at the Bahria Town Ring Road Interchange.', href: '/book-site-visit', label: 'Book a visit', external: false },
] as const;

export default function Page() {
  return (
    <ArchitectureLanding
      eyebrow="Overseas buyers / Aureum"
      title="Buying from abroad, made clear."
      intro="Everything you need to understand Aureum from wherever you are: current prices, payment plans, a 360° tour, site videos and a direct line to the sales team."
      image={EXTERIOR_NIGHT}
      ctaHref="#how-it-works"
      ctaLabel="See how it works"
      summaryTitle="From enquiry to visit."
      summaryText="Get the price list and payment plan on WhatsApp, see the project remotely, then visit when you are in Lahore."
      summaryHref="#how-it-works"
      summaryLabel="See the four steps"
      points={['Price list and payment plan shared on WhatsApp', '360° tour and dated construction videos online', 'Instalment schedule you can download as a PDF', 'Site visit on your next trip to Lahore']}
    >
      <section className="section stepsSection" id="how-it-works" aria-labelledby="overseas-steps-heading">
        <div className="container">
          <SectionHeading id="overseas-steps-heading" eyebrow="How it works" title="Four steps, from anywhere." description="Each step uses tools already on this website, so you can move at your own pace and time zone." />
          <ol className="stepsGrid">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <span className="stepNumber" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {step.external
                  ? <a href={step.href} target="_blank" rel="noopener">{step.label} <span aria-hidden="true">↗</span></a>
                  : <Link href={step.href}>{step.label} <span aria-hidden="true">→</span></Link>}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <PlanPickerSection eyebrow="Prices & plans" title="Starting prices for every category." description="Starting base prices in PKR from the current price list; applicable 10% category charges are additional." id="overseas-plans-heading" />
      <BrochureDownloads only={['master-catalogue', 'residential', 'factsheet']} />
    </ArchitectureLanding>
  );
}
