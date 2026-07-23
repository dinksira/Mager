'use client';
import { useTranslation } from 'react-i18next';
import { teamData } from '@/data/team';
import { useContent } from '@/contexts/ContentContext';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

function imgUrl(m: { image: string }) {
  if (!m.image) return undefined;
  if (m.image.startsWith('images/')) return `/${m.image}`;
  return `${BACKEND_URL}/uploads/${encodeURIComponent(m.image)}`;
}

export default function Team() {
  const { t } = useTranslation();
  const { overrides } = useContent();

  let items;
  try {
    items = overrides['team.members']
      ? JSON.parse(overrides['team.members'])
      : teamData.map((tm, i) => ({ image: tm.image, name: t(`team.members.${i}.name`), role: t(`team.members.${i}.role`), desc: t(`team.members.${i}.desc`), linkedin: '', twitter: '' }));
  } catch { items = teamData.map((tm, i) => ({ image: tm.image, name: t(`team.members.${i}.name`), role: t(`team.members.${i}.role`), desc: t(`team.members.${i}.desc`), linkedin: '', twitter: '' })); }

  const val = (key: string) => overrides[key] || t(key);

  return (
    <section className="section" id="team">
      <div className="container">
        <div className="section-tag" data-reveal="up">{val('team.sectionTitle')}</div>
        <h2 className="section-title" data-reveal="up">{val('team.sectionSubtitle')}</h2>
        <div className="team-grid" data-reveal="up">
          {items.map((tm: {image:string,name:string,role:string,desc:string,linkedin:string,twitter:string}, i: number) => (
            <div key={i} className="team-card">
              <div className="team-avatar"><img src={imgUrl(tm)} alt={tm.name} /></div>
              <div className="team-info">
                <h4>{tm.name}</h4>
                <div className="role">{tm.role}</div>
                <p>{tm.desc}</p>
                <div className="team-social">
                  {tm.linkedin && <a href={tm.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.3A1.8 1.8 0 114.7 6.5a1.8 1.8 0 011.8 1.8zM19 19h-3v-4.3c0-1.7-.7-2.2-1.5-2.2s-1.5.7-1.5 2.2V19h-3v-9h3v1.2a3 3 0 012.5-1.3c1.9 0 3.5 1.3 3.5 4.2z" />
                    </svg>
                  </a>}
                  {tm.twitter && <a href={tm.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 5.5a8 8 0 01-2.4.7 4.2 4.2 0 001.8-2.3 8.3 8.3 0 01-2.6 1 4.2 4.2 0 00-7.1 3.8A11.9 11.9 0 013 4.5a4.2 4.2 0 001.3 5.6A4.2 4.2 0 012 9.5v.1a4.2 4.2 0 003.4 4.1 4.2 4.2 0 01-1.9.1 4.2 4.2 0 003.9 2.9A8.4 8.4 0 012 18.5a11.9 11.9 0 006.3 1.8c7.5 0 11.7-6.2 11.7-11.7v-.5A8.4 8.4 0 0022 5.5z" />
                    </svg>
                  </a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
