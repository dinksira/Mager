'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { useContent } from '@/contexts/ContentContext';

const navItems = [
  { href: '/about', key: 'nav.about' },
  { href: '/services', key: 'nav.services' },
  { href: '/team', key: 'nav.team' },
  { href: '/projects', key: 'nav.portfolio' },
  { href: '/blog', key: 'nav.blog' },
];

export default function Navbar({ themeToggle }: { themeToggle: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { overrides } = useContent();
  const { toggle: toggleLang } = useLanguage();

  const val = (key: string) => overrides[key] || t(key);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="capsule-nav">
      <Link href="/" className="logo-link">
        <img src="/magerlogo.svg" alt="Mager" className="logo-img" />
        <span className="logo-text">Mager Software PLC</span>
      </Link>
      <ul className="nav-links-c" id="navLinksC">
        {navItems.map(item => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={isActive(item.href) ? 'active' : ''}
              onClick={() => document.getElementById('navLinksC')?.classList.remove('open')}
            >
              {val(item.key)}
            </Link>
          </li>
        ))}
      </ul>
      <div className="nav-btn-wrap">
        <Link href="/contact" className="btn-contact">Contact</Link>
        <button className="nav-btn-ghost lang-btn" onClick={toggleLang} aria-label={t('common.switchLang')}>EN</button>
        {themeToggle}
      </div>
      <button className="hamburger-c" id="hamburgerC" onClick={() => document.getElementById('navLinksC')?.classList.toggle('open')} aria-label={t('common.menu')}>
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}
