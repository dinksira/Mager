export type Lang = 'en' | 'am';

export interface TranslationMap {
  [key: string]: string;
}

export const translations: Record<Lang, TranslationMap> = {
  en: {
    'nav.home': 'Home',
    'nav-about': 'About',
    'nav-services': 'Services',
    'nav-team': 'Team',
    'nav-portfolio': 'Portfolio',
    'nav-projects': 'Projects',
    'nav-blog': 'Blog',
    'nav-contact': 'Contact',
    'brand': 'Mager.',
    'testimonials.sectionTitle': 'What our clients say',
    'testimonials.sectionSubtitle': 'Hear from the businesses and organizations we have had the privilege to work with.',
    'partners.sectionTitle': 'Trusted by',
    'partners.sectionSubtitle': 'Companies and organizations that have partnered with us.',
  },
  am: {
    'nav.home': 'መነሻ',
    'nav-about': 'ስለ እኛ',
    'nav-services': 'አገልግሎቶች',
    'nav-team': 'ቡድን',
    'nav-portfolio': 'ፖርትፎሊዮ',
    'nav-projects': 'ፕሮጀክቶች',
    'nav-blog': 'ብሎግ',
    'nav-contact': 'መገኛ',
    'brand': 'ማገር.',
    'testimonials.sectionTitle': 'ደንበኞቻችን ምን ይላሉ',
    'testimonials.sectionSubtitle': 'አብረን የሠራናቸው ድርጅቶች እና ተቋማት ምስክርነት።',
    'partners.sectionTitle': 'እምነት ያደረብን',
    'partners.sectionSubtitle': 'ከእኛ ጋር አጋር የሆኑ ኩባንያዎች እና ድርጅቶች።',
  }
};
