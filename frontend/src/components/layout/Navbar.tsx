'use client';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useLanguage } from '@/hooks/useLanguage';

const navItems = [
  { id: 'about', key: 'nav.about' },
  { id: 'services', key: 'nav.services' },
  { id: 'team', key: 'nav.team' },
  { id: 'portfolio', key: 'nav.portfolio' },
  { id: 'ongoing', key: 'nav.projects' },
  { id: 'blog', key: 'nav.blog' },
  { id: 'contact', key: 'nav.contact' },
];

export default function Navbar({ themeToggle }: { themeToggle: React.ReactNode }) {
  const { t } = useTranslation();
  const activeId = useScrollSpy(navItems.map(n => n.id));
  const { toggle: toggleLang } = useLanguage();

  useEffect(() => {
    const links = document.querySelectorAll('.nav-links a');
    const handler = () => document.getElementById('navLinks')?.classList.remove('open');
    links.forEach(link => link.addEventListener('click', handler));
    return () => links.forEach(link => link.removeEventListener('click', handler));
  }, []);

  return (
    <nav>
      <div className="container">
        <a href="#" className="logo">{t('nav.brand')}<span>.</span></a>
        <ul className="nav-links" id="navLinks">
          {navItems.map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeId === item.id ? 'active' : ''}
              >
                {t(item.key)}
              </a>
            </li>
          ))}
          <li className="nav-actions">
            <button className="nav-btn lang-btn" id="langToggle" onClick={toggleLang} aria-label={t('common.switchLang')}>EN</button>
            {themeToggle}
          </li>
        </ul>
        <button className="hamburger" id="hamburger" onClick={() => document.getElementById('navLinks')?.classList.toggle('open')} aria-label={t('common.menu')}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
