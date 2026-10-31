'use client';

import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { track } from '@/lib/analytics';
import { getAttribution } from '@/lib/attribution';
import { ANALYTICS_EVENTS } from '@/features/content-seo/data';
import { COUNTRY_CODES, LEAD_INTENTS, PROPERTY_INTERESTS, PROPERTY_INTEREST_LABELS } from '@/lib/lead-schema';
import { callHref, whatsappHref } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/lib/site';

type PropertyInterest = (typeof PROPERTY_INTERESTS)[number];
type LeadIntent = (typeof LEAD_INTENTS)[number];

type LeadFormProps = {
  defaultInterest?: PropertyInterest;
  intent?: LeadIntent;
};

const SUBMIT_LABEL: Record<LeadIntent, string> = {
  enquiry: 'Request details',
  site_visit: 'Book my site visit',
  payment_plan: 'Send me the payment plan',
  brochure: 'Send me the brochure',
};

type Status = 'idle' | 'submitting' | 'error';

export function LeadForm({ defaultInterest = 'apartment', intent: initialIntent = 'enquiry' }: LeadFormProps) {
  const router = useRouter();
  const uid = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [intent, setIntent] = useState<LeadIntent>(initialIntent);
  const startedAt = useRef(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    startedAt.current = Date.now();
    const params = new URLSearchParams(window.location.search);
    const urlIntent = params.get('intent');
    if (urlIntent && (LEAD_INTENTS as readonly string[]).includes(urlIntent)) {
      queueMicrotask(() => setIntent(urlIntent as LeadIntent));
    }
    if (params.get('lead') === 'error') {
      queueMicrotask(() => {
        setStatus('error');
        setMessage('We could not send your request just now. Please call or WhatsApp our sales team and we will help you straight away.');
      });
    }
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus('submitting');
    setMessage('');
    setFieldErrors({});
    track(ANALYTICS_EVENTS.formSubmitAttempt, { form: 'lead', intent });

    const formValues = Object.fromEntries(new FormData(formElement).entries()) as Record<string, FormDataEntryValue>;
    const payload = {
      ...formValues,
      ...getAttribution(),
      pageUrl: window.location.href,
      intent,
      startedAt: startedAt.current,
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string; fieldErrors?: Record<string, string> };
      if (!response.ok || !result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setMessage(result.message ?? 'We could not send your request. Please call or WhatsApp our sales team.');
        setStatus('error');
        track(ANALYTICS_EVENTS.formError, { form: 'lead', status: response.status });
        return;
      }
      const propertyInterest = String(formValues.propertyInterest ?? '');
      track(ANALYTICS_EVENTS.formSubmit, { form: 'lead', intent, propertyInterest });
      track(ANALYTICS_EVENTS.leadSuccess, { propertyInterest });
      router.push(`/thank-you?interest=${encodeURIComponent(propertyInterest)}`);
    } catch {
      setStatus('error');
      setMessage('We could not send your request. Please check your connection, or call or WhatsApp our sales team.');
      track(ANALYTICS_EVENTS.formError, { form: 'lead', status: 0 });
    }
  }

  const fieldId = (name: string) => `${uid}-${name}`;
  const errorFor = (name: string) =>
    fieldErrors[name] ? (
      <span className="fieldError" id={fieldId(`${name}-error`)}>
        {fieldErrors[name]}
      </span>
    ) : null;
  const describedBy = (name: string) => (fieldErrors[name] ? fieldId(`${name}-error`) : undefined);

  return (
    <form
      className="leadForm"
      method="post"
      action="/api/lead"
      onSubmit={submit}
      onFocus={() => {
        if (!hasStarted.current) {
          hasStarted.current = true;
          track(ANALYTICS_EVENTS.formStart, { form: 'lead', intent });
        }
      }}
    >
      <div className="formField">
        <label htmlFor={fieldId('fullName')}>Full name</label>
        <input id={fieldId('fullName')} name="fullName" required minLength={2} maxLength={120} autoComplete="name" aria-invalid={Boolean(fieldErrors.fullName)} aria-describedby={describedBy('fullName')} />
        {errorFor('fullName')}
      </div>

      <div className="formField">
        <label htmlFor={fieldId('phone')}>Phone / WhatsApp</label>
        <div className="phoneRow">
          <select name="countryCode" defaultValue="+92" aria-label="Country code" autoComplete="tel-country-code">
            {COUNTRY_CODES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
          </select>
          <input id={fieldId('phone')} name="phone" type="tel" required minLength={7} maxLength={30} inputMode="tel" autoComplete="tel-national" placeholder="300 1234567" aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={describedBy('phone')} />
        </div>
        {errorFor('phone')}
      </div>

      <div className="formField">
        <label htmlFor={fieldId('email')}>
          Email <span className="optional">(optional)</span>
        </label>
        <input id={fieldId('email')} name="email" type="email" maxLength={160} autoComplete="email" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={describedBy('email')} />
        {errorFor('email')}
      </div>

      <div className="formField">
        <label htmlFor={fieldId('propertyInterest')}>Interested in</label>
        <select id={fieldId('propertyInterest')} name="propertyInterest" defaultValue={defaultInterest}>
          {PROPERTY_INTERESTS.map((value) => (
            <option key={value} value={value}>
              {PROPERTY_INTEREST_LABELS[value]}
            </option>
          ))}
        </select>
      </div>

      <div className="formField">
        <label htmlFor={fieldId('message')}>
          {intent === 'site_visit' ? 'Preferred day and time' : 'Message'} <span className="optional">(optional)</span>
        </label>
        <textarea id={fieldId('message')} name="message" maxLength={1000} />
      </div>

      {/* Honeypot: hidden from people and screen readers; bots tend to fill it. */}
      <div className="hpField" aria-hidden="true">
        <label htmlFor={fieldId('company')}>Company</label>
        <input id={fieldId('company')} name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="intent" value={intent} />

      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : SUBMIT_LABEL[intent]}
      </Button>

      <p className="formConsent">
        By sending this form you agree that the {SITE.name} sales team may contact you by phone, WhatsApp or email about your enquiry.
      </p>

      <div aria-live="polite">
        {status === 'error' && (
          <p role="alert" className="error formError">
            {message} <a href={callHref}>Call {SITE.phoneDisplay}</a> or{' '}
            <a href={whatsappHref()} target="_blank" rel="noopener">
              WhatsApp us
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
