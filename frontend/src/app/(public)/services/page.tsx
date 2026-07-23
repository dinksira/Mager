'use client';

import { useState } from 'react';
import { servicesData } from '@/data/services';
import { useContent } from '@/contexts/ContentContext';
import { useTranslation } from 'react-i18next';
import { SERVICE_ICONS } from '@/data/serviceIcons';
import ServiceModal from '@/components/modals/ServiceModal';

export default function ServicesPage() {
  const { t } = useTranslation();
  const { overrides } = useContent();
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  const items = (() => {
    try {
      const raw = overrides['services.items'];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((s: any, i: number) => ({
            ...servicesData[i],
            ...s,
            features: s.features ?? [],
            tag: s.tag ?? '',
          }));
        }
      }
    } catch {}
    return servicesData;
  })();

  const val = (key: string) => overrides[key] || t(key);

  return (
    <>
      <section className="section section--alt" id="services" style={{ paddingTop: 'calc(56px + 80px)' }}>
        <div className="container">
          <div className="section-tag" data-reveal="up">{val('nav.services')}</div>
          <h2 className="section-title" data-reveal="up">{t('services.sectionSubtitle')}</h2>
          <div className="services-grid" data-reveal="up">
            {items.map((service: any, i: number) => (
              <div key={i} className="service-card" onClick={() => { setSelected(i); setModalOpen(true); }}>
                <span className="icon-s" dangerouslySetInnerHTML={{ __html: SERVICE_ICONS[service.icon] || service.icon || '' }} />
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <span className="service-link">{t('services.learnMore')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceModal isOpen={modalOpen} onClose={() => setModalOpen(false)} data={items[selected]} />
    </>
  );
}
