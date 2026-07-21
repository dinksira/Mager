'use client';
import { useTranslation } from 'react-i18next';
import { teamData } from '@/data/team';
import TeamCard from '@/components/cards/TeamCard';

export default function Team() {
  const { t } = useTranslation();

  return (
    <section className="section" id="team">
      <div className="container">
        <h2 className="section-title fade-up">{t('team.sectionTitle')}</h2>
        <p className="section-subtitle fade-up">{t('team.sectionSubtitle')}</p>
        <div className="team-grid">
          {teamData.map((tm, i) => (
            <TeamCard
              key={i}
              image={tm.image}
              name={t(`team.members.${i}.name`)}
              role={t(`team.members.${i}.role`)}
              desc={t(`team.members.${i}.desc`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
