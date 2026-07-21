'use client';
import { useTranslation } from 'react-i18next';
import { blogData } from '@/data/blog';
import BlogCard from '@/components/cards/BlogCard';

export default function Blog({ onBlogClick }: { onBlogClick: (index: number) => void }) {
  const { t } = useTranslation();

  return (
    <section className="section" id="blog" style={{ paddingTop: 0 }}>
      <div className="container">
        <h2 className="section-title fade-up">{t('blog.sectionTitle')}</h2>
        <p className="section-subtitle fade-up">{t('blog.sectionSubtitle')}</p>
        <div className="blog-grid">
          {blogData.map((b, i) => (
            <BlogCard
              key={i}
              image={b.image}
              date={t(`blog.posts.${i}.date`)}
              readTime={t(`blog.posts.${i}.readTime`)}
              title={t(`blog.posts.${i}.title`)}
              desc={t(`blog.posts.${i}.title`)}
              onClick={() => onBlogClick(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
