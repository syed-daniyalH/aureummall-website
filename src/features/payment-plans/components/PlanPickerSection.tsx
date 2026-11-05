import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { formatPKR, PAYMENT_PLAN_PAGES } from '../plan-pages';

type PlanPickerSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  id?: string;
};

/** One card per payment plan: the category, a line about it, the starting price and a link to its page. */
export function PlanPickerSection({
  eyebrow = 'Choose a plan',
  title = 'One page for every category.',
  description = 'Open a category to see its sizes, prices and full instalment schedule.',
  id = 'plan-picker-heading',
}: PlanPickerSectionProps) {
  return (
    <section className="section planPickerSection" aria-labelledby={id}>
      <div className="container">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} description={description} />
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
  );
}
