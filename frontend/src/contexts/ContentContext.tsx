'use client';

import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import i18n from '@/lib/i18n';

export interface ContentOverrides {
  [path: string]: string;
}

interface ContentContextType {
  overrides: ContentOverrides;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType>({
  overrides: {},
  loading: true,
});

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
const POLL_INTERVAL = 10000;

function mergeOverrides(data: ContentOverrides) {
  for (const [key, value] of Object.entries(data)) {
    i18n.addResource('en', 'common', key, value);
  }
}

function applyContent(data: ContentOverrides, setOverrides: (d: ContentOverrides) => void, prevHash: React.MutableRefObject<string>) {
  const hash = JSON.stringify(data);
  if (hash === prevHash.current) return;
  prevHash.current = hash;
  setOverrides(data);
  mergeOverrides(data);
}

function createLanguageAwareProxy(data: ContentOverrides) {
  return new Proxy(data, {
    get(target, prop) {
      if (typeof prop !== 'string') return Reflect.get(target, prop);
      
      const currentLang = i18n.language;
      if (currentLang === 'en') {
        return target[prop];
      }
      
      const hasTranslation = i18n.exists(prop);
      if (hasTranslation) {
        return undefined;
      }
      
      return target[prop];
    }
  });
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<ContentOverrides>({});
  const [loading, setLoading] = useState(true);
  const prevHash = useRef('');

  useEffect(() => {
    let active = true;

    async function fetchContent() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/content`);
        if (!res.ok) throw new Error('Failed to fetch content');
        const data: ContentOverrides = await res.json();
        if (active) applyContent(data, setOverrides, prevHash);
      } catch {
        // Backend unavailable
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchContent();

    const es = new EventSource(`${BACKEND_URL}/api/content/events`);
    es.addEventListener('content-updated', (e) => {
      try {
        const data: ContentOverrides = JSON.parse(e.data);
        if (active) applyContent(data, setOverrides, prevHash);
      } catch { /* ignore */ }
    });
    es.onerror = () => { /* SSE failed — polling will catch it */ };

    const interval = setInterval(fetchContent, POLL_INTERVAL);

    return () => { active = false; es.close(); clearInterval(interval); };
  }, []);

  const proxyOverrides = createLanguageAwareProxy(overrides);

  return (
    <ContentContext.Provider value={{ overrides: proxyOverrides, loading }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
