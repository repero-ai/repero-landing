export type Locale = 'en' | 'fr';

export interface LocaleAlternate {
  lang: Locale | 'x-default';
  href: string;
}

/**
 * Returns the local path for the alternate locale already declared in a page's
 * hreflang metadata. Keeping this derived from that metadata prevents the
 * visible language switch from drifting from SEO alternates.
 */
export function getAlternateLocalePath(lang: Locale, alternates?: LocaleAlternate[]) {
  const targetLang = lang === 'en' ? 'fr' : 'en';
  const alternate = alternates?.find((candidate) => candidate.lang === targetLang);

  if (!alternate) return undefined;

  const url = new URL(alternate.href, 'https://repero.ai');
  return `${url.pathname}${url.search}${url.hash}`;
}
