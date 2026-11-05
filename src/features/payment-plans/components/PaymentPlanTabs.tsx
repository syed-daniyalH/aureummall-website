import Link from 'next/link';
import { PAYMENT_PLAN_PAGES } from '../plan-pages';

/** Links to each plan's own page; the current one is marked. */
export function PaymentPlanTabs({ current }: { current?: string }) {
  return (
    <nav className="planTabs" aria-label="Payment plans by category">
      <Link href="/payment-plans" aria-current={current ? undefined : 'page'}>All plans</Link>
      {PAYMENT_PLAN_PAGES.map((page) => (
        <Link key={page.table.id} href={page.href} aria-current={page.table.id === current ? 'page' : undefined}>{page.label}</Link>
      ))}
    </nav>
  );
}
