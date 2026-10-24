'use client';

import { Button } from '@/components/ui/Button';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="recoveryPage">
      <div className="container recoveryCard">
        <Eyebrow>We hit a pause</Eyebrow>
        <h1>Aureum is ready to try that again.</h1>
        <p>The page did not load as expected. Retry once, or return to the showroom and continue from there.</p>
        <div className="actions"><Button type="button" onClick={() => reset()}>Try again</Button><ButtonLink href="/" variant="secondary" className="onLight">Back to homepage</ButtonLink></div>
      </div>
    </section>
  );
}
