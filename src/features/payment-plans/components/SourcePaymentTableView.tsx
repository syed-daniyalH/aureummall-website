import { Eyebrow } from '@/components/ui/Eyebrow';
import { PAYMENT_SOURCE_LABEL, type SourcePaymentRow, type SourcePaymentTable } from '../data';
import { formatPKR } from '../plan-pages';

export function SourcePaymentTableView({ table, headingLevel = 2 }: { table: SourcePaymentTable; headingLevel?: 2 | 3 }) {
  const renderAmount = (value?: number) => value === undefined ? '—' : formatPKR(value);
  const hasUnitCategories = table.rows.some((row) => row.unitCategory);
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <article className="sourcePaymentTableCard" id={`table-${table.id}`}>
      <header className="sourcePaymentTableHeader">
        <div>
          <Eyebrow>Payment schedule</Eyebrow>
          <Heading>{table.title}</Heading>
        </div>
        <p>{table.rateLabel} · {table.installmentLabel} · {table.possessionLabel}</p>
      </header>
      <p className="paymentTableSource">From the {PAYMENT_SOURCE_LABEL}.<span className="paymentTableSwipe"> Swipe sideways to see every column.</span></p>
      <div className="paymentTableWrap">
        <table>
          <caption className="srOnly">{table.title} payment plan — from the {PAYMENT_SOURCE_LABEL}.</caption>
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Size (sq. ft.)</th>
              {hasUnitCategories ? <th scope="col">Category</th> : null}
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
              <tr key={`${table.id}-${row.type}-${row.sizeSqFt}-${row.unitCategory ?? 'standard'}`}>
                <th scope="row">{row.type}{row.premium ? <span className="premiumTag">Premium</span> : null}</th>
                <td>{row.sizeSqFt.toLocaleString('en-PK')}</td>
                {hasUnitCategories ? <td>{row.unitCategory}</td> : null}
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
