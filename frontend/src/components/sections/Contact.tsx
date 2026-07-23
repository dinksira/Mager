'use client';
import { useEffect, useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useContent } from '@/contexts/ContentContext';

declare const L: any;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export default function Contact() {
  const { t } = useTranslation();
  const { overrides } = useContent();
  const val = (key: string) => overrides[key] || t(key);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      if (typeof L !== 'undefined') {
        const map = L.map('map').setView([8.9916, 38.7732], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: t('contact.mapAttribution')
        }).addTo(map);
        L.marker([8.9916, 38.7732]).addTo(map)
          .bindPopup(`<b>${val('contact.mapTitle')}</b><br>${val('contact.mapAddress')}`)
          .openPopup();
      }
    };
    document.head.appendChild(script);
  }, [t]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    const form = e.currentTarget as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to send');
      setSending(false);
      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 3000);
    } catch {
      setSending(false);
      setError(t('contact.error'));
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-tag" data-reveal="up">{val('contact.sectionTitle')}</div>
        <h2 className="section-title" data-reveal="up">{val('contact.sectionSubtitle')}</h2>
        <div className="contact-grid">
          <div className="contact-info" data-reveal="up">
            <h3>{val('contact.heading')}</h3>
            <p>{val('contact.intro')}</p>
            <div className="contact-detail">
              <span className="icon-xs">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2C6.7 2 4 4.5 4 7.5 4 12 10 18 10 18s6-6 6-10.5C16 4.5 13.3 2 10 2z"/><circle cx="10" cy="7.5" r="2"/></svg>
              </span>
              <div><h4>{val('contact.address')}</h4><p>{val('contact.addressValue')}</p></div>
            </div>
            <div className="contact-detail">
              <span className="icon-xs">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14.2v1.5a1 1 0 01-1.1 1 9.7 9.7 0 01-4.2-1.5 9.6 9.6 0 01-3-3 9.7 9.7 0 01-1.5-4.3A1 1 0 018.3 6h1.5a1 1 0 011 .8l.3 1.4a1 1 0 01-.3 1l-.6.6a7 7 0 002.5 2.5l.6-.6a1 1 0 011-.3l1.4.3a1 1 0 01.8 1.1z"/></svg>
              </span>
              <div><h4>{val('contact.phone')}</h4><p>{val('contact.phoneValue')}</p></div>
            </div>
            <div className="contact-detail">
              <span className="icon-xs">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 6l8 5 8-5"/></svg>
              </span>
              <div><h4>{val('contact.email')}</h4><p>{val('contact.emailValue')}</p></div>
            </div>
            <div className="contact-detail">
              <span className="icon-xs">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="8"/><polyline points="10 5 10 10 14 12"/></svg>
              </span>
              <div><h4>{val('contact.hours')}</h4><p>{val('contact.hoursValue')}</p></div>
            </div>
            <div id="map" />
          </div>
          <form className="contact-form" data-reveal="up" onSubmit={handleSubmit}>
            <h3>{t('contact.formTitle')}</h3>
            <div className="form-group">
              <label htmlFor="name">{t('contact.formName')}</label>
              <input type="text" id="name" name="name" placeholder={t('contact.formNamePlaceholder')} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('contact.formEmail')}</label>
              <input type="email" id="email" name="email" placeholder={t('contact.formEmailPlaceholder')} required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">{t('contact.formSubject')}</label>
              <input type="text" id="subject" name="subject" placeholder={t('contact.formSubjectPlaceholder')} />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t('contact.formMessage')}</label>
              <textarea id="message" name="message" placeholder={t('contact.formMessagePlaceholder')} required></textarea>
            </div>
            {error && <div className="form-error">{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sent ? t('contact.sent') : sending ? t('contact.sending') : t('contact.send')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
