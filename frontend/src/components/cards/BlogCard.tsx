'use client';
import { useTranslation } from 'react-i18next';

export default function BlogCard({ image, date, readTime, title, desc, onClick }: { image: string; date: string; readTime: string; title: string; desc: string; onClick: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="blog-card fade-up" onClick={onClick}>
      <div className="blog-thumb"><img src={image} alt={title} /></div>
      <div className="blog-body">
        <div className="blog-meta"><span>{date}</span><span>{readTime}</span></div>
        <h3>{title}</h3>
        <p>{desc}</p>
        <span className="blog-read">{t('blog.read')}</span>
      </div>
    </div>
  );
}
