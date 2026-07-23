'use client';

import Hero from '@/components/sections/Hero';
import Partners from '@/components/sections/Partners';
import Testimonials from '@/components/sections/Testimonials';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useContent } from '@/contexts/ContentContext';

export default function Home() {
  const { t } = useTranslation();
  const { overrides } = useContent();
  const val = (key: string) => overrides[key] || t(key);

  return (
    <>
      <Hero />

      <section className="section section--alt" id="home-about">
        <div className="container" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <div className="section-tag" data-reveal="up">{val('about.sectionTitle')}</div>
          <h2 className="section-title" data-reveal="up" style={{ fontSize: '2rem', marginBottom: 24 }}>
            {val('about.heading')}
          </h2>
          <p data-reveal="up" style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.8 }}>
            {val('about.paragraph1')}
          </p>
          <Link href="/about" className="btn btn-ghost" data-reveal="up">{val('common.learnMore')} →</Link>
        </div>
      </section>

      <section className="section" id="home-services" style={{ padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-tag" data-reveal="up">{val('services.sectionTitle')}</div>
          <h2 className="section-title" data-reveal="up">{val('services.sectionSubtitle')}</h2>
          <div className="home-services-grid" data-reveal="up">
            {[0, 1, 2].map(i => (
              <div key={i} className="service-card">
                <h3>{val(`services.items.${i}.title`)}</h3>
                <p>{val(`services.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
          <Link href="/services" className="btn btn-ghost" data-reveal="up" style={{ marginTop: 40 }}>
            {val('common.viewAll')} →
          </Link>
        </div>
      </section>

      <Partners />
      <Testimonials />

      <section className="section section--alt" id="home-cta">
        <div className="container" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <div className="section-tag" data-reveal="up">{val('common.ctaTag')}</div>
          <h2 className="section-title" data-reveal="up" style={{ fontSize: '2rem', marginBottom: 24 }}>
            {val('common.ctaTitle')}
          </h2>
          <p data-reveal="up" style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.8 }}>
            {val('common.ctaText')}
          </p>
          <Link href="/contact" className="btn btn-primary" data-reveal="up">
            {val('common.ctaButton')} →
          </Link>
        </div>
      </section>
    </>
  );
}
