'use client';
import { useTranslation } from 'react-i18next';
import { valuesData } from '@/data/values';

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section-title fade-up">{t('about.sectionTitle')}</h2>
        <p className="section-subtitle fade-up">{t('about.sectionSubtitle')}</p>
        <div className="about-grid">
          <div className="about-image fade-up">
            <img src="/images/collabrtaion.jpg" alt={t('about.alt')} />
          </div>
          <div className="about-text fade-up">
            <h2>{t('about.heading')}</h2>
            <p>{t('about.paragraph1')}</p>
            <p>{t('about.paragraph2')}</p>
            <div className="about-stats">
              <div><div className="stat-number">{t('about.statProjectsValue')}</div><div className="stat-label">{t('about.statProjects')}</div></div>
              <div><div className="stat-number">{t('about.statClientsValue')}</div><div className="stat-label">{t('about.statClients')}</div></div>
              <div><div className="stat-number">{t('about.statYearsValue')}</div><div className="stat-label">{t('about.statYears')}</div></div>
            </div>
          </div>
        </div>
        <div className="values-grid">
          {valuesData.map((v, i) => (
            <div key={i} className="value-card fade-up">
              <span className="icon-s" dangerouslySetInnerHTML={{ __html: v.icon }} />
              <h4>{t(`about.values.${i}.title`)}</h4>
              <p>{t(`about.values.${i}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
