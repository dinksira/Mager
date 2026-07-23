'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Editable from '@/components/admin/Editable';
import ImageManagerModal from '@/components/admin/ImageManagerModal';
import { useEditMode } from '@/contexts/EditModeContext';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:4000';
const POLL_INTERVAL = 10000;

export default function Hero() {
  const { t } = useTranslation();
  const { editMode } = useEditMode();
  const [slides, setSlides] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const prevHash = useRef('');
  const activeRef = useRef(true);

  const fetchSlides = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/slides/live`);
      if (!res.ok) throw new Error('Failed to fetch slides');
      const data: string[] = await res.json();
      if (!Array.isArray(data)) return;
      const unique = [...new Set(data)];
      const hash = JSON.stringify(unique);
      if (hash === prevHash.current) return;
      prevHash.current = hash;
      if (activeRef.current) setSlides(unique);
    } catch {
      if (activeRef.current) setSlides(['modern oficc1.jpg','modern oficc2.jpg','modern oficc3.jpg','modern oficc4.jpg','modern oficc5.jpg']);
    }
  }, []);

  useEffect(() => {
    activeRef.current = true;
    fetchSlides();
    const es = new EventSource(`${BACKEND_URL}/api/slides/events`);
    es.addEventListener('slides-updated', () => { fetchSlides(); });
    es.onerror = () => {};
    const interval = setInterval(fetchSlides, POLL_INTERVAL);
    return () => { activeRef.current = false; es.close(); clearInterval(interval); };
  }, [fetchSlides]);

  useEffect(() => {
    if (!modalOpen) {
      prevHash.current = '';
      fetchSlides();
    }
  }, [modalOpen, fetchSlides]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => setCurrent(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [slides]);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
  }, []);

  const handleSlidesClick = (e: React.MouseEvent) => {
    if (!editMode) return;
    const t = e.target as HTMLElement;
    if (t.closest('.editable-target, .editable-input, .editable-textarea, .hero-content a, .hero-dots, .scroll-indicator, .hero-slides-edit-hint')) return;
    setModalOpen(true);
  };

  const activeSlides = slides.length > 0 ? slides : ['modern oficc1.jpg','modern oficc2.jpg','modern oficc3.jpg','modern oficc4.jpg','modern oficc5.jpg'];

  return (
    <section className="hero-section" id="home" onClick={handleSlidesClick}>
      <div className="hero-slider" style={editMode ? { cursor: 'pointer' } : undefined}>
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
        {editMode && <div className="hero-slides-edit-hint">Click to manage slideshow</div>}
      </div>
      <div className="hero-overlay-dark" />
      <div className="hero-blob" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />
      <div className="hero-content">
        <div className="hero-badge"><Editable path="hero.badge">{t('hero.badge')}</Editable></div>
        <div className="hero-wordmark">
          <Editable path="hero.wordmark" className="hero-wordmark-text">{t('hero.wordmark')}</Editable>
        </div>
        <div className="hero-tagline"><Editable path="hero.subtitle" type="textarea">{t('hero.subtitle')}</Editable></div>
        <div className="hero-cta">
          <a href="#contact" className="btn-primary"><Editable path="hero.cta">{t('hero.cta')}</Editable></a>
          <a href="#portfolio" className="btn-outline"><Editable path="hero.viewWork">{t('hero.viewWork')}</Editable></a>
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
      <div className="scroll-indicator"><span></span></div>
      <ImageManagerModal open={modalOpen} onClose={() => setModalOpen(false)} onSlidesChange={setSlides} />
    </section>
  );
}
