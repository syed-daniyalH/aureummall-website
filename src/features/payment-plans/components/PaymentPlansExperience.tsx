'use client';

import { useMemo, useState } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PAYMENT_CATEGORIES, PAYMENT_TERMS, SOURCE_PAYMENT_TABLES, type SourcePaymentRow, type SourcePaymentTable } from '../data';

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
        <p>{table.rateLabel} · {table.installmentLabel}</p>
      </header>
      <div className="paymentTableWrap">
        <table>
          <caption>{table.title} payment plan 2026 — from the Aureum Project Profile PDF, page 29.</caption>
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
      <p className="sourcePaymentNote">Reference: Aureum Project Profile PDF, Payment Plan 2026, page 29.</p>
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
            <p>A structured, buyer-friendly plan for apartments, offices and shops: 10% at booking, 15% at confirmation, monthly installments, and 20% at completion.</p>
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
          <div className="sourcePaymentConflict" role="note">
            <Eyebrow>Important information</Eyebrow>
            <p>Payment-plan amounts and terms are presented in HTML so they remain searchable and readable. Contact the project team for the latest availability and confirmation before making a decision.</p>
          </div>
          <div className="paymentPlanList">
            {tables.map((table) => <SourcePaymentTableView key={table.id} table={table} />)}
          </div>
          <div className="paymentTerms"><Eyebrow>Publishing rules</Eyebrow><ul>{PAYMENT_TERMS.map((term) => <li key={term}>{term}</li>)}</ul></div>
        </div>
      </section>
    </>
  );
}
