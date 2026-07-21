'use client';
import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useLanguage } from '@/hooks/useLanguage';
import { useEditMode } from '@/contexts/EditModeContext';
import Editable from '@/components/admin/Editable';

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
  const activeId = useScrollSpy(navItems.map(n => n.id), 116);
  const { toggle: toggleLang } = useLanguage();
  const { editMode } = useEditMode();

  const handleNavClick = useCallback((e: React.MouseEvent, id: string) => {
    if (editMode) {
      e.preventDefault();
      return;
    }
    document.getElementById('navLinks')?.classList.remove('open');
  }, [editMode]);

  return (
    <nav>
      <div className="container">
        <a href="#" className="logo" onClick={e => editMode && e.preventDefault()}>{t('nav.brand')}<span>.</span></a>
        <ul className="nav-links" id="navLinks">
          {navItems.map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeId === item.id ? 'active' : ''}
                onClick={e => handleNavClick(e, item.id)}
              >
                <Editable path={item.key}>{t(item.key)}</Editable>
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
