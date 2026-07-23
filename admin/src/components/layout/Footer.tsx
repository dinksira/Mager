'use client';
import { useTranslation } from 'react-i18next';
import Editable from '@/components/admin/Editable';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/magerlogo.svg" alt="Mager" className="logo-img" />
            <span className="logo-text">Mager Software PLC</span>
          </div>
          <ul className="footer-links">
            <li><a href="/admin#about"><Editable path="nav.about">{t('nav.about')}</Editable></a></li>
            <li><a href="/admin#services"><Editable path="nav.services">{t('nav.services')}</Editable></a></li>
            <li><a href="/admin#team"><Editable path="nav.team">{t('nav.team')}</Editable></a></li>
            <li><a href="/admin#portfolio"><Editable path="nav.portfolio">{t('nav.portfolio')}</Editable></a></li>
            <li><a href="/admin#blog"><Editable path="nav.blog">{t('nav.blog')}</Editable></a></li>
            <li><a href="/admin#contact"><Editable path="nav.contact">{t('nav.contact')}</Editable></a></li>
          </ul>
          <div className="footer-social">
            <a href="https://www.linkedin.com/magersoftware" target="_blank" rel="noopener noreferrer" aria-label={t('common.linkedin')}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.3A1.8 1.8 0 114.7 6.5a1.8 1.8 0 011.8 1.8zM19 19h-3v-4.3c0-1.7-.7-2.2-1.5-2.2s-1.5.7-1.5 2.2V19h-3v-9h3v1.2a3 3 0 012.5-1.3c1.9 0 3.5 1.3 3.5 4.2z"/></svg></a>
            <a href="https://www.facebook.com/magersoftware/" target="_blank" rel="noopener noreferrer" aria-label={t('common.facebook')}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
            <a href="https://x.com/MagerSoftware" target="_blank" rel="noopener noreferrer" aria-label={t('common.twitter')}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.5a8 8 0 01-2.4.7 4.2 4.2 0 001.8-2.3 8.3 8.3 0 01-2.6 1 4.2 4.2 0 00-7.1 3.8A11.9 11.9 0 013 4.5a4.2 4.2 0 001.3 5.6A4.2 4.2 0 012 9.5v.1a4.2 4.2 0 003.4 4.1 4.2 4.2 0 01-1.9.1 4.2 4.2 0 003.9 2.9A8.4 8.4 0 012 18.5a11.9 11.9 0 006.3 1.8c7.5 0 11.7-6.2 11.7-11.7v-.5A8.4 8.4 0 0022 5.5z"/></svg></a>
            <a href="https://www.tiktok.com/magersoftware" target="_blank" rel="noopener noreferrer" aria-label={t('common.tiktok')}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.72-.01 2.92.01 5.84-.02 8.75-.1 1.6-.74 3.19-1.91 4.27-1.43 1.34-3.53 1.95-5.46 1.69-2.38-.28-4.52-1.95-5.26-4.23-.97-2.82-.01-6.19 2.37-7.85 1.05-.75 2.35-1.12 3.63-1.07V13.8a4.015 4.015 0 00-3.32 2.58 3.996 3.996 0 002.58 5.09c1.9.58 4.07-.36 4.74-2.22.18-.51.24-1.06.22-1.6V7.64c-.02-2.54-.01-5.08-.02-7.62z"/></svg></a>
          </div>
          <div className="footer-copy"><Editable path="footer.copyright">{t('footer.copyright')}</Editable></div>
        </div>
      </div>
    </footer>
  );
}
