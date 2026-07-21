'use client';
import { useTranslation } from 'react-i18next';

export function useLanguage() {
  const { i18n } = useTranslation();

  const toggle = () => {
    const next = i18n.language === 'en' ? 'am' : 'en';
    i18n.changeLanguage(next);
    document.documentElement.setAttribute('lang', next);
  };

  return { lang: i18n.language, toggle };
}
