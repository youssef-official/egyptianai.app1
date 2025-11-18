export const SUPPORTED_LANGS = {
  ar: { native: 'العربية', dir: 'rtl' },
  en: { native: 'English', dir: 'ltr' },
  fr: { native: 'Français', dir: 'ltr' },
  de: { native: 'Deutsch', dir: 'ltr' },
  zh: { native: '中文', dir: 'ltr' },
  es: { native: 'Español', dir: 'ltr' },
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGS;

export const applyDirection = (lang: SupportedLanguage) => {
  const dir = SUPPORTED_LANGS[lang].dir;
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
};
