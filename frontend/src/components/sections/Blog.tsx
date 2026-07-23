'use client';
import { useTranslation } from 'react-i18next';
import { blogData } from '@/data/blog';
import { useContent } from '@/contexts/ContentContext';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

function imgUrl(src: string) {
  if (!src) return undefined;
  if (src.startsWith('images/')) return `/${src}`;
  return `${BACKEND_URL}/uploads/${encodeURIComponent(src)}`;
}

export default function Blog({ onBlogClick }: { onBlogClick: (index: number) => void }) {
  const { t } = useTranslation();
  const { overrides } = useContent();

  let items;
  try {
    items = overrides['blog.posts']
      ? JSON.parse(overrides['blog.posts'])
      : blogData.map((b, i) => ({ image: b.image, date: t(`blog.posts.${i}.date`), title: t(`blog.posts.${i}.title`) }));
  } catch { items = blogData.map((b, i) => ({ image: b.image, date: t(`blog.posts.${i}.date`), title: t(`blog.posts.${i}.title`) })); }

  const val = (key: string) => overrides[key] || t(key);

  return (
    <section className="section section--alt" id="blog">
      <div className="container">
        <div className="section-tag" data-reveal="up">{val('blog.sectionTitle')}</div>
        <h2 className="section-title" data-reveal="up">{val('blog.sectionSubtitle')}</h2>
        <div className="blog-grid" data-reveal="up">
          {items.map((b: {image:string,date:string,title:string}, i: number) => (
            <div key={i} className="blog-card" onClick={() => onBlogClick(i)}>
              <div className="blog-thumb"><img src={imgUrl(b.image)} alt={b.title} /></div>
              <div className="blog-body">
                <div className="blog-meta"><span>{b.date}</span></div>
                <h3>{b.title}</h3>
                <span className="blog-read">{t('blog.read')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
