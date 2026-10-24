import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PAYMENT_STEPS } from '../data';

export function PaymentPlanPreview() {
  return (
    <section className="section paymentSection" aria-labelledby="payment-preview-heading">
      <div className="container paymentGrid">
        <SectionHeading
          id="payment-preview-heading"
          eyebrow="Payment plan preview"
          title="The structure should be clear before the commitment."
          description="The page is ready for an accessible HTML schedule. Live amounts and dates stay out until the approved finance register is supplied."
        />
        <div className="paymentPanel">
          {PAYMENT_STEPS.map((step, index) => (
            <div className="paymentStep" key={step.label}>
              <span className="paymentStepIndex">0{index + 1}</span>
              <div><Eyebrow>{step.label}</Eyebrow><strong>{step.value}</strong></div>
            </div>
          ))}
          <ButtonLink href="/payment-plans">View full payment plans <span aria-hidden="true">↗</span></ButtonLink>
        </div>
      </div>
    </section>
  );
}
