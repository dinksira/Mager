'use client';
import { useEffect, useRef, useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

declare const L: any;

export default function Contact() {
  const { t } = useTranslation();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const mapInitialized = useRef(false);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    const el = document.getElementById('map');
    if (!el || mapInitialized.current) return;

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      if (typeof L !== 'undefined' && !mapInitialized.current) {
        mapInitialized.current = true;
        mapInstance.current = L.map('map').setView([9.0238, 38.7468], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: t('contact.mapAttribution')
        }).addTo(mapInstance.current);
        L.marker([9.0238, 38.7468]).addTo(mapInstance.current)
          .bindPopup(`<b>${t('contact.mapTitle')}</b><br>${t('contact.mapAddress')}`)
          .openPopup();
      }
    };
    document.head.appendChild(script);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        mapInitialized.current = false;
      }
    };
  }, [t]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 2000);
    }, 1200);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <h2 className="section-title fade-up">{t('contact.sectionTitle')}</h2>
        <p className="section-subtitle fade-up">{t('contact.sectionSubtitle')}</p>
        <div className="contact-grid">
          <div className="contact-info fade-up">
            <h3>{t('contact.heading')}</h3>
            <p>{t('contact.intro')}</p>
            <div className="contact-detail">
              <span className="icon-xs">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2C6.7 2 4 4.5 4 7.5 4 12 10 18 10 18s6-6 6-10.5C16 4.5 13.3 2 10 2z"/><circle cx="10" cy="7.5" r="2"/></svg>
              </span>
              <div><h4>{t('contact.address')}</h4><p>{t('contact.addressValue')}</p></div>
            </div>
            <div className="contact-detail">
              <span className="icon-xs">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14.2v1.5a1 1 0 01-1.1 1 9.7 9.7 0 01-4.2-1.5 9.6 9.6 0 01-3-3 9.7 9.7 0 01-1.5-4.3A1 1 0 018.3 6h1.5a1 1 0 011 .8l.3 1.4a1 1 0 01-.3 1l-.6.6a7 7 0 002.5 2.5l.6-.6a1 1 0 011-.3l1.4.3a1 1 0 01.8 1.1z"/></svg>
              </span>
              <div><h4>{t('contact.phone')}</h4><p>{t('contact.phoneValue')}</p></div>
            </div>
            <div className="contact-detail">
              <span className="icon-xs">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 6l8 5 8-5"/></svg>
              </span>
              <div><h4>{t('contact.email')}</h4><p>{t('contact.emailValue')}</p></div>
            </div>
            <div className="contact-detail">
              <span className="icon-xs">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="8"/><polyline points="10 5 10 10 14 12"/></svg>
              </span>
              <div><h4>{t('contact.hours')}</h4><p>{t('contact.hoursValue')}</p></div>
            </div>
            <div id="map" style={{ height: 240, marginTop: 32, filter: 'grayscale(1)' }} />
          </div>
          <form className="contact-form fade-up" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t('contact.formName')}</label>
              <input type="text" id="name" placeholder={t('contact.formNamePlaceholder')} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('contact.formEmail')}</label>
              <input type="email" id="email" placeholder={t('contact.formEmailPlaceholder')} required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">{t('contact.formSubject')}</label>
              <input type="text" id="subject" placeholder={t('contact.formSubjectPlaceholder')} />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t('contact.formMessage')}</label>
              <textarea id="message" placeholder={t('contact.formMessagePlaceholder')} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={sending}>
              {sent ? t('contact.sent') : sending ? t('contact.sending') : t('contact.send')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
