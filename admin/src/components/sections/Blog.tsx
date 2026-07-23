'use client';
import { useTranslation } from 'react-i18next';
import Editable from '@/components/admin/Editable';
import BlogEditor from '@/components/admin/BlogEditor';

export default function Blog({ onBlogClick }: { onBlogClick: (index: number) => void }) {
  const { t } = useTranslation();

  return (
    <section className="section section--alt" id="blog">
      <div className="container">
        <div className="section-tag" data-reveal="up"><Editable path="blog.sectionTitle">{t('blog.sectionTitle')}</Editable></div>
        <h2 className="section-title" data-reveal="up"><Editable path="blog.sectionSubtitle">{t('blog.sectionSubtitle')}</Editable></h2>
        <BlogEditor onBlogClick={onBlogClick} />
      </div>
    </section>
  );
}
