'use client';

import { useRef, useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import ConfirmModal from '@/components/admin/ConfirmModal';
import RichTextEditor from '@/components/admin/RichTextEditor';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:4000';

const DEFAULT_BLOG = [
  { image: 'images/blog-cms.jpg', date: 'Jul 15, 2026', title: 'Why Headless CMS is the Future of Web Development', author: 'Abebe Kebede', authorRole: 'CEO & Founder', avatar: 'images/team-1.jpg', body: '' },
  { image: 'images/blog-api.jpg', date: 'Jul 8, 2026', title: 'Building Scalable APIs with Node.js and Express', author: 'Sara Mulugeta', authorRole: 'CTO', avatar: 'images/team-2.jpg', body: '' },
  { image: 'images/blog-fintech.jpg', date: 'Jun 28, 2026', title: 'AI in Fintech: Opportunities and Challenges', author: 'Dawit Tadesse', authorRole: 'Lead Designer', avatar: 'images/team-3.jpg', body: '' },
];

interface BlogItem { image: string; date: string; title: string; author: string; authorRole: string; avatar: string; body: string; }

function imgUrl(src: string) {
  if (!src) return undefined;
  if (src.startsWith('images/')) return `/${src}`;
  return `${BACKEND_URL}/uploads/${encodeURIComponent(src)}`;
}

export default function BlogEditor({ onBlogClick }: { onBlogClick?: (index: number) => void }) {
  const { editMode, editedContent, publishedContent, updateContent } = useEditMode();
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const imgInputs = useRef<Record<number, HTMLInputElement | null>>({});
  const avInputs = useRef<Record<number, HTMLInputElement | null>>({});

  const raw = editedContent['blog.posts'] ?? publishedContent['blog.posts'];
  const items: BlogItem[] = raw ? JSON.parse(raw) : DEFAULT_BLOG;

  const save = (next: BlogItem[]) => updateContent('blog.posts', JSON.stringify(next));
  const update = (i: number, patch: Partial<BlogItem>) => save(items.map((it, idx) => idx === i ? { ...it, ...patch } : it));
  const remove = (i: number) => save(items.filter((_, idx) => idx !== i));
  const add = () => save([...items, { image: '', date: '', title: '', author: '', authorRole: '', avatar: '', body: '' }]);

  const handleUpload = async (i: number, field: 'image' | 'avatar', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData(); fd.append('image', file);
    try {
      const r = await fetch(`${BACKEND_URL}/api/content/upload-image`, { method: 'POST', body: fd });
      const d = await r.json();
      if (d.ok) update(i, { [field]: d.filename });
    } catch {}
    const ref = field === 'image' ? imgInputs.current[i] : avInputs.current[i];
    if (ref) ref.value = '';
  };

  if (!editMode) {
    return (
      <div className="blog-grid">
        {items.map((b, i) => (
          <div key={i} className="blog-card fade-up" onClick={() => onBlogClick?.(i)}>
            <div className="blog-thumb"><img src={imgUrl(b.image)} alt={b.title} /></div>
            <div className="blog-body">
              <div className="blog-meta"><span>{b.date}</span></div>
              <h3>{b.title}</h3>
              <p>{b.title}</p>
              <span className="blog-read">Read More</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="blog-grid" style={{ marginTop: 20 }}>
      {items.map((b, i) => (
        <div key={i} className="be-card">
          <button className="be-delete" onClick={() => setConfirmDelete(i)} title="Remove post">&times;</button>
          <div className="be-image" onClick={() => imgInputs.current[i]?.click()} style={{ cursor: 'pointer' }}>
            {b.image ? <img src={imgUrl(b.image)} alt={b.title} /> : <div className="be-no-image">+ Cover</div>}
            <input ref={el => { imgInputs.current[i] = el; }} type="file" accept="image/*" hidden onChange={e => handleUpload(i, 'image', e)} />
          </div>
          <div className="be-field"><label>Date</label><input value={b.date} onChange={e => update(i, { date: e.target.value })} placeholder="Jul 15, 2026" /></div>

          <div className="be-field"><label>Title</label><input value={b.title} onChange={e => update(i, { title: e.target.value })} placeholder="Post title" /></div>
          <div className="be-field"><label>Author</label><input value={b.author} onChange={e => update(i, { author: e.target.value })} placeholder="Author name" /></div>
          <div className="be-field"><label>Author Role</label><input value={b.authorRole} onChange={e => update(i, { authorRole: e.target.value })} placeholder="CEO & Founder" /></div>
          <div className="be-avatar" onClick={() => avInputs.current[i]?.click()} style={{ cursor: 'pointer' }}>
            {b.avatar ? <img src={imgUrl(b.avatar)} alt={b.author} /> : <div className="be-no-image">+ Avatar</div>}
            <span className="be-avatar-label">Author photo</span>
            <input ref={el => { avInputs.current[i] = el; }} type="file" accept="image/*" hidden onChange={e => handleUpload(i, 'avatar', e)} />
          </div>
          <div className="be-field" style={{ gridColumn: '1 / -1' }}>
            <label>Post Content</label>
            <RichTextEditor value={b.body || ''} onChange={v => update(i, { body: v })} placeholder="Write your post content here..." />
          </div>
        </div>
      ))}
      <div className="be-card be-add-card" onClick={add} title="Add post"><span className="be-plus">+</span><span className="be-add-label">Add Post</span></div>
      <ConfirmModal open={confirmDelete !== null} title="Delete Blog Post" message="Are you sure you want to delete this blog post? This action cannot be undone." onConfirm={() => { if (confirmDelete !== null) remove(confirmDelete); setConfirmDelete(null); }} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
}
