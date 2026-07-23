'use client';
import { useTranslation } from 'react-i18next';
import Editable from '@/components/admin/Editable';
import TestimonialsEditor from '@/components/admin/TestimonialsEditor';

export default function Testimonials() {
  const { t } = useTranslation();

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section-tag" data-reveal="up"><Editable path="testimonials.sectionTitle">{t('testimonials.sectionTitle')}</Editable></div>
        <h2 className="section-title" data-reveal="up"><Editable path="testimonials.sectionSubtitle">{t('testimonials.sectionSubtitle')}</Editable></h2>
        <TestimonialsEditor />
      </div>
    </section>
  );
}
