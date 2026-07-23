'use client';

import { useRef, useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import TagInput from '@/components/admin/TagInput';
import ConfirmModal from '@/components/admin/ConfirmModal';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:4000';

const PRESET_TAGS = ['In Development', 'Testing', 'Planning', 'Completed', 'Maintenance'];

const DEFAULT_ONGOING = [
  { image: 'images/ongoing-banking.jpg', tag: 'In Development', title: 'Banking Dashboard', client: 'Client: ABC Bank', progress: '75%', remaining: '3 weeks remaining', desc: 'A comprehensive real-time analytics dashboard for banking operations.', tech: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'WebSocket', 'Docker'] },
  { image: 'images/ongoing-telemed.jpg', tag: 'Testing', title: 'Telemedicine Platform', client: 'Client: HealthNet', progress: '40%', remaining: '6 weeks remaining', desc: 'An end-to-end telemedicine solution that connects patients with healthcare providers remotely.', tech: ['Flutter', 'WebRTC', 'Node.js', 'MongoDB', 'Socket.io', 'Azure'] },
  { image: 'images/ongoing-school.jpg', tag: 'Testing', title: 'School Management System', client: 'Client: Ministry of Education', progress: '90%', remaining: '1 week remaining', desc: 'A comprehensive school management platform designed for the national education system.', tech: ['Next.js', 'PostgreSQL', 'Python', 'FastAPI', 'Docker', 'Azure'] },
  { image: 'images/ongoing-logistics.jpg', tag: 'Planning', title: 'Logistics Fleet Manager', client: 'Client: FreightCo', progress: '20%', remaining: '10 weeks remaining', desc: 'A GPS-based fleet tracking and logistics optimization platform.', tech: ['React Native', 'Node.js', 'PostgreSQL', 'Google Maps API', 'Redis', 'Docker'] },
];

interface OngoingItem { image: string; tag: string; title: string; client: string; progress: string; remaining: string; desc: string; tech: string[]; }

export default function OngoingEditor({ onOngoingClick }: { onOngoingClick?: (index: number) => void }) {
  const { editMode, editedContent, publishedContent, updateContent } = useEditMode();
  const fileInputs = useRef<Record<number, HTMLInputElement | null>>({});
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const raw = editedContent['ongoing.items'] ?? publishedContent['ongoing.items'];
  const items: OngoingItem[] = raw ? JSON.parse(raw) : DEFAULT_ONGOING;

  const save = (next: OngoingItem[]) => updateContent('ongoing.items', JSON.stringify(next));

  const update = (i: number, patch: Partial<OngoingItem>) => save(items.map((it, idx) => idx === i ? { ...it, ...patch } : it));

  const remove = (i: number) => save(items.filter((_, idx) => idx !== i));

  const add = () => save([...items, { image: '', tag: '', title: '', client: '', progress: '', remaining: '', desc: '', tech: [] }]);

  const handleFile = async (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData(); fd.append('image', file);
    try {
      const r = await fetch(`${BACKEND_URL}/api/content/upload-image`, { method: 'POST', body: fd });
      const d = await r.json();
      if (d.ok) update(i, { image: d.filename });
    } catch {}
    if (fileInputs.current[i]) fileInputs.current[i]!.value = '';
  };

  if (!editMode) {
    return (
      <div className="ongoing-grid">
        {items.map((o, i) => (
          <div key={i} className="ongoing-card fade-up" onClick={() => onOngoingClick?.(i)}>
            <div className="ongoing-thumb">{o.image ? <img src={o.image.startsWith('images/') ? `/${o.image}` : `${BACKEND_URL}/uploads/${encodeURIComponent(o.image)}`} alt={o.title} /> : <div className="oe-no-image">No image</div>}</div>
            <div className="ongoing-info">
              <span className="ongoing-tag">{o.tag}</span>
              <h3>{o.title}</h3>
              <p className="ongoing-client">{o.client}</p>
              <p>{o.desc}</p>
              <div className="ongoing-progress">
                <div className="progress-bar"><div className="progress-fill" style={{ width: o.progress }} /></div>
                <span>{o.progress}</span>
              </div>
              <span className="ongoing-remaining">{o.remaining}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="ongoing-grid" style={{ marginTop: 20 }}>
      {items.map((o, i) => (
        <div key={i} className="oe-card">
          <button className="oe-delete" onClick={() => setConfirmDelete(i)} title="Remove project">&times;</button>
          <div className="oe-image" onClick={() => fileInputs.current[i]?.click()} style={{ cursor: 'pointer' }}>
            {o.image ? <img src={o.image.startsWith('images/') ? `/${o.image}` : `${BACKEND_URL}/uploads/${encodeURIComponent(o.image)}`} alt={o.title} /> : <div className="oe-no-image">+ Image</div>}
            <input ref={el => { fileInputs.current[i] = el; }} type="file" accept="image/*" hidden onChange={e => handleFile(i, e)} />
          </div>
          <div className="oe-field">
            <label>Status Tag</label>
            <input value={o.tag} onChange={e => update(i, { tag: e.target.value })} placeholder="In Development / Testing / Planning" />
            <div className="tag-presets">
              {PRESET_TAGS.map(t => (
                <button key={t} className={`tag-preset${o.tag === t ? ' active' : ''}`} onClick={() => update(i, { tag: t })}>{t}</button>
              ))}
            </div>
          </div>
          <div className="oe-field"><label>Title</label><input value={o.title} onChange={e => update(i, { title: e.target.value })} placeholder="Project name" /></div>
          <div className="oe-field">
            <label>Client</label>
            <div className="client-input">
              <span className="client-prefix">Client:</span>
              <input value={o.client.replace(/^Client:\s*/i, '')} onChange={e => update(i, { client: 'Client: ' + e.target.value })} placeholder="Company name" />
            </div>
          </div>
          <div className="oe-row">
            <div className="oe-field" style={{ flex: 1 }}>
              <label>Progress</label>
              <div className="progress-slider-wrap">
                <input type="range" min="0" max="100" value={parseInt(o.progress) || 0} onChange={e => update(i, { progress: e.target.value + '%' })} className="progress-slider" />
                <span className="progress-slider-value">{o.progress}</span>
              </div>
            </div>
            <div className="oe-field" style={{ flex: 1 }}><label>Remaining</label><input value={o.remaining} onChange={e => update(i, { remaining: e.target.value })} placeholder="3 weeks" /></div>
          </div>
          <div className="oe-field"><label>Description</label><textarea value={o.desc} onChange={e => update(i, { desc: e.target.value })} rows={2} /></div>
          <div className="oe-field"><label>Tech</label><TagInput value={o.tech} onChange={v => update(i, { tech: v })} placeholder="Type a tech and press space" /></div>
        </div>
      ))}
      <div className="oe-card oe-add-card" onClick={add} title="Add project"><span className="oe-plus">+</span><span className="oe-add-label">Add Project</span></div>
      <ConfirmModal open={confirmDelete !== null} title="Delete Ongoing Project" message="Are you sure you want to delete this ongoing project? This action cannot be undone." onConfirm={() => { if (confirmDelete !== null) remove(confirmDelete); setConfirmDelete(null); }} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
}
