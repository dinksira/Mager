'use client';
import { useTranslation } from 'react-i18next';
import Editable from '@/components/admin/Editable';
import PartnersEditor from '@/components/admin/PartnersEditor';

export default function Partners() {
  const { t } = useTranslation();

  return (
    <section className="section" id="partners">
      <div className="container">
        <div className="section-tag" data-reveal="up" style={{ textAlign: 'center' }}><Editable path="partners.sectionTitle">{t('partners.sectionTitle')}</Editable></div>
        <PartnersEditor />
      </div>
    </section>
  );
}
