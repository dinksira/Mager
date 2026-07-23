'use client';

import { use, useMemo } from 'react';
import Link from 'next/link';
import { blogData } from '@/data/blog';
import { useContent } from '@/contexts/ContentContext';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { overrides } = useContent();

  const posts = useMemo(() => {
    try {
      const raw = overrides['blog.posts'];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.map((b: any, i: number) => ({ ...blogData[i], ...b }));
      }
    } catch {}
    return blogData;
  }, [overrides]);

  const post = posts.find(
    (p: any) => p.title.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!post) {
    return (
      <section className="section" style={{ paddingTop: 'calc(64px + 80px)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Post not found</h2>
          <Link href="/blog" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>
            &larr; Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ paddingTop: 'calc(64px + 80px)' }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <Link href="/blog" style={{ color: '#FE6811', fontSize: '.85rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Blog
        </Link>

        {post.image && (
          <img
            src={post.image?.startsWith('images/') ? `/${post.image}` : post.image}
            alt={post.title}
            style={{ width: '100%', borderRadius: 16, marginBottom: 32, maxHeight: 400, objectFit: 'cover' }}
          />
        )}

        <div className="blog-meta" style={{ fontSize: '.78rem', color: 'var(--text-faint)', marginBottom: 12, display: 'flex', gap: 16 }}>
          <span>{post.date}</span>
        </div>

        <h1 style={{ fontSize: '2.25rem', marginBottom: 24, lineHeight: 1.3 }}>{post.title}</h1>

        <div className="blog-author" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
          <img
            src={post.avatar?.startsWith('images/') ? `/${post.avatar}` : post.avatar}
            alt={post.author}
            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontSize: '.85rem', fontWeight: 600 }}>{post.author}</div>
            <div style={{ fontSize: '.75rem', color: 'var(--text-faint)' }}>{post.authorRole}</div>
          </div>
        </div>

        <div
          className="blog-body-text"
          style={{ fontSize: '.95rem', color: 'var(--text-subtle)', lineHeight: 1.9 }}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        <div style={{ display: 'flex', gap: 16, marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <Link href="/blog" className="btn btn-hero-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
            All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
