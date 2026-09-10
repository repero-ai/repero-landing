import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const dist = join(root, 'dist');

function read(relativePath) {
  const path = join(dist, relativePath);
  if (!existsSync(path)) throw new Error(`Missing build artifact: ${relativePath}`);
  return readFileSync(path, 'utf8');
}

function expect(value, needle, label) {
  if (!value.includes(needle)) throw new Error(`${label} must include ${needle}`);
}

function reject(value, needle, label) {
  if (value.includes(needle)) throw new Error(`${label} must not include ${needle}`);
}

const representativeRoutes = ['en.html', 'fr.html', 'en/privacy.html', 'fr/terms.html', 'en/blog/what-happens-to-your-data-repero-ai.html'];
const browserIconHrefs = [
  ['/favicon.ico', 'ICO fallback'],
  ['/brand/flat-web/favicon-32x32.png', '32px favicon'],
  ['/brand/flat-web/favicon-16x16.png', '16px favicon'],
  ['/brand/flat-web/apple-touch-icon-180x180.png', 'Apple touch icon']
];

for (const route of representativeRoutes) {
  const html = read(route);
  expect(html, 'rel="canonical" href="https://repero.ai/', `${route} canonical URL`);
  expect(html, 'property="og:url" content="https://repero.ai/', `${route} Open Graph URL`);
  expect(html, 'property="og:image" content="https://repero.ai/', `${route} Open Graph image URL`);
  expect(html, 'name="twitter:image" content="https://repero.ai/', `${route} Twitter image URL`);
  expect(html, '"url":"https://repero.ai', `${route} structured-data URL`);
  expect(html, '"image":"https://repero.ai/', `${route} structured-data image URL`);
  expect(html, '/brand/flat-web/', `${route} brand assets`);
  for (const [href, label] of browserIconHrefs) {
    expect(html, `href="${href}"`, `${route} ${label}`);
    reject(html, `href="https://repero.ai${href}"`, `${route} production-absolute ${label}`);
  }
  reject(html, 'repero-icon', `${route} legacy icon`);
  reject(html, 'brand/generated', `${route} generated legacy icon`);
  reject(html, 'rel="manifest"', `${route} PWA manifest`);
}

const home = read('en.html');
expect(home, 'rel="canonical" href="https://repero.ai/en"', 'home canonical URL');
expect(home, 'property="og:url" content="https://repero.ai/en"', 'home Open Graph URL');
expect(home, 'name="twitter:image" content="https://repero.ai/social/repero-ai-social-preview.png"', 'home Twitter image URL');
expect(home, '"url":"https://repero.ai"', 'home structured-data URL');
expect(home, 'https://repero.ai/social/repero-ai-social-preview.png', 'default social metadata');
expect(home, '"image":"https://repero.ai/social/repero-ai-social-preview.png"', 'site structured data');
expect(read('en/blog/what-happens-to-your-data-repero-ai.html'), 'https://repero.ai/blog/repero-ai-securite-donnees.png', 'article-specific image');
const socialMetadata = await sharp(join(dist, 'social/repero-ai-social-preview.png')).metadata();
if (socialMetadata.width !== 1200 || socialMetadata.height !== 630) throw new Error('Social fallback must be exactly 1200×630');

const rootFavicon = join(dist, 'favicon.ico');
if (!existsSync(rootFavicon)) throw new Error('Missing root favicon fallback');
if (!readFileSync(rootFavicon).equals(readFileSync(join(root, 'brand/logo/flat/web/favicon.ico')))) {
  throw new Error('Root favicon fallback must match the canonical flat-web ICO');
}

const enSecurity = read('en/blog/what-happens-to-your-data-repero-ai.html');
const frSecurity = read('fr/blog/ce-qui-arrive-a-vos-donnees-repero-ai.html');
expect(enSecurity, 'hreflang="fr" href="https://repero.ai/fr/blog/ce-qui-arrive-a-vos-donnees-repero-ai"', 'English security hreflang');
expect(frSecurity, 'hreflang="en" href="https://repero.ai/en/blog/what-happens-to-your-data-repero-ai"', 'French security hreflang');

const sitemap = read('sitemap.xml');
for (const route of ['/en/privacy', '/fr/privacy', '/en/terms', '/fr/terms', '/en/blog/what-happens-to-your-data-repero-ai', '/fr/blog/ce-qui-arrive-a-vos-donnees-repero-ai']) expect(sitemap, route, 'sitemap');
for (const removedRoute of ['/en/waitlist', '/fr/liste-attente', '/fr/use-cases', '<loc>https://repero.ai/</loc>']) reject(sitemap, removedRoute, 'sitemap');

for (const removedFile of ['en/waitlist.html', 'fr/liste-attente.html', 'fr/use-cases.html']) {
  if (existsSync(join(dist, removedFile))) throw new Error(`Removed route still built: ${removedFile}`);
}

const redirects = read('_redirects');
for (const rule of ['/en/waitlist /en 301', '/fr/liste-attente /fr 301', '/de /en 301', '/fr/use-cases/* /en/use-cases/:splat 301', '/privacy.fr /en/privacy 301', '/terms.nl /en/terms 301']) expect(redirects, rule, 'redirect rules');
for (const broadRule of ['/de/*', '/es/*', '/it/*', '/nl/*']) reject(redirects, broadRule, 'unmatched former-locale redirect');

console.log('SEO baseline build assertions passed.');
