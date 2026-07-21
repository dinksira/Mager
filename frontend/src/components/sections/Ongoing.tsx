'use client';
import { useTranslation } from 'react-i18next';
import { ongoingData } from '@/data/ongoing';
import OngoingCard from '@/components/cards/OngoingCard';

export default function Ongoing({ onOngoingClick }: { onOngoingClick: (index: number) => void }) {
  const { t } = useTranslation();

  return (
    <section className="section" id="ongoing">
      <div className="container">
        <h2 className="section-title fade-up">{t('ongoing.sectionTitle')}</h2>
        <p className="section-subtitle fade-up">{t('ongoing.sectionSubtitle')}</p>
        <div className="ongoing-grid">
          {ongoingData.map((o, i) => {
            const statusMatch = o.status.match(/status-(\w+)/);
            const statusClass = statusMatch ? `status-${statusMatch[1]}` : '';
            return (
              <OngoingCard
                key={i}
                image={o.images[0].src}
                title={t(`ongoing.items.${i}.title`)}
                client={t(`ongoing.items.${i}.client`)}
                desc={t(`ongoing.items.${i}.desc`)}
                progress={o.progress}
                remaining={o.remaining}
                status={statusClass}
                onClick={() => onOngoingClick(i)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
