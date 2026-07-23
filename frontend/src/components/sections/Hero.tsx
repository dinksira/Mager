'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useContent } from '@/contexts/ContentContext';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
const FALLBACK_SLIDES = ['images/modern oficc1.jpg','images/modern oficc2.jpg','images/modern oficc3.jpg','images/modern oficc4.jpg','images/modern oficc5.jpg'];
const POLL_INTERVAL = 10000;

export default function Hero() {
  const { t } = useTranslation();
  const { overrides } = useContent();
  const [slides, setSlides] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const prevHash = useRef('');
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const val = (key: string) => overrides[key] || t(key);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(p => (p + 1) % (slides.length || FALLBACK_SLIDES.length));
    }, 6000);
  }, [slides.length]);

  const activeSlides = slides.length > 0 ? slides : FALLBACK_SLIDES;

  useEffect(() => {
    let active = true;
    let inflight: Promise<void> | null = null;

    async function fetchSlides() {
      if (inflight) await inflight;
      inflight = (async () => {
        try {
          const res = await fetch(`${BACKEND_URL}/api/slides/live`);
          if (!res.ok) throw new Error('Failed to fetch slides');
          const data: string[] = await res.json();
          if (!Array.isArray(data) || data.length === 0) return;
          const unique = [...new Set(data)];
          const hash = JSON.stringify(unique);
          if (hash === prevHash.current) return;
          prevHash.current = hash;
          if (active) setSlides(unique);
        } catch {
          // ignore
        }
      })();
      await inflight;
      inflight = null;
    }

    fetchSlides();

    const es = new EventSource(`${BACKEND_URL}/api/slides/events`);
    es.addEventListener('slides-updated', () => fetchSlides());
    es.onerror = () => {};

    const interval = setInterval(fetchSlides, POLL_INTERVAL);

    return () => { active = false; es.close(); clearInterval(interval); };
  }, []);

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % activeSlides.length), 6000);
    return () => clearInterval(timerRef.current);
  }, [activeSlides.length]);

  const tagline = val('hero.subtitle') || 'Engineering the Digital Future of Africa';

  return (
    <section className="hero-section" id="home">
      <div className="hero-slider">
        {activeSlides.map((src, i) => {
          const isCurrent = i === current;
          const isNext = i === (current + 1) % activeSlides.length;
          const isPrev = i === (current - 1 + activeSlides.length) % activeSlides.length;
          if (!isCurrent && !isNext && !isPrev) return null;

          const getSlideUrl = (s: string) => {
            if (s.startsWith('images/')) return `/${s}`;
            if (s.startsWith('modern oficc')) return `/images/${s}`;
            return `${BACKEND_URL}/uploads/${encodeURIComponent(s)}`;
          };

          return (
            <img
              key={`bg-${i}`}
              src={getSlideUrl(src)}
              alt=""
              className={`hero-slide-img ${isCurrent ? 'active' : ''}`}
              loading={isCurrent ? 'eager' : 'lazy'}
              fetchPriority={isCurrent ? 'high' : 'low'}
            />
          );
        })}
      </div>
      <div className="hero-overlay-dark" />

      <div className="hero-blob" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />

      <div className="hero-content">
        <p className="hero-badge">{val('hero.badge') || 'From Vision to Digital Reality'}</p>

        <div className="hero-wordmark">
          <svg viewBox="0 0 800 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" className="hero-wordmark-text">
              {val('hero.wordmark') || 'Mager'}
            </text>
          </svg>
        </div>

        <p className="hero-tagline">{tagline}</p>

        <div className="hero-cta">
          <Link href="/contact" className="btn-primary">{val('hero.cta') || 'Start a Project'}</Link>
          <Link href="/projects" className="btn-outline">{val('hero.viewWork') || 'View Our Work'}</Link>
        </div>
      </div>

      <div className="hero-dots">
        {activeSlides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="scroll-indicator">
        <span></span>
      </div>
    </section>
  );
}
