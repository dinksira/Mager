'use client';

import { use, useMemo } from 'react';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';
import { ongoingData } from '@/data/ongoing';
import { useContent } from '@/contexts/ContentContext';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

function imgUrl(src: string) {
  if (src.startsWith('images/') || src.startsWith('/')) return `/${src}`;
  return `${BACKEND_URL}/uploads/${encodeURIComponent(src)}`;
}

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { overrides } = useContent();

  const pfItems = useMemo(() => {
    try {
      const raw = overrides['portfolio.items'];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.map((p: any, i: number) => ({ ...portfolioData[i], ...p }));
      }
    } catch {}
    return portfolioData;
  }, [overrides]);

  const project = pfItems.find(
    (p: any) => p.title.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!project) {
    return (
      <section className="section" style={{ paddingTop: 'calc(64px + 80px)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Project not found</h2>
          <Link href="/projects" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>
            &larr; Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ paddingTop: 'calc(64px + 80px)' }}>
      <div className="container">
        <Link href="/projects" style={{ color: '#FE6811', fontSize: '.85rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Projects
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            {project.images?.map((img: any, i: number) => (
              <img
                key={i}
                src={imgUrl(img.src)}
                alt={img.caption}
                style={{ width: '100%', borderRadius: 16, marginBottom: 12 }}
              />
            ))}
          </div>
          <div>
            <span style={{ fontSize: '.75rem', color: '#FE6811', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>{project.tag}</span>
            <h1 style={{ fontSize: '2rem', margin: '8px 0 4px' }}>{project.title}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '.85rem', marginBottom: 20 }}>{project.client}</p>
            <p style={{ fontSize: '.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 24 }}>{project.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {project.tech?.map((t: string, i: number) => (
                <span key={i} style={{ fontSize: '.75rem', padding: '6px 14px', border: '1px solid var(--border)', borderRadius: 50, color: 'var(--text-muted)' }}>{t}</span>
              ))}
            </div>
            {project.resources?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {project.resources.map((r: any, i: number) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', border: '1px solid var(--border)', borderRadius: 50, fontSize: '.8rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'all .2s' }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = '#FE6811'; (e.target as HTMLElement).style.color = '#FE6811'; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'var(--border)'; (e.target as HTMLElement).style.color = 'var(--text-muted)'; }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: r.icon }} style={{ width: 16, height: 16, display: 'flex' }} />
                    {r.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
