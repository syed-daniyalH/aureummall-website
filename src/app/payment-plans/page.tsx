import { PaymentPlansExperience } from '@/features/payment-plans/components/PaymentPlansExperience';
import { createRouteMetadata } from '@/features/content-seo/metadata';

export const metadata = createRouteMetadata('/payment-plans');

export default function Page(){return <PaymentPlansExperience />}
