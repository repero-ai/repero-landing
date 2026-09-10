export const SITE_NAME = 'Repero AI';
export const SITE_URL = 'https://repero.ai';
export const DEFAULT_OG_IMAGE = '/social/repero-ai-social-preview.png';
export const BRAND_LOGO = '/brand/flat-web/repero-mark-flat-transparent.svg';

function stripTrailingSlash(value: string) {
  if (value === '/') {
    return value;
  }

  return value.replace(/\/+$/, '');
}

export function absoluteUrl(path: string, _baseUrl: string = SITE_URL) {
  const parsed = new URL(path, SITE_URL);
  const url = new URL(`${parsed.pathname}${parsed.search}${parsed.hash}`, SITE_URL);
  url.pathname = stripTrailingSlash(url.pathname) || '/';
  return url.href;
}
