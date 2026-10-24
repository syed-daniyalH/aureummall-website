'use client';
import { FormEvent, useRef, useState } from 'react';
import { track } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/features/content-seo/data';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';

export function LeadForm({ defaultInterest = 'apartment' }: { defaultInterest?: string }) {
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle');
  const hasStarted = useRef(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.currentTarget;
    setStatus('submitting'); track(ANALYTICS_EVENTS.formSubmitAttempt, { form: 'lead' });
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('submit_failed');
      setStatus('success'); track(ANALYTICS_EVENTS.leadSuccess, { propertyInterest: String(payload.propertyInterest || '') });
      formElement.reset();
    } catch {
      setStatus('error');
    }
  }
  return (
    <form className="leadForm" onSubmit={submit} onFocus={() => { if (!hasStarted.current) { hasStarted.current = true; track(ANALYTICS_EVENTS.formStart, { form: 'lead' }); } }}>
      <FormField label="Full name"><input name="fullName" required maxLength={120} /></FormField>
      <FormField label="Phone / WhatsApp"><input name="phone" required maxLength={30} inputMode="tel" /></FormField>
      <FormField label="Email"><input name="email" type="email" /></FormField>
      <FormField label="Interested in"><select name="propertyInterest" defaultValue={defaultInterest}>
        <option value="apartment">Apartment</option><option value="commercial_shop">Commercial Shop</option><option value="corporate_office">Corporate Office</option><option value="other">Other</option>
      </select></FormField>
      <FormField label="Message"><textarea name="message" maxLength={1000} /></FormField>
      <input type="hidden" name="landingPage" value={typeof window !== 'undefined' ? window.location.href : ''} />
      <Button type="submit" disabled={status==='submitting'}>{status==='submitting'?'Submitting…':'Request Details'}</Button>
      {status==='success' && <p role="status" className="success">Thank you. Your request has been received.</p>}
      {status==='error' && <p role="alert" className="error">We could not submit your request. Please call or WhatsApp our sales team.</p>}
    </form>
  );
}
