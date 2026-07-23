'use client';

import { useTranslation } from 'react-i18next';
import { useContent } from '@/contexts/ContentContext';
import { partnersData } from '@/data/partners';

export default function Partners() {
  const { t } = useTranslation();
  const { overrides } = useContent();

  let items;
  try {
    items = overrides['partners.items']
      ? JSON.parse(overrides['partners.items'])
      : partnersData;
  } catch { items = partnersData; }

  const val = (key: string) => overrides[key] || t(key);

  if (!items || items.length === 0) return null;

  return (
    <section className="section" id="partners" style={{ paddingTop: 0, paddingBottom: 40 }}>
      <div className="container">
        <div className="section-tag" data-reveal="up" style={{ textAlign: 'center' }}>{val('partners.sectionTitle')}</div>
        <div className="partners-row" data-reveal="up">
          {items.map((p: { name: string; logo: string }, i: number) => (
            <div key={i} className="partner-item" title={p.name}>
              <img src={p.logo} alt={p.name} className="partner-logo-img" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
