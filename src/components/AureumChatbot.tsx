'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { BrandMark } from '@/components/ui/BrandMark';
import { ANALYTICS_EVENTS } from '@/features/content-seo/data';
import { track } from '@/lib/analytics';
import { callHref } from '@/lib/whatsapp';
import { CHATBOT_INTERESTS, CHATBOT_INTEREST_LABELS, type ChatbotInterest } from '@/lib/chatbot';
import styles from './AureumChatbot.module.css';

type Tab = 'enquire' | 'call' | 'chat';
type Mode = 'welcome' | 'register' | 'conversation';
type ChatMessage = { from: 'bot' | 'user'; text: string };

const initialMessage: ChatMessage = {
  from: 'bot',
  text: 'Hi, we’re the Aureum Sales Team. How can we help you explore Aureum today?',
};

const registerMessage: ChatMessage = {
  from: 'bot',
  text: 'Before we start, share your details and we’ll connect you with the right Aureum team.',
};

export function AureumChatbot() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [mode, setMode] = useState<Mode>('welcome');
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    interest: 'studio' as ChatbotInterest,
  });
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
  const [error, setError] = useState('');
  const reminderTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expiryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearInactivityTimers() {
    if (reminderTimer.current) clearTimeout(reminderTimer.current);
    if (expiryTimer.current) clearTimeout(expiryTimer.current);
    reminderTimer.current = null;
    expiryTimer.current = null;
  }

  function expireSession(id: string) {
    clearInactivityTimers();
    void fetch('/api/chatbot/session', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        action: 'expire',
        sessionId: id,
        pageUrl: window.location.href,
      }),
      keepalive: true,
    }).catch(() => undefined);
    setSessionId('');
    setMode('welcome');
    setOpen(false);
    setMessages([initialMessage]);
    setError('');
  }

  function armInactivity(id: string) {
    clearInactivityTimers();
    reminderTimer.current = setTimeout(() => {
      setMessages((current) => [
        ...current,
        { from: 'bot', text: 'We’re still here. Reply when you’re ready, or this chat will close shortly.' },
      ]);
    }, 90_000);
    expiryTimer.current = setTimeout(() => expireSession(id), 120_000);
  }

  useEffect(() => clearInactivityTimers, []);

  function openChat() {
    setOpen(true);
    setActiveTab('chat');
    track(ANALYTICS_EVENTS.formStart, { form: 'chatbot', step: 'open' });
  }

  function selectTab(tab: Tab) {
    if (tab === 'call') return;
    setOpen(true);
    setActiveTab(tab);
    setError('');
    if (tab === 'chat' || tab === 'enquire') {
      setMode(sessionId ? 'conversation' : 'register');
      if (!sessionId) {
        setMessages([registerMessage]);
      }
    }
  }

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const response = await fetch('/api/chatbot/session', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          action: 'register',
          ...form,
          pageUrl: window.location.href,
          referrer: document.referrer,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        sessionId?: string;
        message?: string;
      };

      if (!response.ok || !result.ok || !result.sessionId) {
        setError(result.message ?? 'Please check your details and try again.');
        return;
      }

      setSessionId(result.sessionId);
      setMode('conversation');
      setMessages([
        initialMessage,
        {
          from: 'bot',
          text: `Thanks, ${form.firstName}. We’ve registered your enquiry for ${CHATBOT_INTEREST_LABELS[form.interest]}. What would you like to know?`,
        },
      ]);
      setMessage('');
      armInactivity(result.sessionId);
      track(ANALYTICS_EVENTS.formSubmit, {
        form: 'chatbot',
        channel: 'website',
        interest: form.interest,
      });
    } catch {
      setError('We could not connect right now. Please try again or call the Aureum Sales Team.');
    } finally {
      setStatus('idle');
    }
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextMessage = message.trim();
    if (!nextMessage || !sessionId) return;

    setStatus('submitting');
    setError('');
    setMessages((current) => [...current, { from: 'user', text: nextMessage }]);
    setMessage('');

    try {
      const response = await fetch('/api/chatbot/message', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: nextMessage,
          pageUrl: window.location.href,
          interest: form.interest,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; reply?: string; message?: string };

      if (!response.ok || !result.ok) {
        setError(result.message ?? 'Your message could not be sent. Please try again.');
        return;
      }

      setMessages((current) => [
        ...current,
        { from: 'bot', text: result.reply ?? 'Thanks. The Aureum Sales Team has received your message.' },
      ]);
      armInactivity(sessionId);
    } catch {
      setError('Your message could not be sent. Please try again.');
    } finally {
      setStatus('idle');
    }
  }

  return (
    <aside className={styles.widget} aria-label="Aureum Sales Team chatbot">
      {open && (
        <section className={styles.panel} aria-label="Aureum Sales Team chat">
          <header className={styles.header}>
            <div className={styles.identity}>
              <div className={styles.logo}>
                <BrandMark />
              </div>
              <div className={styles.titleBlock}>
                <p className={styles.title}>Aureum Sales Team</p>
                <p className={styles.meta}>Aureum Mall & Residences · Sat–Thu, 11 AM–8 PM PKT</p>
              </div>
            </div>
            <button className={styles.close} type="button" aria-label="Close chatbot" onClick={() => setOpen(false)}>
              ×
            </button>
          </header>

          {mode === 'welcome' && <p className={styles.greeting}>{initialMessage.text}</p>}

          {mode === 'register' && (
            <div className={styles.content}>
              <p className={styles.contentTitle}>Let’s get your enquiry started</p>
              <p className={styles.contentNote}>Name, phone and interest are required to create your lead. Email helps the team follow up.</p>
              <form className={styles.form} onSubmit={register}>
                <div className={styles.formGrid}>
                  <label className={styles.field}>
                    <span className={styles.label}>First name</span>
                    <input className={styles.input} name="firstName" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} autoComplete="given-name" required minLength={2} maxLength={60} />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Last name</span>
                    <input className={styles.input} name="lastName" value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} autoComplete="family-name" required minLength={2} maxLength={60} />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Phone / WhatsApp</span>
                    <input className={styles.input} name="phone" type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} autoComplete="tel" inputMode="tel" required minLength={7} maxLength={30} placeholder="+92 300 1234567" />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Email <span>(optional)</span></span>
                    <input className={styles.input} name="email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" maxLength={160} />
                  </label>
                  <label className={`${styles.field} ${styles.fieldFull}`}>
                    <span className={styles.label}>Interested in</span>
                    <select className={styles.select} name="interest" value={form.interest} onChange={(event) => setForm({ ...form, interest: event.target.value as ChatbotInterest })} required>
                      {CHATBOT_INTERESTS.map((interest) => (
                        <option key={interest} value={interest}>
                          {CHATBOT_INTEREST_LABELS[interest]}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {error && <p className={styles.error} role="alert">{error}</p>}
                <p className={styles.consent}>By continuing, you agree that the Aureum Sales Team may contact you about this enquiry.</p>
                <button className={styles.submit} type="submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Connecting…' : 'Start chat'}
                </button>
              </form>
            </div>
          )}

          {mode === 'conversation' && (
            <div className={styles.content}>
              <div className={styles.conversation}>
                <div className={styles.messages} aria-live="polite">
                  {messages.map((item, index) => (
                    <p key={`${item.from}-${index}`} className={`${styles.message} ${item.from === 'bot' ? styles.botMessage : styles.userMessage}`}>
                      {item.text}
                    </p>
                  ))}
                </div>
                {error && <p className={styles.error} role="alert">{error}</p>}
                <form className={styles.messageForm} onSubmit={sendMessage}>
                  <input className={styles.messageInput} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Type your question…" aria-label="Message to Aureum Sales Team" maxLength={1000} required />
                  <button className={styles.send} type="submit" disabled={status === 'submitting'}>Send</button>
                </form>
                <p className={styles.reminder}>This session closes after 2 minutes without a reply.</p>
              </div>
            </div>
          )}

          <nav className={styles.rail} aria-label="Chatbot actions">
            <button className={`${styles.tab} ${activeTab === 'enquire' ? styles.tabActive : ''}`} type="button" aria-selected={activeTab === 'enquire'} onClick={() => selectTab('enquire')}>
              <span className={styles.tabIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 20h16M6 20V9l6-4 6 4v11M9 20v-5h6v5M9 10h.01M12 10h.01M15 10h.01" /></svg>
              </span>
              Enquire
            </button>
            <a className={styles.tab} href={callHref} onClick={() => track(ANALYTICS_EVENTS.callClick, { placement: 'chatbot' })}>
              <span className={styles.tabIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M7 4h3l1.5 4-2 1.5a14 14 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2C11 19 5 13 5 6a2 2 0 0 1 2-2Z" /></svg>
              </span>
              Call
            </a>
            <button className={`${styles.tab} ${activeTab === 'chat' ? styles.tabActive : ''}`} type="button" aria-selected={activeTab === 'chat'} onClick={() => selectTab('chat')}>
              <span className={styles.tabIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5h-6L7 20v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8Z" /><path d="M8 9h.01M12 9h.01M16 9h.01" /></svg>
              </span>
              Chat
            </button>
          </nav>
        </section>
      )}

      {!open && (
        <button className={styles.openButton} type="button" onClick={openChat} aria-label="Open Aureum Sales Team chatbot">
          <span className={styles.openButtonIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5h-6L7 20v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8Z" /><path d="M8 9h.01M12 9h.01M16 9h.01" /></svg>
          </span>
          Chat with Aureum
        </button>
      )}
    </aside>
  );
}
