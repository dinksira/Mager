'use client';

import { useEffect, ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import ThemeToggle from '@/components/layout/ThemeToggle';
import Footer from '@/components/layout/Footer';
import EditModeToggle from '@/components/admin/EditModeToggle';
import PublishButton from '@/components/admin/PublishButton';
import { EditModeProvider } from '@/contexts/EditModeContext';

export default function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const navigation = window.performance?.getEntriesByType('navigation');
      if (navigation && navigation.length > 0) {
        const type = (navigation[0] as PerformanceNavigationTiming).type;
        if (type === 'reload') {
          signOut({ callbackUrl: '/login' });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.replace('/login');
    }
  }, [session, status, router]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-reveal]').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      } else {
        revealObserver.observe(el);
      }
    });

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hero-animated');
        }
      });
    }, { threshold: 0.1 });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      if (rect.top < window.innerHeight) heroSection.classList.add('hero-animated');
      else heroObserver.observe(heroSection);
    }

    return () => {
      revealObserver.disconnect();
      heroObserver.disconnect();
    };
  }, [pathname, session]);

  if (status === 'loading' || !session) {
    return (
      <div className="admin-login">
        <div className="admin-login-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div className="admin-login-brand">
            <img src="/magerlogo.svg" alt="Mager" className="admin-login-brand-img" />
            <span>Mager <em>Software PLC</em></span>
          </div>
          <div style={{ width: 28, height: 28, border: '3px solid var(--border)', borderTopColor: '#FE6811', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
          <p className="admin-login-desc" style={{ marginBottom: 0 }}>Loading&hellip;</p>
        </div>
      </div>
    );
  }

  return (
    <EditModeProvider>
      <EditModeToggle />
      <PublishButton />
      <Navbar themeToggle={<ThemeToggle />} />
      <main>{children}</main>
      <Footer />
    </EditModeProvider>
  );
}
