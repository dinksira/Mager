'use client';
import { useTranslation } from 'react-i18next';
import Editable from '@/components/admin/Editable';
import ServicesEditor from '@/components/admin/ServicesEditor';

export default function Services({ onServiceClick }: { onServiceClick: (index: number) => void }) {
  const { t } = useTranslation();

  return (
    <section className="section section--alt" id="services">
      <div className="container">
        <div className="section-tag" data-reveal="up"><Editable path="services.sectionTitle">{t('services.sectionTitle')}</Editable></div>
        <h2 className="section-title" data-reveal="up"><Editable path="services.sectionSubtitle">{t('services.sectionSubtitle')}</Editable></h2>
        <ServicesEditor onServiceClick={onServiceClick} />
      </div>
    </section>
  );
}
