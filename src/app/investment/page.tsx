import { createRouteMetadata } from '@/features/content-seo/metadata';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PlanPickerSection } from '@/features/payment-plans/components/PlanPickerSection';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { EXTERIOR_NIGHT_WIDE } from '@/features/project-showcase/images';
import { ArchitectureLanding } from '@/features/site-architecture/components/ArchitectureLanding';

export const metadata = createRouteMetadata('/investment');

// Facts from the Aureum Catalogue's location and footfall chapters. No returns are promised.
const FACTS = [
  { value: '0 min', label: 'From Ring Road and Bahria Town', detail: 'Direct frontage on the Lahore Ring Road at the Bahria Town Interchange exit.' },
  { value: '3', label: 'Bordering government roads', detail: 'Multiple approach routes, and the building is open on all four sides.' },
  { value: '15,224 sq ft', label: 'Supermarket anchor', detail: 'Alongside the food court, an 11,948 sq ft playland and a 6,329 sq ft trampoline park.' },
  { value: '4', label: 'Built-in audiences', detail: 'Shoppers, hotel guests, office teams and residents in the same building every day.' },
] as const;

export default function Page() {
  return (
    <ArchitectureLanding
      eyebrow="Investment / Aureum"
      title="Find the investment that fits your plans."
      intro="Apartments, shops, food court units and offices at the Bahria Town Ring Road Interchange, each with a published price list and payment plan."
      image={EXTERIOR_NIGHT_WIDE}
      ctaHref="#compare"
      ctaLabel="Compare the categories"
      summaryTitle="Four ways to own at Aureum."
      summaryText="Compare starting prices and plans, then confirm current availability and terms with the sales team before you decide."
      summaryHref="/payment-plans"
      summaryLabel="See every payment plan"
      points={['Apartments from PKR 8,733,000 on a 4.5-year plan', 'Shops from PKR 8,600,000 on a 3.5-year plan', 'Offices from PKR 25,175,000 with a lifetime amenities membership', 'No fixed return or appreciation is guaranteed']}
    >
      <div id="compare">
        <PlanPickerSection eyebrow="Compare the categories" title="Starting prices, side by side." description="Every figure is a starting base price from the current price list; applicable 10% category charges are additional." id="investment-plans-heading" />
      </div>
      <section className="section factsSection" aria-labelledby="investment-facts-heading">
        <div className="container">
          <SectionHeading id="investment-facts-heading" eyebrow="Location & footfall" title="Why the address matters." description="In real estate, location decides footfall, visibility and long-term appeal. Footfall is a potential, not a guaranteed volume." />
          <ul className="factGrid">
            {FACTS.map((fact) => (
              <li key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
                <p>{fact.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <BrochureDownloads only={['master-catalogue', 'factsheet', 'commercial']} />
    </ArchitectureLanding>
  );
}
