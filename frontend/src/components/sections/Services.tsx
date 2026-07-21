'use client';
import { useTranslation } from 'react-i18next';
import { servicesData } from '@/data/services';
import ServiceCard from '@/components/cards/ServiceCard';

export default function Services({ onServiceClick }: { onServiceClick: (index: number) => void }) {
  const { t } = useTranslation();

  return (
    <section className="section" id="services" style={{ paddingTop: 0 }}>
      <div className="container">
        <h2 className="section-title fade-up">{t('services.sectionTitle')}</h2>
        <p className="section-subtitle fade-up">{t('services.sectionSubtitle')}</p>
        <div className="services-grid">
          {servicesData.map((s, i) => (
            <ServiceCard
              key={i}
              icon={s.icon}
              title={t(`services.items.${i}.title`)}
              desc={t(`services.items.${i}.desc`)}
              onClick={() => onServiceClick(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
