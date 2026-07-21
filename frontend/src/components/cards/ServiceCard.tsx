'use client';
import { useTranslation } from 'react-i18next';

export default function ServiceCard({ icon, title, desc, onClick }: { icon: string; title: string; desc: string; onClick: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="service-card fade-up" onClick={onClick}>
      <span className="icon-s" dangerouslySetInnerHTML={{ __html: icon }} />
      <h3>{title}</h3>
      <p>{desc}</p>
      <span className="service-link">{t('services.learnMore')}</span>
    </div>
  );
}
