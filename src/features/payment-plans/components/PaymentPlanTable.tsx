import type { PaymentPlan } from '../data';

function formatAmount(amount: number | undefined, currency: string) {
  if (amount === undefined) return 'To be confirmed';
  return new Intl.NumberFormat('en-PK', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}

export function PaymentPlanTable({ plan }: { plan: PaymentPlan }) {
  const percentageTotal = plan.stages.reduce((total, stage) => total + (stage.percentage ?? 0), 0);
  const amountTotal = plan.stages.reduce((total, stage) => total + (stage.amount ?? 0), 0);
  const reconciles = plan.totalAmount !== undefined ? amountTotal === plan.totalAmount : percentageTotal === 100;

  return (
    <div className="paymentPlanCard">
      <div className="paymentPlanCardHeader"><div><p className="eyebrow">{plan.title}</p><h3>{plan.category.replace('_', ' ')}</h3></div><span className={reconciles ? 'planStatus planStatusApproved' : 'planStatus'}>{plan.approved ? 'Approved' : 'Pending approval'}</span></div>
      <p className="paymentPlanMeta">Effective from: <strong>{plan.effectiveFrom}</strong>{plan.sourceLabel ? ` · Source: ${plan.sourceLabel}` : ''}</p>
      <div className="paymentTableWrap">
        <table>
          <caption className="srOnly">{plan.title} payment stages</caption>
          <thead><tr><th scope="col">Stage</th><th scope="col">Timing</th><th scope="col">Share</th><th scope="col">Amount</th></tr></thead>
          <tbody>{plan.stages.map((stage) => <tr key={stage.label}><th scope="row">{stage.label}</th><td>{stage.timing}</td><td>{stage.percentage !== undefined ? `${stage.percentage}%` : '—'}</td><td>{formatAmount(stage.amount, plan.currency)}</td></tr>)}</tbody>
          <tfoot><tr><th scope="row">Total</th><td>Reconciled schedule</td><td>{percentageTotal ? `${percentageTotal}%` : '—'}</td><td>{formatAmount(plan.totalAmount ?? (amountTotal || undefined), plan.currency)}</td></tr></tfoot>
        </table>
      </div>
      {!reconciles ? <p className="paymentPlanWarning" role="note">This schedule is not reconciled and must not be published as an official total.</p> : null}
    </div>
  );
}
