'use client';

import { useRef, useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { partnersData } from '@/data/partners';
import ConfirmModal from '@/components/admin/ConfirmModal';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:4000';

interface PartnerItem { name: string; logo: string; }

function imgUrl(item: PartnerItem) {
  if (!item.logo) return undefined;
  if (item.logo.startsWith('images/')) return `/${item.logo}`;
  return `${BACKEND_URL}/uploads/${encodeURIComponent(item.logo)}`;
}

export default function PartnersEditor() {
  const { editMode, editedContent, publishedContent, updateContent } = useEditMode();
  const fileInputs = useRef<Record<number, HTMLInputElement | null>>({});
  const [editingName, setEditingName] = useState<number | null>(null);
  const [nameDraft, setNameDraft] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const raw = editedContent['partners.items'] ?? publishedContent['partners.items'];
  const items: PartnerItem[] = raw ? JSON.parse(raw) : partnersData;

  const save = (next: PartnerItem[]) => {
    updateContent('partners.items', JSON.stringify(next));
  };

  const update = (i: number, patch: Partial<PartnerItem>) => {
    save(items.map((it, idx) => idx === i ? { ...it, ...patch } : it));
  };

  const remove = (i: number) => {
    save(items.filter((_, idx) => idx !== i));
  };

  const add = () => {
    save([...items, { name: '', logo: '' }]);
  };

  const handleFile = async (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('image', file);
    try {
      const r = await fetch(`${BACKEND_URL}/api/content/upload-image`, { method: 'POST', body: fd });
      const d = await r.json();
      if (d.ok) update(i, { logo: d.filename });
    } catch {}
    if (fileInputs.current[i]) fileInputs.current[i]!.value = '';
  };

  if (!editMode) {
    if (!items || items.length === 0) return null;
    return (
      <div className="partners-row" data-reveal="up">
        {items.map((p, i) => (
          <div key={i} className="partner-item" title={p.name}>
            <img src={imgUrl(p)} alt={p.name} className="partner-logo-img" loading="lazy" />
          </div>
        ))}
      </div>
    );
  }

  const startEditName = (i: number, current: string) => {
    setEditingName(i);
    setNameDraft(current);
  };

  const saveName = (i: number) => {
    if (nameDraft.trim()) update(i, { name: nameDraft.trim() });
    setEditingName(null);
    setNameDraft('');
  };

  return (
    <div className="pe-wrap" style={{ marginTop: 24 }}>
      <div className="pe-partners-grid">
        {items.map((p, i) => (
          <div key={i} className="pe-partner-card">
            <button className="pe-partner-del" onClick={() => setConfirmDelete(i)} title="Remove partner">&times;</button>
            <div className="pe-partner-logo-wrap" onClick={() => fileInputs.current[i]?.click()}>
              {p.logo ? (
                <img src={imgUrl(p)} alt={p.name} className="pe-partner-logo" />
              ) : (
                <div className="pe-partner-placeholder">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span>Upload Logo</span>
                </div>
              )}
              <div className="pe-partner-upload-hint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <input ref={el => { fileInputs.current[i] = el; }} type="file" accept="image/*" hidden onChange={e => handleFile(i, e)} />
            </div>
            <div className="pe-partner-name-wrap">
              {editingName === i ? (
                <input
                  className="pe-partner-name-input"
                  value={nameDraft}
                  onChange={e => setNameDraft(e.target.value)}
                  onBlur={() => saveName(i)}
                  onKeyDown={e => { if (e.key === 'Enter') saveName(i); if (e.key === 'Escape') setEditingName(null); }}
                  autoFocus
                />
              ) : (
                <span className="pe-partner-name" onClick={() => startEditName(i, p.name)}>{p.name || 'Unnamed'}</span>
              )}
            </div>
          </div>
        ))}
        <div className="pe-partner-add" onClick={add} title="Add new partner">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>Add Partner</span>
        </div>
      </div>
      <ConfirmModal open={confirmDelete !== null} title="Remove Partner" message="Are you sure you want to remove this partner? This action cannot be undone." onConfirm={() => { if (confirmDelete !== null) remove(confirmDelete); setConfirmDelete(null); }} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
}
