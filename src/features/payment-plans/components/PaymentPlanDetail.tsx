import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ApartmentTypesSection } from '@/features/project-showcase/components/ProjectShowcase';
import { PAYMENT_SOURCE_LABEL, PAYMENT_TERMS } from '../data';
import { formatPKR, type PaymentPlanPage } from '../plan-pages';
import { PaymentPlanTabs } from './PaymentPlanTabs';
import { PriceCalculator } from './PriceCalculator';
import { SourcePaymentTableView } from './SourcePaymentTableView';

/** The page for one payment plan category, e.g. /payment-plans/apartments. */
export function PaymentPlanDetail({ page }: { page: PaymentPlanPage }) {
  const { table } = page;
  const years = table.monthlyCount === 55 ? '4.5 years' : '3.5 years';

  return (
    <>
      <section className="section paymentHero planDetailHero">
        <div className="container paymentHeroGrid">
          <div>
            <nav aria-label="Breadcrumb" className="breadcrumbs">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/payment-plans">Payment Plans</Link></li>
                <li aria-current="page">{page.label}</li>
              </ol>
            </nav>
            <Eyebrow>Payment plan 2026 / {page.group}</Eyebrow>
            <h1>{page.label}</h1>
            <p>{page.summary} Sizes from {page.sizeRange}, starting at {formatPKR(page.startingFrom)}.</p>
            <div className="actions">
              <ButtonLink href="#plan-table">See the price table <span aria-hidden="true">↓</span></ButtonLink>
              <ButtonLink href="/contact?intent=site_visit#enquiry" variant="secondary">Book a visit</ButtonLink>
            </div>
          </div>
          <dl className="planDetailFacts">
            <div><dt>Starting from</dt><dd>{formatPKR(page.startingFrom)}</dd></div>
            <div><dt>Rate</dt><dd>{table.rateLabel.replace(/^Rate /, '')}</dd></div>
            <div><dt>Plan</dt><dd>{years} · {table.monthlyCount} monthly</dd></div>
            <div><dt>Possession</dt><dd>{table.possessionLabel.replace(/^Indicative possession /, '')}*</dd></div>
          </dl>
        </div>
      </section>

      <section className="section paymentWorkspace" id="plan-table">
        <div className="container">
          <PaymentPlanTabs current={table.id} />
          <div className="planSummaryGrid planSummarySingle">
            <article className="planSummary">
              <Eyebrow>{page.label} · how you pay</Eyebrow>
              <dl>{page.stages.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            </article>
          </div>
          <div className="paymentPlanList">
            <SourcePaymentTableView table={table} />
          </div>
          <div className="sourcePaymentConflict" role="note">
            <Eyebrow>Important information</Eyebrow>
            <p>Starting base prices from the {PAYMENT_SOURCE_LABEL}. Applicable 10% category charges are additional, and possession timing (*) is indicative. Contact the project team to confirm availability before making a decision.</p>
          </div>
        </div>
      </section>

      {table.id === 'apartments' ? <ApartmentTypesSection /> : null}

      <section className="section calcSection" aria-labelledby="plan-calc-heading">
        <div className="container">
          <SectionHeading id="plan-calc-heading" eyebrow={`${page.label} payment calculator`} title="Your unit, your instalments." description="Choose a unit and your booking month to see every payment, the balance left after each one and what is due on possession." />
          <PriceCalculator tableId={table.id} lockToTable />
        </div>
      </section>

      <section className="section paymentWorkspace">
        <div className="container">
          <div className="paymentTerms"><Eyebrow>Terms</Eyebrow><ul>{PAYMENT_TERMS.map((term) => <li key={term}>{term}</li>)}</ul></div>
        </div>
      </section>
    </>
  );
}
