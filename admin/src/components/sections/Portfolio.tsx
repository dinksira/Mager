'use client';
import { useTranslation } from 'react-i18next';
import Editable from '@/components/admin/Editable';
import PortfolioEditor from '@/components/admin/PortfolioEditor';

export default function Portfolio({ onPortfolioClick }: { onPortfolioClick: (index: number) => void }) {
  const { t } = useTranslation();

  return (
    <section className="section section--alt" id="portfolio">
      <div className="container">
        <div className="section-tag" data-reveal="up"><Editable path="portfolio.sectionTitle">{t('portfolio.sectionTitle')}</Editable></div>
        <h2 className="section-title" data-reveal="up"><Editable path="portfolio.sectionSubtitle">{t('portfolio.sectionSubtitle')}</Editable></h2>
        <PortfolioEditor onPortfolioClick={onPortfolioClick} />
      </div>
    </section>
  );
}
