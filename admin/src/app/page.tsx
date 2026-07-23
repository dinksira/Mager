'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import AdminShell from '@/components/layout/AdminShell';
import Hero from '@/components/sections/Hero';
import Partners from '@/components/sections/Partners';
import Testimonials from '@/components/sections/Testimonials';
import Editable from '@/components/admin/Editable';

function DashboardHomeInner() {
  const { t } = useTranslation();

  return (
    <>
      <Hero />

      <section className="section section--alt" id="home-about">
        <div className="container" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <div className="section-tag" data-reveal="up"><Editable path="about.sectionTitle">{t('about.sectionTitle')}</Editable></div>
          <h2 className="section-title" data-reveal="up" style={{ fontSize: '2rem', marginBottom: 24 }}>
            <Editable path="about.heading">{t('about.heading')}</Editable>
          </h2>
          <div data-reveal="up" style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.8 }}>
            <Editable path="about.paragraph1" type="textarea">{t('about.paragraph1')}</Editable>
          </div>
          <Link href="/about" className="btn btn-ghost" data-reveal="up"><Editable path="common.learnMore">{t('common.learnMore')}</Editable></Link>
        </div>
      </section>

      <section className="section" id="home-services" style={{ padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-tag" data-reveal="up"><Editable path="services.sectionTitle">{t('services.sectionTitle')}</Editable></div>
          <h2 className="section-title" data-reveal="up"><Editable path="services.sectionSubtitle">{t('services.sectionSubtitle')}</Editable></h2>
          <div className="home-services-grid" data-reveal="up">
            {[0, 1, 2].map(i => (
              <div key={i} className="service-card">
                <h3><Editable path={`services.items.${i}.title`}>{t(`services.items.${i}.title`)}</Editable></h3>
                <div><Editable path={`services.items.${i}.desc`} type="textarea">{t(`services.items.${i}.desc`)}</Editable></div>
              </div>
            ))}
          </div>
          <Link href="/services" className="btn btn-ghost" data-reveal="up" style={{ marginTop: 40 }}>
            <Editable path="common.viewAll">{t('common.viewAll')}</Editable>
          </Link>
        </div>
      </section>

      <Partners />
      <Testimonials />

      <section className="section section--alt" id="home-cta">
        <div className="container" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <div className="section-tag" data-reveal="up"><Editable path="common.ctaTag">{t('common.ctaTag')}</Editable></div>
          <h2 className="section-title" data-reveal="up" style={{ fontSize: '2rem', marginBottom: 24 }}>
            <Editable path="common.ctaTitle">{t('common.ctaTitle')}</Editable>
          </h2>
          <div data-reveal="up" style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.8 }}>
            <Editable path="common.ctaText" type="textarea">{t('common.ctaText')}</Editable>
          </div>
          <Link href="/contact" className="btn btn-primary" data-reveal="up">
            <Editable path="common.ctaButton">{t('common.ctaButton')}</Editable>
          </Link>
        </div>
      </section>
    </>
  );
}

export default function AdminHomePage() {
  return (
    <AdminShell>
      <DashboardHomeInner />
    </AdminShell>
  );
}
