'use client';
import { useTranslation } from 'react-i18next';
import { ongoingData } from '@/data/ongoing';
import { useContent } from '@/contexts/ContentContext';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

function imgUrl(src: string) {
  if (!src) return undefined;
  if (src.startsWith('images/')) return `/${src}`;
  return `${BACKEND_URL}/uploads/${encodeURIComponent(src)}`;
}

export default function Ongoing({ onOngoingClick }: { onOngoingClick: (index: number) => void }) {
  const { t } = useTranslation();
  const { overrides } = useContent();

  let items;
  try {
    items = overrides['ongoing.items']
      ? JSON.parse(overrides['ongoing.items'])
      : ongoingData.map((o, i) => ({ image: o.images[0].src, tag: t(`ongoing.items.${i}.tag`), title: t(`ongoing.items.${i}.title`), client: t(`ongoing.items.${i}.client`), desc: t(`ongoing.items.${i}.desc`), progress: o.progress, remaining: o.remaining, tech: o.tech }));
  } catch { items = ongoingData.map((o, i) => ({ image: o.images[0].src, tag: t(`ongoing.items.${i}.tag`), title: t(`ongoing.items.${i}.title`), client: t(`ongoing.items.${i}.client`), desc: t(`ongoing.items.${i}.desc`), progress: o.progress, remaining: o.remaining, tech: o.tech })); }

  const val = (key: string) => overrides[key] || t(key);

  return (
    <section className="section" id="ongoing">
      <div className="container">
        <div className="section-tag" data-reveal="up">{val('ongoing.sectionTitle')}</div>
        <h2 className="section-title" data-reveal="up">{val('ongoing.sectionSubtitle')}</h2>
        <div className="ongoing-grid" data-reveal="up">
          {items.map((o: {image:string,tag:string,title:string,client:string,desc:string,progress:string,remaining:string,tech:string[]}, i: number) => (
            <div key={i} className="ongoing-card" onClick={() => onOngoingClick(i)}>
              <div className="ongoing-thumb"><img src={imgUrl(o.image)} alt={o.title} /></div>
              <div className="ongoing-info">
                <span className="ongoing-tag">{o.tag}</span>
                <h3>{o.title}</h3>
                <p className="ongoing-client">{o.client}</p>
                <p>{o.desc}</p>
                <div className="ongoing-progress">
                  <div className="progress-bar"><div className="progress-fill" style={{ width: o.progress }} /></div>
                  <div className="progress-label"><span>{o.progress}</span><span>{o.remaining}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
