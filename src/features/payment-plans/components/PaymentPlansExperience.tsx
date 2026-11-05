import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PAYMENT_SOURCE_LABEL, PAYMENT_TERMS } from '../data';
import { formatPKR, PAYMENT_PLAN_PAGES } from '../plan-pages';
import { PaymentPlanTabs } from './PaymentPlanTabs';
import { PriceCalculator } from './PriceCalculator';
import { SourcePaymentTableView } from './SourcePaymentTableView';

const PLAN_SUMMARIES = [
  { title: 'Apartments & offices', facts: PAYMENT_PLAN_PAGES.find((page) => page.table.monthlyCount === 55)?.stages ?? [] },
  { title: 'Shops & food court', facts: PAYMENT_PLAN_PAGES.find((page) => page.table.monthlyCount === 42)?.stages ?? [] },
] as const;

export function PaymentPlansExperience() {
  return (
    <>
      <section className="section paymentHero">
        <div className="container paymentHeroGrid">
          <div>
            <Eyebrow>Investment / payment plans</Eyebrow>
            <h1>Payment Plan 2026</h1>
            <p>Studios from PKR 8,733,000, offices from PKR 25,175,000 and first-floor shops from PKR 8,600,000: 10% at booking, 15% at confirmation, 1% monthly installments and 20% on completion.</p>
            <div className="actions">
              <ButtonLink href="#payment-workspace">See the price tables <span aria-hidden="true">↓</span></ButtonLink>
              <ButtonLink href="/contact?intent=site_visit#enquiry" variant="secondary">Book a visit</ButtonLink>
            </div>
          </div>
          <div className="paymentHeroStamp" aria-hidden="true"><span>Booking from</span><strong>10%</strong></div>
        </div>
      </section>
      <section className="section planPickerSection" aria-labelledby="plan-picker-heading">
        <div className="container">
          <SectionHeading id="plan-picker-heading" eyebrow="Choose a plan" title="One page for every category." description="Open a category to see its sizes, prices and full instalment schedule." />
          <ul className="planPickerGrid">
            {PAYMENT_PLAN_PAGES.map((page) => (
              <li key={page.table.id}>
                <Link href={page.href} className="planPickerCard">
                  <span className="planPickerGroup">{page.group}</span>
                  <strong>{page.label}</strong>
                  <span className="planPickerSummary">{page.summary}</span>
                  <span className="planPickerFrom"><small>From</small>{formatPKR(page.startingFrom)}</span>
                  <span className="planPickerMore">View payment plan <span aria-hidden="true">→</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section calcSection" aria-labelledby="payment-calc-heading">
        <div className="container">
          <SectionHeading id="payment-calc-heading" eyebrow="Payment calculator" title="Your unit, your instalments." description="Choose a unit to see its base price and what is due at each stage." />
          <PriceCalculator />
        </div>
      </section>
      <section className="section paymentWorkspace" id="payment-workspace">
        <div className="container">
          <SectionHeading
            id="payment-heading"
            eyebrow="Payment plan details"
            title="Every unit, every instalment."
            description="Sizes, prices and the full instalment schedule from the latest Aureum catalogue, category brochures and project factsheet."
          />
          <PaymentPlanTabs />
          <div className="planSummaryGrid">
            {PLAN_SUMMARIES.map((plan) => (
              <article className="planSummary" key={plan.title}>
                <Eyebrow>{plan.title}</Eyebrow>
                <dl>{plan.facts.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
              </article>
            ))}
          </div>
          <div className="sourcePaymentConflict" role="note">
            <Eyebrow>Important information</Eyebrow>
            <p>Starting base prices from the {PAYMENT_SOURCE_LABEL}. Applicable 10% category charges are additional, and possession timing (*) is indicative. Contact the project team to confirm availability before making a decision.</p>
          </div>
          <div className="paymentPlanList">
            {PAYMENT_PLAN_PAGES.map((page) => <SourcePaymentTableView key={page.table.id} table={page.table} />)}
          </div>
          <div className="paymentTerms"><Eyebrow>Terms</Eyebrow><ul>{PAYMENT_TERMS.map((term) => <li key={term}>{term}</li>)}</ul></div>
        </div>
      </section>
    </>
  );
}
