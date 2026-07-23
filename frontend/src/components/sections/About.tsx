'use client';
import { useTranslation } from 'react-i18next';
import { useContent } from '@/contexts/ContentContext';
import { ICONS } from '@/data/icons';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export default function About() {
  const { t } = useTranslation();
  const { overrides } = useContent();

  const img = overrides['about.image'] || 'collabrtaion.jpg';
  const imgSrc = img.startsWith('images/') ? `/${img}` : `${BACKEND_URL}/uploads/${encodeURIComponent(img)}`;

  let stats: {value:string,label:string}[] = [];
  try { const r = overrides['about.stats']; if (r) stats = JSON.parse(r); } catch {}
  let values: {icon:string,title:string,desc:string}[] = [];
  try { const r = overrides['about.values']; if (r) values = JSON.parse(r); } catch {}

  const val = (key: string) => overrides[key] || t(key);

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-tag" data-reveal="up">{val('about.sectionTitle')}</div>
        <h2 className="section-title" data-reveal="up">
          {val('about.heading')}
        </h2>

        <div className="about-grid">
          <div className="about-image" data-reveal="up">
            <img src={imgSrc} alt={val('about.alt') || 'Mager Software team collaboration'} />
          </div>
          <div className="about-text" data-reveal="up">
            <div className="about-text-p">{val('about.paragraph1')}</div>
            <div className="about-text-p">{val('about.paragraph2')}</div>
            {stats.length > 0 && (
              <div className="about-stats">
                {stats.map((s, i) => (
                  <div key={i} className="stat-item">
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {values.length > 0 && (
          <div className="values-grid" data-reveal="up">
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <span className="icon-s" dangerouslySetInnerHTML={{ __html: ICONS[v.icon as keyof typeof ICONS] || '' }} />
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
