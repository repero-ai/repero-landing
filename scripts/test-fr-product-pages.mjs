import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function readExpectedFile(path) {
  if (!existsSync(path)) {
    throw new Error(`Missing expected build artifact: ${path}`);
  }

  return readFileSync(path, 'utf8');
}

function assertIncludes(content, needle, label) {
  if (!content.includes(needle)) {
    throw new Error(`Missing "${needle}" in ${label}`);
  }
}

const distDir = join(process.cwd(), 'dist');
const frHomePath = join(distDir, 'fr.html');
const enHomePath = join(distDir, 'en.html');
const howItWorksPath = join(distDir, 'fr', 'comment-ca-marche.html');

const frHome = readExpectedFile(frHomePath);
const enHome = readExpectedFile(enHomePath);
const howItWorks = readExpectedFile(howItWorksPath);

assertIncludes(frHome, 'Travaillez avec l’IA sans perdre vos idées — ni le contrôle de vos données.', 'fr homepage');
assertIncludes(frHome, '/fr/comment-ca-marche', 'fr homepage');
assertIncludes(frHome, 'Essayer gratuitement', 'fr homepage');
assertIncludes(frHome, 'Aucune clé API à configurer · Commencez gratuitement', 'fr homepage');
assertIncludes(enHome, 'Work with AI without losing your ideas — or control of your data.', 'en homepage');
assertIncludes(enHome, 'Try Repero AI for free', 'en homepage');
assertIncludes(enHome, '/en/how-it-works', 'en homepage');
assertIncludes(enHome, 'No API key required · Start for free', 'en homepage');
assertIncludes(howItWorks, '<title>Comment ça marche | Repero AI</title>', 'fr how-it-works page');
assertIncludes(howItWorks, 'href="https://repero.ai/fr/comment-ca-marche"', 'fr how-it-works page canonical');
assertIncludes(howItWorks, 'Aller plus loin', 'fr how-it-works page');

console.log('French homepage and how-it-works build artifacts look valid.');
