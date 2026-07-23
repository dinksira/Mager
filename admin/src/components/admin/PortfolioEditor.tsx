'use client';

import { useRef, useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import TagInput from '@/components/admin/TagInput';
import ConfirmModal from '@/components/admin/ConfirmModal';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:4000';

const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  { image: 'images/portfolio-dashboard-1.jpg', tag: 'Web Application', title: 'ShopEthio', client: 'Client: Ethiopian Retail Association', desc: 'A full-featured e-commerce platform built for the Ethiopian market.', tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'], resources: [] },
  { image: 'images/portfolio-mobile-1.jpg', tag: 'Mobile Application', title: 'GoMove', client: 'Client: GoMove Transport PLC', desc: 'A ride-hailing and logistics application with real-time GPS tracking.', tech: ['Flutter', 'Firebase', 'Google Maps', 'Stripe', 'Node.js', 'MongoDB'], resources: [] },
  { image: 'images/portfolio-ai-1.jpg', tag: 'AI Solution', title: 'SmartAssist', client: 'Client: EthioTech Corp', desc: 'An AI-powered customer service chatbot that handles inquiries in multiple languages.', tech: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'Docker', 'Azure'], resources: [] },
];

interface ResourceLink { label: string; url: string; icon: string; }
interface PortfolioItem { image: string; tag: string; title: string; client: string; desc: string; tech: string[]; resources: ResourceLink[]; }

const PRESET_TAGS = ['Web Application', 'Mobile Application', 'AI Solution', 'Dashboard', 'E-commerce', 'API', 'Platform', 'Design System'];

const PRESET_RESOURCES: ResourceLink[] = [
  { label: 'GitHub', url: '', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>` },
  { label: 'Figma', url: '', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="2" width="7" height="7" rx="1.5"/><rect x="13" y="2" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="11" width="7" height="7" rx="1.5"/><rect x="13" y="11" width="7" height="7" rx="1.5"/><rect x="4" y="20" width="7" height="7" rx="1.5"/></svg>` },
  { label: 'App Store', url: '', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.665 16.811a10.316 10.316 0 01-1.022 1.749c-.537.767-.978 1.296-1.316 1.587-.526.483-1.09.73-1.697.74-.434 0-.957-.123-1.57-.37-.613-.247-1.176-.37-1.69-.37-.544 0-1.126.123-1.745.37-.62.247-1.117.368-1.495.368-.578.01-1.155-.246-1.727-.768-.37-.32-.828-.868-1.375-1.643-.588-.832-1.07-1.798-1.448-2.896-.406-1.18-.61-2.323-.61-3.43 0-1.268.274-2.36.822-3.276.433-.722 1.01-1.293 1.73-1.712.72-.42 1.498-.632 2.335-.64.458 0 1.06.142 1.803.42.742.277 1.22.418 1.433.418.131 0 .577-.178 1.335-.534.715-.33 1.35-.467 1.9-.413 1.403.111 2.458.667 3.162 1.667-1.257.76-1.878 1.826-1.864 3.192.013 1.064.397 1.947 1.15 2.653.342.34.724.604 1.147.792-.092.267-.19.523-.295.768zM15.07 2.534c0 .834-.305 1.613-.913 2.334-.733.86-1.62 1.357-2.582 1.278-.012-.1-.019-.204-.019-.31 0-.803.349-1.662.97-2.364.31-.354.704-.65 1.182-.887.477-.236.928-.36 1.353-.37.009.105.013.21.013.32z"/></svg>` },
  { label: 'Play Store', url: '', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.79 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>` },
  { label: 'Live Demo', url: '', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>` },
  { label: 'API Docs', url: '', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><path d="M12 6v6"/><path d="M9 9h6"/></svg>` },
  { label: 'Website', url: '', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>` },
];

export default function PortfolioEditor({ onPortfolioClick }: { onPortfolioClick?: (index: number) => void }) {
  const { editMode, editedContent, publishedContent, updateContent } = useEditMode();
  const fileInputs = useRef<Record<number, HTMLInputElement | null>>({});
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const raw = editedContent['portfolio.items'] ?? publishedContent['portfolio.items'];
  const items: PortfolioItem[] = raw
    ? JSON.parse(raw).map((p: any) => ({ ...p, resources: p.resources ?? [] }))
    : DEFAULT_PORTFOLIO;

  const save = (next: PortfolioItem[]) => updateContent('portfolio.items', JSON.stringify(next));

  const update = (i: number, patch: Partial<PortfolioItem>) => {
    save(items.map((it, idx) => idx === i ? { ...it, ...patch } : it));
  };

  const remove = (i: number) => save(items.filter((_, idx) => idx !== i));

  const add = () => save([...items, { image: '', tag: '', title: '', client: '', desc: '', tech: [], resources: [] }]);

  const toggleResource = (i: number, preset: ResourceLink) => {
    const exists = items[i].resources.find(r => r.label === preset.label);
    if (exists) {
      update(i, { resources: items[i].resources.filter(r => r.label !== preset.label) });
    } else {
      update(i, { resources: [...items[i].resources, { label: preset.label, url: '', icon: preset.icon }] });
    }
  };

  const updateResourceUrl = (i: number, label: string, url: string) => {
    update(i, { resources: items[i].resources.map(r => r.label === label ? { ...r, url } : r) });
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
      <div className="portfolio-grid">
        {items.map((p, i) => (
          <div key={i} className="portfolio-card fade-up" onClick={() => onPortfolioClick?.(i)}>
            <div className="portfolio-thumb">{p.image ? <img src={p.image.startsWith('images/') ? `/${p.image}` : `${BACKEND_URL}/uploads/${encodeURIComponent(p.image)}`} alt={p.title} /> : <div className="pe-no-image">No image</div>}</div>
            <div className="portfolio-info">
              <span className="portfolio-category">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="portfolio-tags">{p.tech.map((t, j) => <span key={`${p.title}-tech-${j}`} className="tag">{t}</span>)}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="portfolio-grid" style={{ marginTop: 20 }}>
      {items.map((p, i) => (
        <div key={i} className="pe-card">
          <button className="pe-delete" onClick={() => setConfirmDelete(i)} title="Remove project">&times;</button>
          <div className="pe-image" onClick={() => fileInputs.current[i]?.click()} style={{ cursor: 'pointer' }}>
            {p.image ? <img src={p.image.startsWith('images/') ? `/${p.image}` : `${BACKEND_URL}/uploads/${encodeURIComponent(p.image)}`} alt={p.title} /> : <div className="pe-no-image">+ Image</div>}
            <input ref={el => { fileInputs.current[i] = el; }} type="file" accept="image/*" hidden onChange={e => handleFile(i, e)} />
          </div>
          <div className="pe-field">
            <label>Tag</label>
            <input value={p.tag} onChange={e => update(i, { tag: e.target.value })} placeholder="Web Application" />
            <div className="tag-presets">
              {PRESET_TAGS.map(t => (
                <button key={t} className={`tag-preset${p.tag === t ? ' active' : ''}`} onClick={() => update(i, { tag: t })}>{t}</button>
              ))}
            </div>
          </div>
          <div className="pe-field"><label>Title</label><input value={p.title} onChange={e => update(i, { title: e.target.value })} placeholder="Project name" /></div>
          <div className="pe-field">
            <label>Client</label>
            <div className="client-input">
              <span className="client-prefix">Client:</span>
              <input value={p.client.replace(/^Client:\s*/i, '')} onChange={e => update(i, { client: 'Client: ' + e.target.value })} placeholder="Company name" />
            </div>
          </div>
          <div className="pe-field"><label>Description</label><textarea value={p.desc} onChange={e => update(i, { desc: e.target.value })} rows={2} /></div>
          <div className="pe-field"><label>Tech</label><TagInput value={p.tech} onChange={v => update(i, { tech: v })} placeholder="Type a tech and press space" /></div>
          <div className="pe-field">
            <label>Links</label>
            <div className="pe-resources-presets">
              {PRESET_RESOURCES.map(r => {
                const added = p.resources.some(ex => ex.label === r.label);
                return (
                  <button
                    key={r.label}
                    className={`pe-resource-btn${added ? ' added' : ''}`}
                    onClick={() => toggleResource(i, r)}
                    title={added ? `Remove ${r.label}` : `Add ${r.label}`}
                    dangerouslySetInnerHTML={{ __html: r.icon }}
                  />
                );
              })}
            </div>
            {p.resources.length > 0 && (
              <div className="pe-resources-list">
                {p.resources.map(r => (
                  <div key={r.label} className="pe-resource-row">
                    <span className="pe-resource-icon" dangerouslySetInnerHTML={{ __html: r.icon }} />
                    <span className="pe-resource-label">{r.label}</span>
                    <input value={r.url} onChange={e => updateResourceUrl(i, r.label, e.target.value)} placeholder="https://..." />
                    <button className="pe-resource-del" onClick={() => toggleResource(i, r)} title="Remove">&times;</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="pe-card pe-add-card" onClick={add} title="Add project"><span className="pe-plus">+</span><span className="pe-add-label">Add Project</span></div>
      <ConfirmModal open={confirmDelete !== null} title="Delete Portfolio Item" message="Are you sure you want to delete this portfolio item? This action cannot be undone." onConfirm={() => { if (confirmDelete !== null) remove(confirmDelete); setConfirmDelete(null); }} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
}
