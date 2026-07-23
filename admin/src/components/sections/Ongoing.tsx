'use client';
import { useTranslation } from 'react-i18next';
import Editable from '@/components/admin/Editable';
import OngoingEditor from '@/components/admin/OngoingEditor';

export default function Ongoing({ onOngoingClick }: { onOngoingClick: (index: number) => void }) {
  const { t } = useTranslation();

  return (
    <section className="section" id="ongoing">
      <div className="container">
        <div className="section-tag" data-reveal="up"><Editable path="ongoing.sectionTitle">{t('ongoing.sectionTitle')}</Editable></div>
        <h2 className="section-title" data-reveal="up"><Editable path="ongoing.sectionSubtitle">{t('ongoing.sectionSubtitle')}</Editable></h2>
        <OngoingEditor onOngoingClick={onOngoingClick} />
      </div>
    </section>
  );
}
