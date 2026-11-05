import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { PaymentPlanDetail } from '@/features/payment-plans/components/PaymentPlanDetail';
import { getPaymentPlanPage, PAYMENT_PLAN_PAGES } from '@/features/payment-plans/plan-pages';

type PlanPageProps = { params: Promise<{ plan: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PAYMENT_PLAN_PAGES.map((page) => ({ plan: page.table.id }));
}

export async function generateMetadata({ params }: PlanPageProps): Promise<Metadata> {
  const { plan } = await params;
  return getPaymentPlanPage(plan) ? createRouteMetadata(`/payment-plans/${plan}`) : {};
}

export default async function PaymentPlanPage({ params }: PlanPageProps) {
  const { plan } = await params;
  const page = getPaymentPlanPage(plan);
  if (!page) notFound();
  return <PaymentPlanDetail page={page} />;
}
