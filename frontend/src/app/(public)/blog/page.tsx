'use client';

import { useState } from 'react';
import { blogData } from '@/data/blog';
import { useContent } from '@/contexts/ContentContext';
import { useTranslation } from 'react-i18next';
import BlogModal from '@/components/modals/BlogModal';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

function imgUrl(src: string) {
  if (!src) return undefined;
  if (src.startsWith('images/') || src.startsWith('/')) return `/${src}`;
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return `${BACKEND_URL}/uploads/${encodeURIComponent(src)}`;
}

export default function BlogPage() {
  const { t } = useTranslation();
  const { overrides } = useContent();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const posts = (() => {
    try {
      const raw = overrides['blog.posts'];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.map((b: any, i: number) => ({ ...blogData[i], ...b }));
      }
    } catch {}
    return blogData;
  })();

  const val = (key: string) => overrides[key] || t(key);

  return (
    <>
      <section className="section section--alt" style={{ paddingTop: 'calc(56px + 80px)' }}>
        <div className="container">
          <div className="section-tag" data-reveal="up">{val('nav.blog')}</div>
          <h2 className="section-title" data-reveal="up">{t('blog.sectionSubtitle')}</h2>
          <div className="blog-grid" data-reveal="up">
            {posts.map((post: any, i: number) => (
              <div key={i} className="blog-card" onClick={() => { setModalIndex(i); setModalOpen(true); }}>
                <div className="blog-thumb">
                  <img src={imgUrl(post.image)} alt={post.title} />
                </div>
                <div className="blog-body">
                  <div className="blog-meta"><span>{post.date}</span></div>
                  <h3>{post.title}</h3>
                  <p>{post.body?.replace(/<[^>]+>/g, '').slice(0, 120)}...</p>
                  <span className="blog-read">{t('blog.read')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BlogModal isOpen={modalOpen} onClose={() => setModalOpen(false)} data={posts[modalIndex]} />
    </>
  );
}
