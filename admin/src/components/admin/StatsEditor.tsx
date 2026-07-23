'use client';

import { useEditMode } from '@/contexts/EditModeContext';

const DEFAULT_STATS = [
  { value: '50+', label: 'Projects' },
  { value: '30+', label: 'Clients' },
  { value: '5+', label: 'Years' },
];

interface StatItem {
  value: string;
  label: string;
}

export default function StatsEditor() {
  const { editMode, editedContent, publishedContent, updateContent } = useEditMode();

  const raw = editedContent['about.stats'] ?? publishedContent['about.stats'];
  const stats: StatItem[] = raw ? JSON.parse(raw) : DEFAULT_STATS;

  const save = (updated: StatItem[]) => {
    updateContent('about.stats', JSON.stringify(updated));
  };

  const handleValueChange = (i: number, val: string) => {
    const next = stats.map((s, idx) => idx === i ? { ...s, value: val } : s);
    save(next);
  };

  const handleLabelChange = (i: number, val: string) => {
    const next = stats.map((s, idx) => idx === i ? { ...s, label: val } : s);
    save(next);
  };

  const handleDelete = (i: number) => {
    save(stats.filter((_, idx) => idx !== i));
  };

  const handleAdd = () => {
    save([...stats, { value: '', label: '' }]);
  };

  if (!editMode) {
    return (
      <div className="about-stats">
        {stats.map((s, i) => (
          <div key={i}>
            <div className="stat-number">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="about-stats-editor">
      <div className="about-stats">
        {stats.map((s, i) => (
          <div key={i} className="stat-edit-item">
            <input
              className="stat-edit-input stat-edit-value"
              value={s.value}
              onChange={e => handleValueChange(i, e.target.value)}
              placeholder="Value"
            />
            <input
              className="stat-edit-input stat-edit-label"
              value={s.label}
              onChange={e => handleLabelChange(i, e.target.value)}
              placeholder="Label"
            />
            <button className="stat-edit-delete" onClick={() => handleDelete(i)} title="Remove stat">&times;</button>
          </div>
        ))}
      </div>
      <button className="stat-edit-add" onClick={handleAdd}>+ Add Stat</button>
    </div>
  );
}
