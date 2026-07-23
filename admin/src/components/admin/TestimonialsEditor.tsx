'use client';

import { useRef, useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { testimonialsData } from '@/data/testimonials';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:4000';

interface TestimonialItem { quote: string; name: string; role: string; company: string; avatar: string; }

function imgUrl(item: TestimonialItem) {
  if (!item.avatar) return undefined;
  if (item.avatar.startsWith('http://') || item.avatar.startsWith('https://')) return item.avatar;
  if (item.avatar.startsWith('images/')) return `/${item.avatar}`;
  return `${BACKEND_URL}/uploads/${encodeURIComponent(item.avatar)}`;
}

export default function TestimonialsEditor() {
  const { editMode, editedContent, publishedContent, updateContent } = useEditMode();
  const fileInputs = useRef<Record<number, HTMLInputElement | null>>({});
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const raw = editedContent['testimonials.items'] ?? publishedContent['testimonials.items'];
  const items: TestimonialItem[] = raw ? JSON.parse(raw) : testimonialsData;

  const save = (next: TestimonialItem[]) => {
    updateContent('testimonials.items', JSON.stringify(next));
  };

  const update = (i: number, patch: Partial<TestimonialItem>) => {
    save(items.map((it, idx) => idx === i ? { ...it, ...patch } : it));
  };

  const remove = (i: number) => {
    save(items.filter((_, idx) => idx !== i));
  };

  const add = () => {
    save([...items, { quote: '', name: '', role: '', company: '', avatar: '' }]);
  };

  const handleFile = async (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('image', file);
    try {
      const r = await fetch(`${BACKEND_URL}/api/content/upload-image`, { method: 'POST', body: fd });
      const d = await r.json();
      if (d.ok) update(i, { avatar: d.filename });
    } catch {}
    if (fileInputs.current[i]) fileInputs.current[i]!.value = '';
  };

  if (!editMode) {
    if (!items || items.length === 0) return null;
    return (
      <div className="testimonials-grid" data-reveal="up">
        {items.map((item, i) => (
          <div key={i} className="testimonial-card">
            <div className="testimonial-q-svg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h4v4H3zM13 12h4v4h-4z"/>
                <path d="M7 12c0 3 1.5 4.5 4.5 6"/>
                <path d="M17 12c0 3-1.5 4.5-4.5 6"/>
              </svg>
            </div>
            <p className="testimonial-q-text">{item.quote}</p>
            <div className="testimonial-author">
              {item.avatar && (
                <div className="testimonial-avatar">
                  <img src={imgUrl(item)} alt={item.name} />
                </div>
              )}
              <div className="testimonial-author-info">
                <h4>{item.name}</h4>
                <span>{item.role}, {item.company}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ marginTop: 20 }}>
      <div className="testimonials-grid">
        {items.map((t, i) => (
          <div key={i} className="te-card" style={{ position: 'relative' }}>
            <button className="te-delete" onClick={() => setConfirmDelete(i)} title="Remove testimonial">&times;</button>
            <div className="te-image-section" onClick={() => fileInputs.current[i]?.click()} style={{ cursor: 'pointer' }}>
              {t.avatar ? (
                <img src={imgUrl(t)} alt={t.name} className="te-preview" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div className="te-no-image" style={{ width: 60, height: 60, borderRadius: '50%' }}>+ Avatar</div>
              )}
              <input ref={el => { fileInputs.current[i] = el; }} type="file" accept="image/*" hidden onChange={e => handleFile(i, e)} />
            </div>
            <div className="te-field">
              <label>Name</label>
              <input value={t.name} onChange={e => update(i, { name: e.target.value })} placeholder="Full name" />
            </div>
            <div className="te-field">
              <label>Role</label>
              <input value={t.role} onChange={e => update(i, { role: e.target.value })} placeholder="e.g. CEO" />
            </div>
            <div className="te-field">
              <label>Company</label>
              <input value={t.company} onChange={e => update(i, { company: e.target.value })} placeholder="Company name" />
            </div>
            <div className="te-field">
              <label>Quote</label>
              <textarea value={t.quote} onChange={e => update(i, { quote: e.target.value })} placeholder="Testimonial quote" rows={4} />
            </div>
          </div>
        ))}
      </div>
      <div className="te-card te-add-card" onClick={add} title="Add new testimonial" style={{ width: 200, marginTop: 16 }}>
        <span className="te-plus">+</span>
        <span className="te-add-label">Add Testimonial</span>
      </div>
      <ConfirmModal open={confirmDelete !== null} title="Delete Testimonial" message="Are you sure you want to delete this testimonial? This action cannot be undone." onConfirm={() => { if (confirmDelete !== null) remove(confirmDelete); setConfirmDelete(null); }} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
}
