'use client';

import { useMemo, useState } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PAYMENT_CATEGORIES, PAYMENT_SOURCE_LABEL, PAYMENT_TERMS, SOURCE_PAYMENT_TABLES, type SourcePaymentRow, type SourcePaymentTable } from '../data';

const PLAN_SUMMARIES = [
  { title: 'Apartments & offices', facts: [['4.5 yrs', 'Payment plan'], ['3.5 yrs', 'Possession*'], ['10%', 'Booking'], ['15%', 'Confirmation'], ['55%', '55 monthly × 1%'], ['20%', 'Completion']] },
  { title: 'Shops & food court', facts: [['3.5 yrs', 'Payment plan'], ['2.5 yrs', 'Possession*'], ['10%', 'Booking'], ['15%', 'Confirmation'], ['42%', '42 monthly × 1%'], ['13%', 'Half-yearly'], ['20%', 'Completion']] },
] as const;

function formatPKR(value: number) {
  return `Rs ${new Intl.NumberFormat('en-PK').format(value)}`;
}

function SourcePaymentTableView({ table }: { table: SourcePaymentTable }) {
  const renderAmount = (value?: number) => value === undefined ? '—' : formatPKR(value);

  return (
    <article className="sourcePaymentTableCard">
      <header className="sourcePaymentTableHeader">
        <div>
          <Eyebrow>Payment schedule</Eyebrow>
          <h2>{table.title}</h2>
        </div>
        <p>{table.rateLabel} · {table.installmentLabel} · {table.possessionLabel}</p>
      </header>
      <div className="paymentTableWrap">
        <table>
          <caption>{table.title} payment plan — from the {PAYMENT_SOURCE_LABEL}.</caption>
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Size (sq. ft.)</th>
              <th scope="col">Rate / sq. ft.</th>
              <th scope="col">Total price (PKR)</th>
              <th scope="col">Booking 10% (PKR)</th>
              <th scope="col">Confirmation 15% (PKR)</th>
              <th scope="col">Monthly installment (PKR)</th>
              <th scope="col">Half-yearly (PKR)</th>
              <th scope="col">Completion 20% (PKR)</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row: SourcePaymentRow) => (
              <tr key={`${table.id}-${row.type}-${row.sizeSqFt}`}>
                <th scope="row">{row.type}</th>
                <td>{row.sizeSqFt.toLocaleString('en-PK')}</td>
                <td>{formatPKR(row.ratePerSqFt)}</td>
                <td>{formatPKR(row.totalPrice)}</td>
                <td>{formatPKR(row.booking)}</td>
                <td>{formatPKR(row.confirmation)}</td>
                <td>{formatPKR(row.monthlyInstallment)}</td>
                <td>{renderAmount(row.halfYearly)}</td>
                <td>{formatPKR(row.completion)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="sourcePaymentNote">{table.note ? `${table.note} ` : ''}Starting base prices; 10% category charges are additional.</p>
    </article>
  );
}

export function PaymentPlansExperience() {
  const [category, setCategory] = useState<(typeof PAYMENT_CATEGORIES)[number]['value']>('all');
  const tables = useMemo(
    () => SOURCE_PAYMENT_TABLES.filter((table) => category === 'all' || table.category === category),
    [category],
  );

  return (
    <>
      <section className="section paymentHero">
        <div className="container paymentHeroGrid">
          <div>
            <Eyebrow>Investment / payment plans</Eyebrow>
            <h1>Payment Plan 2026</h1>
            <p>Studios from PKR 8,307,000, offices at PKR 23,500 per sq ft and shops from PKR 7,740,000: 10% at booking, 15% at confirmation, 1% monthly installments and 20% on completion.</p>
            <div className="actions">
              <ButtonLink href="#payment-workspace">View the HTML tables <span aria-hidden="true">↓</span></ButtonLink>
              <ButtonLink href="#payment-workspace" variant="secondary" className="onLight">Read the accessible plan <span aria-hidden="true">↓</span></ButtonLink>
            </div>
          </div>
          <div className="paymentHeroStamp" aria-hidden="true"><span>HTML first / source verified</span><strong>07</strong></div>
        </div>
      </section>
      <section className="section paymentWorkspace" id="payment-workspace">
        <div className="container">
          <SectionHeading
            id="payment-heading"
            eyebrow="Payment plan details"
            title="The plan is readable without opening an image or PDF."
            description="Review the published schedule in accessible HTML tables designed for clear reading on every screen."
          />
          <div className="paymentCategoryBar" role="tablist" aria-label="Payment plan categories">
            {PAYMENT_CATEGORIES.map((item) => <button key={item.value} type="button" role="tab" aria-selected={category === item.value} onClick={() => setCategory(item.value)}>{item.label}</button>)}
          </div>
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
            {tables.map((table) => <SourcePaymentTableView key={table.id} table={table} />)}
          </div>
          <div className="paymentTerms"><Eyebrow>Terms</Eyebrow><ul>{PAYMENT_TERMS.map((term) => <li key={term}>{term}</li>)}</ul></div>
        </div>
      </section>
    </>
  );
}
