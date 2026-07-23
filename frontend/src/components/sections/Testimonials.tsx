'use client';

import { useTranslation } from 'react-i18next';
import { useContent } from '@/contexts/ContentContext';
import { testimonialsData } from '@/data/testimonials';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

function imgUrl(src: string) {
  if (!src) return undefined;
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  if (src.startsWith('images/') || src.startsWith('/')) return `/${src}`;
  return `${BACKEND_URL}/uploads/${encodeURIComponent(src)}`;
}

export default function Testimonials() {
  const { t } = useTranslation();
  const { overrides } = useContent();

  let items;
  try {
    items = overrides['testimonials.items']
      ? JSON.parse(overrides['testimonials.items'])
      : testimonialsData;
  } catch { items = testimonialsData; }

  const val = (key: string) => overrides[key] || t(key);

  if (!items || items.length === 0) return null;

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section-tag" data-reveal="up">{val('testimonials.sectionTitle')}</div>
        <h2 className="section-title" data-reveal="up">{val('testimonials.sectionSubtitle')}</h2>
        <div className="testimonials-grid" data-reveal="up">
          {items.map((item: { quote: string; name: string; role: string; company: string; avatar: string }, i: number) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-q-svg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h4v4H3zM13 12h4v4h-4z"/>
                  <path d="M7 12c0 3 1.5 4.5 4.5 6"/>
                  <path d="M17 12c0 3-1.5 4.5-4.5 6"/>
                </svg>
              </div>
              <p className="testimonial-q-text">{item.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <img src={imgUrl(item.avatar)} alt={item.name} />
                </div>
                <div className="testimonial-author-info">
                  <h4>{item.name}</h4>
                  <span>{item.role}, {item.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
