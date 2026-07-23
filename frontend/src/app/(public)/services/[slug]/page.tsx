'use client';

import { use, useMemo } from 'react';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { useContent } from '@/contexts/ContentContext';
import { useTranslation } from 'react-i18next';


export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t } = useTranslation();
  const { overrides } = useContent();

  const items = useMemo(() => {
    try {
      const raw = overrides['services.items'];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((s: any, i: number) => ({
            ...servicesData[i],
            ...s,
            features: s.features ?? [],
            tag: s.tag ?? '',
          }));
        }
      }
    } catch {}
    return servicesData;
  }, [overrides]);

  const index = servicesData.findIndex(
    s => s.title.toLowerCase().replace(/\s+/g, '-') === slug
  );
  const service = items[index];

  if (!service) {
    return (
      <section className="section" style={{ paddingTop: 'calc(64px + 80px)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Service not found</h2>
          <Link href="/services" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>
            &larr; Back to Services
          </Link>
        </div>
      </section>
    );
  }

  const iconHtml = service.icon || '';

  return (
    <section className="section" style={{ paddingTop: 'calc(64px + 80px)' }}>
      <div className="container">
        <Link href="/services" style={{ color: '#FE6811', fontSize: '.85rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Services
        </Link>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <span
              className="icon-s"
              style={{ width: 48, height: 48, marginBottom: 20 }}
              dangerouslySetInnerHTML={{ __html: iconHtml }}
            />
            <span style={{ fontSize: '.75rem', color: '#FE6811', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>
              {service.tag}
            </span>
            <h1 style={{ fontSize: '2.5rem', margin: '12px 0 20px' }}>{service.title}</h1>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{service.desc}</p>
          </div>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 40 }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 20 }}>Key Features</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {service.features?.map((f: string, i: number) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '.9rem', color: 'var(--text-muted)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FE6811" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
