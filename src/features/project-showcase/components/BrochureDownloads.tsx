'use client';

import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ANALYTICS_EVENTS } from '@/features/content-seo/data';
import { track } from '@/lib/analytics';
import { getAttribution } from '@/lib/attribution';
import { COUNTRY_CODES } from '@/lib/lead-schema';
import { BROCHURES, type Brochure } from '@/lib/project-facts';
import { SITE } from '@/lib/site';

// Remembers on this device that the visitor already shared their details, so later brochures download directly.
const UNLOCK_KEY = 'aureum-brochures-unlocked';

function readUnlocked() {
  try { return window.localStorage.getItem(UNLOCK_KEY) === '1'; } catch { return false; }
}

function startDownload(brochure: Brochure) {
  track(ANALYTICS_EVENTS.brochureDownload, { brochure: brochure.id });
  const link = document.createElement('a');
  link.href = brochure.file;
  link.download = '';
  document.body.append(link);
  link.click();
  link.remove();
}

export function BrochureDownloads({ only }: { only?: readonly Brochure['id'][] }) {
  const brochures = only ? BROCHURES.filter((brochure) => only.includes(brochure.id)) : BROCHURES;
  const [unlocked, setUnlocked] = useState(false);
  const [selected, setSelected] = useState<Brochure | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [error, setError] = useState('');
  const startedAt = useRef(0);
  const uid = useId();

  useEffect(() => { queueMicrotask(() => setUnlocked(readUnlocked())); }, []);
  // Bot timing check: the form counts as started when it opens.
  useEffect(() => { if (selected) startedAt.current = Date.now(); }, [selected]);

  function choose(brochure: Brochure) {
    if (unlocked) { startDownload(brochure); return; }
    setSelected(brochure);
    setStatus('idle');
    setError('');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setStatus('submitting');
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          ...values,
          ...getAttribution(),
          pageUrl: window.location.href,
          intent: 'brochure',
          propertyInterest: selected.interest,
          message: `Brochure download: ${selected.title}`,
          startedAt: startedAt.current,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string; fieldErrors?: Record<string, string> };
      if (response.status === 503) {
        // The details were valid but the lead could not be delivered: still give the visitor the brochure.
        track(ANALYTICS_EVENTS.formError, { form: 'brochure', status: 503 });
        startDownload(selected);
        setSelected(null);
        setStatus('idle');
        return;
      }
      if (!response.ok || !result.ok) {
        setStatus('error');
        setError(Object.values(result.fieldErrors ?? {})[0] ?? result.message ?? 'We could not send your details. Please try again.');
        return;
      }
      track(ANALYTICS_EVENTS.formSubmit, { form: 'brochure', brochure: selected.id });
      try { window.localStorage.setItem(UNLOCK_KEY, '1'); } catch { /* storage unavailable: ask again next time */ }
      setUnlocked(true);
      startDownload(selected);
      setSelected(null);
      setStatus('idle');
    } catch {
      setStatus('error');
      setError('We could not send your details. Please check your connection and try again.');
    }
  }

  return (
    <section className="section brochureSection" id="brochures" aria-labelledby={`${uid}-heading`}>
      <div className="container">
        <SectionHeading id={`${uid}-heading`} eyebrow="Brochures" title="Take Aureum with you." description="Download the official brochures with floor plans, sizes and starting prices." />
        <ul className="brochureGrid">
          {brochures.map((brochure) => (
            <li key={brochure.id} className="brochureCard">
              <Eyebrow>{brochure.details}</Eyebrow>
              <h3>{brochure.title}</h3>
              <p>{brochure.description}</p>
              <Button type="button" variant="dark" onClick={() => choose(brochure)}>Download brochure</Button>
            </li>
          ))}
        </ul>
        {selected ? (
          <form className="brochureForm" onSubmit={submit} aria-label={`Get the ${selected.title} brochure`}>
            <p><strong>{selected.title}</strong>: share your name and number and the download starts right away.</p>
            <div className="brochureFields">
              <label className="formField"><span>Full name</span><input name="fullName" required minLength={2} maxLength={120} autoComplete="name" /></label>
              <label className="formField"><span>Phone / WhatsApp</span>
                <span className="phoneRow">
                  <select name="countryCode" defaultValue="+92" aria-label="Country code">{COUNTRY_CODES.map((country) => <option key={country.code} value={country.code}>{country.label}</option>)}</select>
                  <input name="phone" type="tel" required minLength={7} maxLength={30} inputMode="tel" autoComplete="tel-national" placeholder="300 1234567" />
                </span>
              </label>
            </div>
            <div className="hpField" aria-hidden="true"><input name="company" tabIndex={-1} autoComplete="off" /></div>
            <div className="brochureActions">
              <Button type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending…' : 'Download now'}</Button>
              <button type="button" className="brochureCancel" onClick={() => setSelected(null)}>Cancel</button>
            </div>
            {status === 'error' ? <p role="alert" className="error formError">{error}</p> : null}
            <p className="formConsent">The {SITE.name} sales team may contact you about the project.</p>
          </form>
        ) : null}
      </div>
    </section>
  );
}
