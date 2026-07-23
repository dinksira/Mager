'use client';

import { useState } from 'react';
import AdminShell from '@/components/layout/AdminShell';
import Portfolio from '@/components/sections/Portfolio';
import Ongoing from '@/components/sections/Ongoing';
import PortfolioModal from '@/components/modals/PortfolioModal';
import OngoingModal from '@/components/modals/OngoingModal';
import { portfolioData } from '@/data/portfolio';
import { ongoingData } from '@/data/ongoing';
import { useEditMode } from '@/contexts/EditModeContext';

function getItem(editedContent: any, publishedContent: any, key: string, fallback: any[], i: number) {
  try {
    const raw = editedContent[key] ?? publishedContent[key];
    if (raw) {
      const items = JSON.parse(raw);
      if (items?.[i]) return { ...fallback[i], ...items[i] };
    }
  } catch {}
  return fallback[i];
}

function ProjectsPageInner() {
  const [pfModal, setPfModal] = useState(false);
  const [pfIndex, setPfIndex] = useState(0);
  const [ogModal, setOgModal] = useState(false);
  const [ogIndex, setOgIndex] = useState(0);
  const { editedContent, publishedContent } = useEditMode();

  return (
    <>
      <Portfolio onPortfolioClick={(i) => { setPfIndex(i); setPfModal(true); }} />
      <Ongoing onOngoingClick={(i) => { setOgIndex(i); setOgModal(true); }} />
      <PortfolioModal isOpen={pfModal} onClose={() => setPfModal(false)} data={getItem(editedContent, publishedContent, 'portfolio.items', portfolioData, pfIndex)} />
      <OngoingModal isOpen={ogModal} onClose={() => setOgModal(false)} data={getItem(editedContent, publishedContent, 'ongoing.items', ongoingData, ogIndex)} />
    </>
  );
}

export default function ProjectsPage() {
  return (
    <AdminShell>
      <ProjectsPageInner />
    </AdminShell>
  );
}
