'use client';
import { useTranslation } from 'react-i18next';
import Editable from '@/components/admin/Editable';
import TeamEditor from '@/components/admin/TeamEditor';

export default function Team() {
  const { t } = useTranslation();

  return (
    <section className="section" id="team">
      <div className="container">
        <div className="section-tag" data-reveal="up"><Editable path="team.sectionTitle">{t('team.sectionTitle')}</Editable></div>
        <h2 className="section-title" data-reveal="up"><Editable path="team.sectionSubtitle">{t('team.sectionSubtitle')}</Editable></h2>
        <TeamEditor />
      </div>
    </section>
  );
}
