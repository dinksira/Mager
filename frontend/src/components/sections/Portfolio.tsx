'use client';
import { useTranslation } from 'react-i18next';
import { portfolioData } from '@/data/portfolio';
import PortfolioCard from '@/components/cards/PortfolioCard';

export default function Portfolio({ onPortfolioClick }: { onPortfolioClick: (index: number) => void }) {
  const { t } = useTranslation();

  return (
    <section className="section" id="portfolio" style={{ paddingTop: 0 }}>
      <div className="container">
        <h2 className="section-title fade-up">{t('portfolio.sectionTitle')}</h2>
        <p className="section-subtitle fade-up">{t('portfolio.sectionSubtitle')}</p>
        <div className="portfolio-grid">
          {portfolioData.map((p, i) => (
            <PortfolioCard
              key={i}
              image={p.images[0].src}
              category={t(`portfolio.items.${i}.tag`)}
              title={t(`portfolio.items.${i}.title`)}
              desc={t(`portfolio.items.${i}.desc`)}
              tags={p.tech}
              onClick={() => onPortfolioClick(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
