import { createRouteMetadata } from '@/features/content-seo/metadata';
import { LeadForm } from '@/components/LeadForm';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { MALL_IMAGES } from '@/features/project-showcase/images';
import { ArchitectureLanding } from '@/features/site-architecture/components/ArchitectureLanding';

export const metadata = createRouteMetadata('/partners');

export default function Page() {
  return (
    <ArchitectureLanding
      eyebrow="Sales partners / Aureum"
      title="Bring the right project information to your clients."
      intro="Approved sales materials, the current price list and a direct line to the Aureum team for partner enquiries."
      image={MALL_IMAGES[0]}
      ctaHref="#partner-enquiry"
      ctaLabel="Contact the partner team"
      summaryTitle="Approved details, every time."
      summaryText="Download the current catalogue and collections below, and keep every client conversation anchored to the published prices and plans."
      summaryHref="/payment-plans"
      summaryLabel="See the current price list"
      points={['Current catalogue, collections and factsheet', 'Published price list and payment plans', 'Apartments, shops, food court and offices', 'Direct contact with the Aureum sales team']}
    >
      <BrochureDownloads />
      <section className="section wpInquirySection" id="partner-enquiry">
        <div className="container wpInquiryGrid">
          <div><Eyebrow>Partner enquiry</Eyebrow><h2>Talk to the partner team.</h2><p>Tell us about your agency and the clients you are working with, and the Aureum team will get back to you with current availability and materials.</p></div>
          <div className="wpInquiryCard"><LeadForm /></div>
        </div>
      </section>
    </ArchitectureLanding>
  );
}
