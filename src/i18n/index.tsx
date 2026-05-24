import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { zh } from './zh';
import { en } from './en';

export type Lang = 'zh' | 'en';

const translations: Record<Lang, Record<string, string>> = { zh, en };

interface I18nContextValue {
  lang: Lang;
  t: (key: string) => string;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('fanren-lang');
      if (saved === 'en' || saved === 'zh') return saved;
    } catch {}
    return 'zh';
  });

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'zh' ? 'en' : 'zh';
      try { localStorage.setItem('fanren-lang', next); } catch {}
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[lang] || translations.zh;
      return dict[key] ?? key;
    },
    [lang],
  );

  return (
    <I18nContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
