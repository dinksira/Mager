'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { useEditMode } from '@/contexts/EditModeContext';
import Editable from '@/components/admin/Editable';

const navItems = [
  { href: '/', key: 'nav.home' },
  { href: '/about', key: 'nav.about' },
  { href: '/services', key: 'nav.services' },
  { href: '/team', key: 'nav.team' },
  { href: '/projects', key: 'nav.portfolio' },
  { href: '/blog', key: 'nav.blog' },
  { href: '/contact', key: 'nav.contact' },
];

export default function Navbar({ themeToggle }: { themeToggle: React.ReactNode }) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { toggle: toggleLang } = useLanguage();
  const { editMode } = useEditMode();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="capsule-nav">
      <Link href="/" className="logo-link" onClick={e => editMode && e.preventDefault()}>
        <img src="/magerlogo.svg" alt="Mager" className="logo-img" />
        <span className="logo-text">Mager Software PLC</span>
      </Link>
      <ul className={`nav-links-c${menuOpen ? ' open' : ''}`}>
        {navItems.filter(n => n.href !== '/').map(item => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              <Editable path={item.key}>{t(item.key)}</Editable>
            </Link>
          </li>
        ))}
      </ul>
      <div className="nav-btn-wrap">
        <button className="nav-btn-ghost lang-btn" id="langToggle" onClick={toggleLang} aria-label={t('common.switchLang')}>EN</button>
        {themeToggle}
        <button className="hamburger-c" onClick={() => setMenuOpen(o => !o)} aria-label={t('common.menu')}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  );
}
