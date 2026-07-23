'use client';
import { useTranslation } from 'react-i18next';
import { portfolioData } from '@/data/portfolio';
import { useContent } from '@/contexts/ContentContext';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

function imgUrl(src: string) {
  if (!src) return undefined;
  if (src.startsWith('images/')) return `/${src}`;
  return `${BACKEND_URL}/uploads/${encodeURIComponent(src)}`;
}

export default function Portfolio({ onPortfolioClick }: { onPortfolioClick: (index: number) => void }) {
  const { t } = useTranslation();
  const { overrides } = useContent();

  let items;
  try {
    items = overrides['portfolio.items']
      ? JSON.parse(overrides['portfolio.items'])
      : portfolioData.map((p, i) => ({ image: p.images[0].src, tag: t(`portfolio.items.${i}.tag`), title: t(`portfolio.items.${i}.title`), desc: t(`portfolio.items.${i}.desc`), tech: p.tech }));
  } catch { items = portfolioData.map((p, i) => ({ image: p.images[0].src, tag: t(`portfolio.items.${i}.tag`), title: t(`portfolio.items.${i}.title`), desc: t(`portfolio.items.${i}.desc`), tech: p.tech })); }

  const val = (key: string) => overrides[key] || t(key);

  return (
    <section className="section section--alt" id="portfolio">
      <div className="container">
        <div className="section-tag" data-reveal="up">{val('portfolio.sectionTitle')}</div>
        <h2 className="section-title" data-reveal="up">{val('portfolio.sectionSubtitle')}</h2>
        <div className="portfolio-grid" data-reveal="up">
          {items.map((p: {image:string,tag:string,title:string,desc:string,tech:string[]}, i: number) => (
            <div key={i} className="portfolio-card" onClick={() => onPortfolioClick(i)}>
              <div className="portfolio-thumb"><img src={imgUrl(p.image)} alt={p.title} /></div>
              <div className="portfolio-info">
                <span className="portfolio-category">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="portfolio-tags">{p.tech.map((tech, j) => <span key={j} className="tag">{tech}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
