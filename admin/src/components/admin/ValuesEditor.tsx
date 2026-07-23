'use client';

import { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { ICONS, ICON_OPTIONS } from '@/data/icons';
import ConfirmModal from '@/components/admin/ConfirmModal';

const DEFAULT_VALUES = [
  { icon: 'rocket', title: 'Mission', desc: 'Empower businesses with innovative, scalable technology solutions that drive growth.' },
  { icon: 'compass', title: 'Vision', desc: 'Be the most trusted software partner across Africa and beyond.' },
  { icon: 'shield', title: 'Integrity', desc: 'We uphold honesty, transparency, and ethical practices in everything we do.' },
  { icon: 'bolt', title: 'Excellence', desc: 'We never settle — continuous improvement is at our core.' },
];

interface ValueItem { icon: string; title: string; desc: string; }

export default function ValuesEditor() {
  const { editMode, editedContent, publishedContent, updateContent } = useEditMode();
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const raw = editedContent['about.values'] ?? publishedContent['about.values'];
  const items: ValueItem[] = raw ? JSON.parse(raw) : DEFAULT_VALUES;

  const save = (next: ValueItem[]) => {
    updateContent('about.values', JSON.stringify(next));
  };

  const update = (i: number, patch: Partial<ValueItem>) => {
    save(items.map((it, idx) => idx === i ? { ...it, ...patch } : it));
  };

  const remove = (i: number) => {
    save(items.filter((_, idx) => idx !== i));
  };

  const add = () => {
    save([...items, { icon: 'star', title: '', desc: '' }]);
  };

  if (!editMode) {
    return (
      <div className="values-grid">
        {items.map((v, i) => (
          <div key={i} className="value-card fade-up">
            <span className="icon-s" dangerouslySetInnerHTML={{ __html: ICONS[v.icon] || ICONS.star }} />
            <h4>{v.title}</h4>
            <p>{v.desc}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="values-grid" style={{ marginTop: 40 }}>
      {items.map((v, i) => (
        <div key={i} className="ve-card">
          <button className="ve-delete" onClick={() => setConfirmDelete(i)} title="Remove card">&times;</button>
          <div className="ve-icon-preview" dangerouslySetInnerHTML={{ __html: ICONS[v.icon] || ICONS.star }} />
          <div className="ve-field">
            <label>Icon</label>
            <div className="ve-icon-grid">
              {ICON_OPTIONS.map(o => (
                <button
                  key={o.value}
                  className={`ve-icon-btn${v.icon === o.value ? ' active' : ''}`}
                  onClick={() => update(i, { icon: o.value })}
                  title={o.label}
                  dangerouslySetInnerHTML={{ __html: ICONS[o.value] }}
                />
              ))}
            </div>
          </div>
          <div className="ve-field">
            <label>Title</label>
            <input value={v.title} onChange={e => update(i, { title: e.target.value })} placeholder="Card title" />
          </div>
          <div className="ve-field">
            <label>Description</label>
            <textarea value={v.desc} onChange={e => update(i, { desc: e.target.value })} placeholder="Card description" rows={2} />
          </div>
        </div>
      ))}
      <div className="ve-card ve-add-card" onClick={add} title="Add new card">
        <span className="ve-plus">+</span>
        <span className="ve-add-label">Add Card</span>
      </div>
      <ConfirmModal open={confirmDelete !== null} title="Delete Card" message="Are you sure you want to delete this value card? This action cannot be undone." onConfirm={() => { if (confirmDelete !== null) remove(confirmDelete); setConfirmDelete(null); }} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
}
