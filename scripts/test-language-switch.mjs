import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');

function read(path) {
  const file = join(dist, path);
  if (!existsSync(file)) throw new Error(`Missing build artifact: ${path}`);
  return readFileSync(file, 'utf8');
}

function expectLanguageSwitch(path, target) {
  const html = read(path);
  const chip = /<a class="chip whitespace-nowrap md:ml-1" href="([^"]+)">(FR|EN)<\/a>/.exec(html);

  if (!chip) throw new Error(`${path} must render a language switch chip`);
  if (chip[1] !== target) throw new Error(`${path} language switch must point to ${target}, received ${chip[1]}`);
}

expectLanguageSwitch('fr/comment-ca-marche.html', '/en/how-it-works');
expectLanguageSwitch('en/how-it-works.html', '/fr/comment-ca-marche');
expectLanguageSwitch('fr/organiser-conversations-chatgpt.html', '/en/organize-ai-conversations');
expectLanguageSwitch('en/organize-ai-conversations.html', '/fr/organiser-conversations-chatgpt');
expectLanguageSwitch('fr/blog/chatgpt-claude-conversations-bordel.html', '/en/blog/when-ai-conversations-get-lost');
expectLanguageSwitch('en/blog/when-ai-conversations-get-lost.html', '/fr/blog/chatgpt-claude-conversations-bordel');

const header = readFileSync(join(process.cwd(), 'src/components/Header.astro'), 'utf8');
if (!header.includes("alternateHref ?? (isEn ? '/fr' : '/en')")) {
  throw new Error('A page without a translation must fall back to the opposite-language homepage');
}

console.log('Language switch assertions passed.');
