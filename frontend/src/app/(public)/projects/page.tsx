'use client';

import { useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import { ongoingData } from '@/data/ongoing';
import { useContent } from '@/contexts/ContentContext';
import { useTranslation } from 'react-i18next';
import PortfolioModal from '@/components/modals/PortfolioModal';
import OngoingModal from '@/components/modals/OngoingModal';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

function imgUrl(src: string) {
  if (!src) return undefined;
  if (src.startsWith('images/') || src.startsWith('/')) return `/${src}`;
  return `${BACKEND_URL}/uploads/${encodeURIComponent(src)}`;
}

export default function ProjectsPage() {
  const { t } = useTranslation();
  const { overrides } = useContent();
  const [tab, setTab] = useState<'completed' | 'ongoing'>('completed');
  const [pfModal, setPfModal] = useState(false);
  const [pfIndex, setPfIndex] = useState(0);
  const [ogModal, setOgModal] = useState(false);
  const [ogIndex, setOgIndex] = useState(0);

  const pfItems = (() => {
    try {
      const raw = overrides['portfolio.items'];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.map((p: any, i: number) => ({ ...portfolioData[i], ...p }));
      }
    } catch {}
    return portfolioData;
  })();

  const ogItems = (() => {
    try {
      const raw = overrides['ongoing.items'];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.map((o: any, i: number) => ({ ...ongoingData[i], ...o }));
      }
    } catch {}
    return ongoingData;
  })();

  const val = (key: string) => overrides[key] || t(key);

  return (
    <>
      <section className="section" style={{ paddingTop: 'calc(56px + 80px)' }}>
        <div className="container">
          <div className="section-tag" data-reveal="up">{val('nav.portfolio')}</div>
          <h2 className="section-title" data-reveal="up">{t('projects.sectionSubtitle')}</h2>

          <div className="projects-tabs" data-reveal="up">
            <button className={`btn ${tab === 'completed' ? 'btn-primary' : ''}`} onClick={() => setTab('completed')}>Completed</button>
            <button className={`btn ${tab === 'ongoing' ? 'btn-primary' : ''}`} onClick={() => setTab('ongoing')}>In Progress</button>
          </div>

          {tab === 'completed' && (
            <div className="portfolio-grid">
              {pfItems.map((p: any, i: number) => (
                <div key={i} className="portfolio-card" onClick={() => { setPfIndex(i); setPfModal(true); }}>
                  <div className="portfolio-thumb">
                    <img src={imgUrl(p.images?.[0]?.src || '')} alt={p.title} />
                  </div>
                  <div className="portfolio-info">
                    <span className="portfolio-category">{p.tag}</span>
                    <h3>{p.title}</h3>
                    <p>{p.client}</p>
                    <div className="portfolio-tags">
                      {p.tech?.slice(0, 3).map((t: string, j: number) => (
                        <span key={j} className="tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'ongoing' && (
            <div className="ongoing-grid">
              {ogItems.map((o: any, i: number) => (
                <div key={i} className="ongoing-card" onClick={() => { setOgIndex(i); setOgModal(true); }}>
                  <div className="ongoing-thumb">
                    <img src={imgUrl(o.images?.[0]?.src || '')} alt={o.title} />
                  </div>
                  <div className="ongoing-info">
                    <span className="ongoing-tag">{o.tag}</span>
                    <h3>{o.title}</h3>
                    <div className="ongoing-client">{o.client}</div>
                    <p>{o.desc}</p>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: o.progress }} /></div>
                    <div className="progress-label"><span>{o.progress}</span><span className="ongoing-remaining">{o.remaining}</span></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <PortfolioModal isOpen={pfModal} onClose={() => setPfModal(false)} data={pfItems[pfIndex]} />
      <OngoingModal isOpen={ogModal} onClose={() => setOgModal(false)} data={ogItems[ogIndex]} />
    </>
  );
}
