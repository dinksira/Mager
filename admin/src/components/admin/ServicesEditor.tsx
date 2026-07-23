'use client';

import { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { SERVICE_ICONS, SERVICE_ICON_NAMES, SERVICE_ICON_OPTIONS } from '@/data/serviceIcons';
import ConfirmModal from '@/components/admin/ConfirmModal';

const DEFAULT_SERVICES = [
  { icon: 'code', tag: 'Engineering', title: 'Software Development', desc: 'We build custom web and desktop applications using modern frameworks like React, Node.js, and Next.js. Our team follows industry best practices — clean architecture, CI/CD, automated testing, and performance optimization — to deliver scalable, maintainable software.', features: ['Custom web applications & dashboards', 'Desktop software & internal tools', 'API development & third-party integrations', 'Code reviews, testing & CI/CD setup'] },
  { icon: 'mobile', tag: 'Mobile', title: 'Mobile App Development', desc: 'Native and cross-platform mobile applications crafted for iOS and Android. We use Flutter, React Native, and native SDKs to deliver smooth, performant apps that users love — from MVPs to enterprise-grade solutions.', features: ['Cross-platform apps (Flutter, React Native)', 'Native iOS & Android development', 'App store deployment & management', 'Push notifications & real-time sync'] },
  { icon: 'cloud', tag: 'Infrastructure', title: 'Cloud Solutions', desc: 'Cloud architecture design, migration, and managed services across AWS, Azure, and GCP. We help you modernize infrastructure, reduce costs, and scale with confidence — from lift-and-shift to cloud-native builds.', features: ['Cloud architecture & migration planning', 'Kubernetes & container orchestration', 'Serverless & event-driven systems', 'Monitoring, security & cost optimization'] },
  { icon: 'brain', tag: 'Intelligence', title: 'AI & Machine Learning', desc: 'Intelligent automation, predictive analytics, and custom ML model development. We turn data into decisions — from chatbots and recommendation engines to computer vision and NLP solutions.', features: ['Custom ML model development & training', 'Natural language processing & chatbots', 'Computer vision & document intelligence', 'Predictive analytics & data pipelines'] },
  { icon: 'palette', tag: 'Design', title: 'UI/UX Design', desc: 'User-centered design that balances aesthetics, usability, and business goals. We research, prototype, and test to create intuitive interfaces that delight users and drive engagement.', features: ['User research & usability testing', 'Wireframing & interactive prototyping', 'Visual design & design systems', 'Accessibility & responsive design'] },
  { icon: 'chart', tag: 'Advisory', title: 'IT Consulting', desc: 'Strategic technology advisory to help you make the right technical decisions. We assess your current stack, identify opportunities, and create a roadmap — whether you are scaling up, modernizing, or starting from scratch.', features: ['Technology stack assessment & roadmap', 'Digital transformation strategy', 'Architecture review & optimization', 'Vendor evaluation & procurement support'] },
];

interface ServiceItem { icon: string; tag: string; title: string; desc: string; features: string[]; }

export default function ServicesEditor({ onServiceClick }: { onServiceClick?: (index: number) => void }) {
  const { editMode, editedContent, publishedContent, updateContent } = useEditMode();
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const raw = editedContent['services.items'] ?? publishedContent['services.items'];
  const items: ServiceItem[] = raw ? JSON.parse(raw) : DEFAULT_SERVICES;

  const save = (next: ServiceItem[]) => {
    updateContent('services.items', JSON.stringify(next));
  };

  const update = (i: number, patch: Partial<ServiceItem>) => {
    save(items.map((it, idx) => idx === i ? { ...it, ...patch } : it));
  };

  const remove = (i: number) => {
    save(items.filter((_, idx) => idx !== i));
  };

  const add = () => {
    save([...items, { icon: 'code', tag: '', title: '', desc: '', features: [] }]);
  };

  const updateFeature = (i: number, fi: number, val: string) => {
    const next = [...items[i].features];
    next[fi] = val;
    update(i, { features: next });
  };

  const removeFeature = (i: number, fi: number) => {
    update(i, { features: items[i].features.filter((_, idx) => idx !== fi) });
  };

  const addFeature = (i: number) => {
    update(i, { features: [...items[i].features, ''] });
  };

  if (!editMode) {
    return (
      <div className="services-grid">
        {items.map((s, i) => (
          <div key={i} className="service-card fade-up" onClick={() => onServiceClick?.(i)}>
            <span className="icon-s" dangerouslySetInnerHTML={{ __html: SERVICE_ICONS[s.icon] || SERVICE_ICONS.code }} />
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            {(s.features ?? []).length > 0 && (
              <ul className="card-features">
                {(s.features ?? []).map((f, fi) => (
                  <li key={fi}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="services-grid" style={{ marginTop: 20 }}>
      {items.map((s, i) => (
        <div key={i} className="se-card">
          <button className="se-delete" onClick={() => setConfirmDelete(i)} title="Remove service">&times;</button>
          <div className="se-icon-preview" dangerouslySetInnerHTML={{ __html: SERVICE_ICONS[s.icon] || SERVICE_ICONS.code }} />
          <div className="se-field">
            <label>Icon</label>
            <div className="ve-icon-grid">
              {SERVICE_ICON_OPTIONS.map(o => (
                <button
                  key={o.value}
                  className={`ve-icon-btn${s.icon === o.value ? ' active' : ''}`}
                  onClick={() => update(i, { icon: o.value })}
                  title={o.label}
                  dangerouslySetInnerHTML={{ __html: SERVICE_ICONS[o.value] }}
                />
              ))}
            </div>
          </div>
          <div className="se-field">
            <label>Tag</label>
            <input value={s.tag} onChange={e => update(i, { tag: e.target.value })} placeholder="e.g. Engineering" />
          </div>
          <div className="se-field">
            <label>Title</label>
            <input value={s.title} onChange={e => update(i, { title: e.target.value })} placeholder="Service title" />
          </div>
          <div className="se-field">
            <label>Description</label>
            <textarea value={s.desc} onChange={e => update(i, { desc: e.target.value })} placeholder="Service description" rows={3} />
          </div>
          <div className="se-field">
            <label>Features</label>
            <div className="se-features">
              {s.features.map((f, fi) => (
                <div key={fi} className="se-feature-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <input value={f} onChange={e => updateFeature(i, fi, e.target.value)} placeholder="Enter a feature" />
                  <button className="se-feature-del" onClick={() => removeFeature(i, fi)} title="Remove feature">&times;</button>
                </div>
              ))}
            </div>
            <button className="se-feature-add" onClick={() => addFeature(i)}>+ Add Feature</button>
          </div>
        </div>
      ))}
      <div className="se-card se-add-card" onClick={add} title="Add new service">
        <span className="se-plus">+</span>
        <span className="se-add-label">Add Service</span>
      </div>
      <ConfirmModal open={confirmDelete !== null} title="Delete Service" message="Are you sure you want to delete this service? This action cannot be undone." onConfirm={() => { if (confirmDelete !== null) remove(confirmDelete); setConfirmDelete(null); }} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
}
