'use client';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useEditMode } from '@/contexts/EditModeContext';
import MessagesPanel from '@/components/admin/MessagesPanel';
import Editable from '@/components/admin/Editable';

declare const L: any;

export default function Contact() {
  const { t } = useTranslation();
  const { editedContent, publishedContent } = useEditMode();
  const val = (key: string) => editedContent[key] ?? publishedContent[key] ?? t(key);
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
        mapInstance.current = L.map('map').setView([8.9916, 38.7732], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: t('contact.mapAttribution')
        }).addTo(mapInstance.current);
        L.marker([8.9916, 38.7732]).addTo(mapInstance.current)
          .bindPopup(`<b>${val('contact.mapTitle')}</b><br>${val('contact.mapAddress')}`)
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

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-tag" data-reveal="up"><Editable path="contact.sectionTitle">{val('contact.sectionTitle')}</Editable></div>
        <h2 className="section-title" data-reveal="up"><Editable path="contact.sectionSubtitle">{val('contact.sectionSubtitle')}</Editable></h2>
        <div className="contact-grid">
          <div className="contact-info" data-reveal="up">
            <h3><Editable path="contact.heading">{val('contact.heading')}</Editable></h3>
            <p><Editable path="contact.intro" type="textarea">{val('contact.intro')}</Editable></p>
            <div className="contact-detail">
              <span className="icon-xs">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2C6.7 2 4 4.5 4 7.5 4 12 10 18 10 18s6-6 6-10.5C16 4.5 13.3 2 10 2z"/><circle cx="10" cy="7.5" r="2"/></svg>
              </span>
              <div><h4><Editable path="contact.address">{val('contact.address')}</Editable></h4><p><Editable path="contact.addressValue">{val('contact.addressValue')}</Editable></p></div>
            </div>
            <div className="contact-detail">
              <span className="icon-xs">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14.2v1.5a1 1 0 01-1.1 1 9.7 9.7 0 01-4.2-1.5 9.6 9.6 0 01-3-3 9.7 9.7 0 01-1.5-4.3A1 1 0 018.3 6h1.5a1 1 0 011 .8l.3 1.4a1 1 0 01-.3 1l-.6.6a7 7 0 002.5 2.5l.6-.6a1 1 0 011-.3l1.4.3a1 1 0 01.8 1.1z"/></svg>
              </span>
              <div><h4><Editable path="contact.phone">{val('contact.phone')}</Editable></h4><p><Editable path="contact.phoneValue">{val('contact.phoneValue')}</Editable></p></div>
            </div>
            <div className="contact-detail">
              <span className="icon-xs">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 6l8 5 8-5"/></svg>
              </span>
              <div><h4><Editable path="contact.email">{val('contact.email')}</Editable></h4><p><Editable path="contact.emailValue">{val('contact.emailValue')}</Editable></p></div>
            </div>
            <div className="contact-detail">
              <span className="icon-xs">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="8"/><polyline points="10 5 10 10 14 12"/></svg>
              </span>
              <div><h4><Editable path="contact.hours">{val('contact.hours')}</Editable></h4><p><Editable path="contact.hoursValue">{val('contact.hoursValue')}</Editable></p></div>
            </div>
            <div id="map" />
          </div>
          <div data-reveal="up">
            <MessagesPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
