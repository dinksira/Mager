export type Lang = 'en' | 'am';

export interface TranslationMap {
  [key: string]: string;
}

export const translations: Record<Lang, TranslationMap> = {
  en: {
    'nav-about': 'About',
    'nav-services': 'Services',
    'nav-team': 'Team',
    'nav-portfolio': 'Portfolio',
    'nav-projects': 'Projects',
    'nav-blog': 'Blog',
    'nav-contact': 'Contact',
    'brand': 'Mager.'
  },
  am: {
    'nav-about': 'ስለ እኛ',
    'nav-services': 'አገልግሎቶች',
    'nav-team': 'ቡድን',
    'nav-portfolio': 'ፖርትፎሊዮ',
    'nav-projects': 'ፕሮጀክቶች',
    'nav-blog': 'ብሎግ',
    'nav-contact': 'መገኛ',
    'brand': 'ማገር.'
  }
};
