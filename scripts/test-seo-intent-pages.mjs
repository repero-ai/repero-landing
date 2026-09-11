import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');

function read(path) {
  const file = join(dist, path);
  if (!existsSync(file)) throw new Error(`Missing build artifact: ${path}`);
  return readFileSync(file, 'utf8');
}

function expect(value, needle, label) {
  if (!value.includes(needle)) throw new Error(`${label} must include ${needle}`);
}

function expectOneH1(value, label) {
  if ((value.match(/<h1(?:\s|>)/g) ?? []).length !== 1) throw new Error(`${label} must contain exactly one H1`);
}

const pages = [
  {
    file: 'fr/organiser-conversations-chatgpt.html', lang: 'fr', path: '/fr/organiser-conversations-chatgpt', alternate: 'https://repero.ai/en/organize-ai-conversations',
    heading: 'Comment organiser ses conversations ChatGPT et ne plus perdre son travail ?',
    title: 'Organiser ses conversations ChatGPT et son travail IA | Repero AI'
  },
  {
    file: 'en/organize-ai-conversations.html', lang: 'en', path: '/en/organize-ai-conversations', alternate: 'https://repero.ai/fr/organiser-conversations-chatgpt',
    heading: 'How can you organize ChatGPT conversations without losing your work?',
    title: 'How to organize ChatGPT conversations and AI work | Repero AI'
  },
  {
    file: 'fr/securiser-ia-pme.html', lang: 'fr', path: '/fr/securiser-ia-pme', alternate: 'https://repero.ai/en/secure-ai-for-small-business',
    heading: 'Comment sécuriser l’usage de l’IA en PME sans compliquer le travail des équipes ?',
    title: 'Sécuriser l’usage de l’IA en PME | Repero AI'
  },
  {
    file: 'en/secure-ai-for-small-business.html', lang: 'en', path: '/en/secure-ai-for-small-business', alternate: 'https://repero.ai/fr/securiser-ia-pme',
    heading: 'How can small businesses use AI securely without making work harder for their teams?',
    title: 'How to use AI securely in a small business | Repero AI'
  },
  {
    file: 'fr/alternative-europeenne-chatgpt.html', lang: 'fr', path: '/fr/alternative-europeenne-chatgpt', alternate: 'https://repero.ai/en/european-chatgpt-alternative',
    heading: 'Une alternative européenne à ChatGPT pour travailler avec plusieurs IA',
    title: 'Alternative européenne à ChatGPT : un espace multi-IA | Repero AI'
  },
  {
    file: 'en/european-chatgpt-alternative.html', lang: 'en', path: '/en/european-chatgpt-alternative', alternate: 'https://repero.ai/fr/alternative-europeenne-chatgpt',
    heading: 'A European alternative to ChatGPT for working with multiple AI models',
    title: 'A European ChatGPT alternative: a multi-model AI workspace | Repero AI'
  }
];

const sitemap = read('sitemap.xml');
const descriptions = new Set();
for (const page of pages) {
  const html = read(page.file);
  expect(html, `<html lang="${page.lang}">`, `${page.file} language`);
  expect(html, `<title>${page.title}</title>`, `${page.file} title`);
  expect(html, `rel="canonical" href="https://repero.ai${page.path}"`, `${page.file} canonical`);
  expect(html, `hreflang="${page.lang === 'fr' ? 'en' : 'fr'}" href="${page.alternate}"`, `${page.file} alternate`);
  expect(html, page.heading, `${page.file} heading`);
  expect(html, 'https://app.repero.ai', `${page.file} product CTA`);
  expect(sitemap, `<loc>https://repero.ai${page.path}</loc>`, `${page.file} sitemap entry`);
  expectOneH1(html, page.file);
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  if (!description) throw new Error(`${page.file} must have a description`);
  descriptions.add(description);
  if (html.includes('localhost') || html.includes('127.0.0.1')) throw new Error(`${page.file} must not leak a preview hostname`);
}

if (descriptions.size !== pages.length) throw new Error('SEO intent page descriptions must be unique');

console.log('SEO intent pages build assertions passed.');
