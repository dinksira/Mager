'use client';
import { useTranslation } from 'react-i18next';
import { servicesData } from '@/data/services';
import { useContent } from '@/contexts/ContentContext';
import { SERVICE_ICONS } from '@/data/serviceIcons';

export default function Services({ onServiceClick }: { onServiceClick: (index: number) => void }) {
  const { t } = useTranslation();
  const { overrides } = useContent();

  let items: {icon:string,title:string,desc:string,features:string[]}[];
  try {
    items = overrides['services.items']
      ? JSON.parse(overrides['services.items'])
      : servicesData.map(s => ({ icon: s.icon, title: s.title, desc: s.desc, features: s.features ?? [] }));
  } catch { items = servicesData.map(s => ({ icon: s.icon, title: s.title, desc: s.desc, features: s.features ?? [] })); }

  const val = (key: string) => overrides[key] || t(key);

  return (
    <section className="section section--alt" id="services">
      <div className="container">
        <div className="section-tag" data-reveal="up">{val('services.sectionTitle')}</div>
        <h2 className="section-title" data-reveal="up">{val('services.sectionSubtitle')}</h2>
        <div className="services-grid" data-reveal="up">
          {items.map((s, i) => (
            <div key={i} className="service-card" onClick={() => onServiceClick(i)}>
              <span className="icon-s" dangerouslySetInnerHTML={{ __html: SERVICE_ICONS[s.icon] || s.icon }} />
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {(s.features ?? []).length > 0 && (
                <ul className="card-features">
                  {s.features.map((f, fi) => (
                    <li key={fi}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <span className="service-link">{t('services.learnMore')}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
