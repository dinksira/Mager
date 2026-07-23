'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useContent } from '@/contexts/ContentContext';

export default function Footer() {
  const { t } = useTranslation();
  const { overrides } = useContent();
  const val = (key: string) => overrides[key] || t(key);

  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/magerlogo.svg" alt="Mager" className="logo-img" />
            <span className="logo-text">Mager Software PLC</span>
          </div>
          <ul className="footer-links">
            <li><Link href="/about">{val('nav.about')}</Link></li>
            <li><Link href="/services">{val('nav.services')}</Link></li>
            <li><Link href="/team">{val('nav.team')}</Link></li>
            <li><Link href="/projects">{val('nav.portfolio')}</Link></li>
            <li><Link href="/blog">{val('nav.blog')}</Link></li>
            <li><Link href="/contact">{val('nav.contact')}</Link></li>
          </ul>
          <div className="footer-social">
            <a href="#" aria-label={t('common.linkedin')}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.3A1.8 1.8 0 114.7 6.5a1.8 1.8 0 011.8 1.8zM19 19h-3v-4.3c0-1.7-.7-2.2-1.5-2.2s-1.5.7-1.5 2.2V19h-3v-9h3v1.2a3 3 0 012.5-1.3c1.9 0 3.5 1.3 3.5 4.2z"/></svg></a>
            <a href="#" aria-label={t('common.facebook')}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
            <a href="#" aria-label={t('common.twitter')}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.5a8 8 0 01-2.4.7 4.2 4.2 0 001.8-2.3 8.3 8.3 0 01-2.6 1 4.2 4.2 0 00-7.1 3.8A11.9 11.9 0 013 4.5a4.2 4.2 0 001.3 5.6A4.2 4.2 0 012 9.5v.1a4.2 4.2 0 003.4 4.1 4.2 4.2 0 01-1.9.1 4.2 4.2 0 003.9 2.9A8.4 8.4 0 012 18.5a11.9 11.9 0 006.3 1.8c7.5 0 11.7-6.2 11.7-11.7v-.5A8.4 8.4 0 0022 5.5z"/></svg></a>
            <a href="#" aria-label={t('common.instagram')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="17" cy="7" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="5"/></svg></a>
          </div>
          <div className="footer-copy">{t('footer.copyright')}</div>
        </div>
      </div>
    </footer>
  );
}
