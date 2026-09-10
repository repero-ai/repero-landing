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

for (const route of ['en.html', 'fr.html', 'en/privacy.html', 'fr/terms.html', 'en/blog/what-happens-to-your-data-repero-ai.html']) {
  const html = read(route);
  expect(html, 'https://repero.ai/', `${route} SEO metadata`);
  expect(html, '/brand/flat-web/', `${route} brand assets`);
  reject(html, 'repero-icon', `${route} legacy icon`);
  reject(html, 'brand/generated', `${route} generated legacy icon`);
  reject(html, 'rel="manifest"', `${route} PWA manifest`);
}

const home = read('en.html');
expect(home, 'https://repero.ai/social/repero-ai-social-preview.png', 'default social metadata');
expect(home, '"image":"https://repero.ai/social/repero-ai-social-preview.png"', 'site structured data');
expect(read('en/blog/what-happens-to-your-data-repero-ai.html'), 'https://repero.ai/blog/repero-ai-securite-donnees.png', 'article-specific image');
const socialMetadata = await sharp(join(dist, 'social/repero-ai-social-preview.png')).metadata();
if (socialMetadata.width !== 1200 || socialMetadata.height !== 630) throw new Error('Social fallback must be exactly 1200×630');

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
