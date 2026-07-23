'use client';

import { useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeToggle from '@/components/layout/ThemeToggle';
import ChatWidget from '@/components/chat/ChatWidget';

export default function PublicLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const els = document.querySelectorAll('[data-reveal]');
    els.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      } else {
        revealObserver.observe(el);
      }
    });

    const wordObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const spans = entry.target.querySelectorAll('.word');
          spans.forEach((span, i) => {
            (span as HTMLElement).style.setProperty('--i', String(i));
          });
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });

    const wordRevealEls = document.querySelectorAll('.word-reveal');
    wordRevealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        const spans = el.querySelectorAll('.word');
        spans.forEach((span, i) => {
          (span as HTMLElement).style.setProperty('--i', String(i));
        });
        el.classList.add('visible');
      } else {
        wordObserver.observe(el);
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

    const driftObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('drift-visible');
        }
      });
    }, { threshold: 0.1 });

    const driftEls = document.querySelectorAll('.drift-item');
    driftEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('drift-visible');
      else driftObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
      wordObserver.disconnect();
      heroObserver.disconnect();
      driftObserver.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <Navbar themeToggle={<ThemeToggle />} />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
