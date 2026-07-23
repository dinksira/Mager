'use client';

import { useState } from 'react';
import AdminShell from '@/components/layout/AdminShell';
import Services from '@/components/sections/Services';
import ServiceModal from '@/components/modals/ServiceModal';
import { servicesData } from '@/data/services';
import { useEditMode } from '@/contexts/EditModeContext';

function getService(editedContent: any, publishedContent: any, i: number) {
  try {
    const raw = editedContent['services.items'] ?? publishedContent['services.items'];
    if (raw) {
      const items = JSON.parse(raw);
      if (items?.[i]) {
        const s = items[i];
        return { ...servicesData[i], ...s, features: s.features ?? [], tag: s.tag ?? '' };
      }
    }
  } catch {}
  return servicesData[i];
}

function ServicesPageInner() {
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const { editedContent, publishedContent } = useEditMode();

  return (
    <>
      <Services onServiceClick={(i) => { setIndex(i); setModalOpen(true); }} />
      <ServiceModal isOpen={modalOpen} onClose={() => setModalOpen(false)} data={getService(editedContent, publishedContent, index)} />
    </>
  );
}

export default function ServicesPage() {
  return (
    <AdminShell>
      <ServicesPageInner />
    </AdminShell>
  );
}
