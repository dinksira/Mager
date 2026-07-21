'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const slides = ['modern oficc1.jpg','modern oficc2.jpg','modern oficc3.jpg','modern oficc4.jpg','modern oficc5.jpg'];

export default function Hero() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="container hero-wrapper">
        <div className="hero-content">
          <h1>
            {t('hero.title')} <span>{t('hero.titleHighlight')}</span> {t('hero.titleEnd')}
          </h1>
          <p>{t('hero.subtitle')}</p>
          <div className="hero-btns">
            <a href="#contact" className="btn btn-primary">{t('hero.cta')}</a>
            <a href="#portfolio" className="btn btn-hero-outline">{t('hero.viewWork')}</a>
          </div>
        </div>
      </div>
      <div className="hero-slideshow">
        {slides.map((src, i) => (
          <img
            key={src}
            src={`/images/${src}`}
            alt={`${t('hero.alt')} ${i + 1}`}
            className={i === current ? 'active' : ''}
          />
        ))}
      </div>
    </section>
  );
}
