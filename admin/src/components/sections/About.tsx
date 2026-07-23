'use client';
import { useTranslation } from 'react-i18next';
import EditableImage from '@/components/admin/EditableImage';
import Editable from '@/components/admin/Editable';
import StatsEditor from '@/components/admin/StatsEditor';
import ValuesEditor from '@/components/admin/ValuesEditor';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:4000';

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-tag" data-reveal="up"><Editable path="about.sectionTitle">{t('about.sectionTitle')}</Editable></div>
        <h2 className="section-title" data-reveal="up"><Editable path="about.heading">{t('about.heading')}</Editable></h2>

        <div className="about-grid">
          <div className="about-image" data-reveal="up">
            <EditableImage path="about.image" src={`${BACKEND_URL}/uploads/collabrtaion.jpg`} alt={t('about.alt')} />
          </div>
          <div className="about-text" data-reveal="up">
            <div className="about-text-p"><Editable path="about.paragraph1" type="textarea">{t('about.paragraph1')}</Editable></div>
            <div className="about-text-p"><Editable path="about.paragraph2" type="textarea">{t('about.paragraph2')}</Editable></div>
            <StatsEditor />
          </div>
        </div>

        <ValuesEditor />
      </div>
    </section>
  );
}
