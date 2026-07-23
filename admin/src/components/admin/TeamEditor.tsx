'use client';

import { useRef, useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import ConfirmModal from '@/components/admin/ConfirmModal';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:4000';

const DEFAULT_MEMBERS = [
  { image: 'images/team-1.jpg', name: 'Abebe Kebede', role: 'CEO & Founder', desc: 'Visionary leader with 15+ years in software and business strategy.', linkedin: '', twitter: '' },
  { image: 'images/team-2.jpg', name: 'Sara Mulugeta', role: 'CTO', desc: 'Full-stack architect specializing in distributed systems and cloud.', linkedin: '', twitter: '' },
  { image: 'images/team-3.jpg', name: 'Dawit Tadesse', role: 'Lead Designer', desc: 'Creative designer crafting beautiful and intuitive user experiences.', linkedin: '', twitter: '' },
  { image: 'images/team-4.jpg', name: 'Hiwot Girma', role: 'Project Manager', desc: 'Ensuring every project delivers on time, on scope, and on budget.', linkedin: '', twitter: '' },
];

interface MemberItem { image: string; name: string; role: string; desc: string; linkedin: string; twitter: string; }

function imgUrl(item: MemberItem) {
  if (!item.image) return undefined;
  if (item.image.startsWith('images/')) return `/${item.image}`;
  return `${BACKEND_URL}/uploads/${encodeURIComponent(item.image)}`;
}

export default function TeamEditor() {
  const { editMode, editedContent, publishedContent, updateContent } = useEditMode();
  const fileInputs = useRef<Record<number, HTMLInputElement | null>>({});
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const raw = editedContent['team.members'] ?? publishedContent['team.members'];
  const items: MemberItem[] = raw ? JSON.parse(raw) : DEFAULT_MEMBERS;

  const save = (next: MemberItem[]) => {
    updateContent('team.members', JSON.stringify(next));
  };

  const update = (i: number, patch: Partial<MemberItem>) => {
    save(items.map((it, idx) => idx === i ? { ...it, ...patch } : it));
  };

  const remove = (i: number) => {
    save(items.filter((_, idx) => idx !== i));
  };

  const add = () => {
    save([...items, { image: '', name: '', role: '', desc: '', linkedin: '', twitter: '' }]);
  };

  const handleFile = async (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('image', file);
    try {
      const r = await fetch(`${BACKEND_URL}/api/content/upload-image`, { method: 'POST', body: fd });
      const d = await r.json();
      if (d.ok) update(i, { image: d.filename });
    } catch {}
    if (fileInputs.current[i]) fileInputs.current[i]!.value = '';
  };

  if (!editMode) {
    return (
      <div className="team-grid">
        {items.map((m, i) => (
          <div key={i} className="team-card fade-up">
            <div className="team-avatar"><img src={imgUrl(m)} alt={m.name} /></div>
            <div className="team-info">
              <h4>{m.name}</h4>
              <div className="role">{m.role}</div>
              <p>{m.desc}</p>
              <div className="team-social">
                {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.3A1.8 1.8 0 114.7 6.5a1.8 1.8 0 011.8 1.8zM19 19h-3v-4.3c0-1.7-.7-2.2-1.5-2.2s-1.5.7-1.5 2.2V19h-3v-9h3v1.2a3 3 0 012.5-1.3c1.9 0 3.5 1.3 3.5 4.2z" />
                  </svg>
                </a>}
                {m.twitter && <a href={m.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 5.5a8 8 0 01-2.4.7 4.2 4.2 0 001.8-2.3 8.3 8.3 0 01-2.6 1 4.2 4.2 0 00-7.1 3.8A11.9 11.9 0 013 4.5a4.2 4.2 0 001.3 5.6A4.2 4.2 0 012 9.5v.1a4.2 4.2 0 003.4 4.1 4.2 4.2 0 01-1.9.1 4.2 4.2 0 003.9 2.9A8.4 8.4 0 012 18.5a11.9 11.9 0 006.3 1.8c7.5 0 11.7-6.2 11.7-11.7v-.5A8.4 8.4 0 0022 5.5z" />
                  </svg>
                </a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="team-grid" style={{ marginTop: 20 }}>
      {items.map((m, i) => (
        <div key={i} className="te-card">
          <button className="te-delete" onClick={() => setConfirmDelete(i)} title="Remove member">&times;</button>
          <div className="te-image-section" onClick={() => fileInputs.current[i]?.click()} style={{ cursor: 'pointer' }}>
            {m.image ? (
              <img src={imgUrl(m)} alt={m.name} className="te-preview" />
            ) : (
              <div className="te-no-image">+ Upload</div>
            )}
            <input ref={el => { fileInputs.current[i] = el; }} type="file" accept="image/*" hidden onChange={e => handleFile(i, e)} />
          </div>
          <div className="te-field">
            <label>Name</label>
            <input value={m.name} onChange={e => update(i, { name: e.target.value })} placeholder="Member name" />
          </div>
          <div className="te-field">
            <label>Role</label>
            <input value={m.role} onChange={e => update(i, { role: e.target.value })} placeholder="e.g. CEO" />
          </div>
          <div className="te-field">
            <label>Description</label>
            <textarea value={m.desc} onChange={e => update(i, { desc: e.target.value })} placeholder="Short bio" rows={3} />
          </div>
          <div className="te-field">
            <label>LinkedIn URL</label>
            <input value={m.linkedin} onChange={e => update(i, { linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." />
          </div>
          <div className="te-field">
            <label>Twitter / X URL</label>
            <input value={m.twitter} onChange={e => update(i, { twitter: e.target.value })} placeholder="https://twitter.com/..." />
          </div>
        </div>
      ))}
      <div className="te-card te-add-card" onClick={add} title="Add new member">
        <span className="te-plus">+</span>
        <span className="te-add-label">Add Member</span>
      </div>
      <ConfirmModal open={confirmDelete !== null} title="Delete Team Member" message="Are you sure you want to delete this team member? This action cannot be undone." onConfirm={() => { if (confirmDelete !== null) remove(confirmDelete); setConfirmDelete(null); }} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
}
