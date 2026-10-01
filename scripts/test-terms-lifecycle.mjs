import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');

function read(path) {
  const file = join(dist, path);
  if (!existsSync(file)) throw new Error(`Missing build artifact: ${path}`);
  return readFileSync(file, 'utf8');
}

const en = read('en/terms.html');
const fr = read('fr/terms.html');

const headings = (html) => [...html.matchAll(/<h3>(8\.\d) /g)].map((m) => m[1]);
for (const [html, label] of [[en, 'English terms'], [fr, 'French terms']]) {
  const found = headings(html);
  const expected = ['8.1', '8.2', '8.3', '8.4', '8.5', '8.6', '8.7'];
  if (JSON.stringify(found) !== JSON.stringify(expected)) {
    throw new Error(`${label} Section 8 must have subsections ${expected}, received ${found}`);
  }
  if (/stripe|cus_|sub_|price_/i.test(html)) throw new Error(`${label} must not expose provider identifiers`);
}

for (const needle of [
  'Last updated: October 2026',
  'takes effect at the end of the current paid period',
  'prorated charge for the remainder of the current paid period',
  'current plan stays active and unchanged',
  'Nothing is charged or refunded when you request it',
  'does not by itself withdraw a cancellation that is already scheduled',
  'replaces a scheduled cancellation'
]) {
  if (!en.includes(needle)) throw new Error(`English terms must include "${needle}"`);
}
for (const needle of [
  'Dernière mise à jour : Octobre 2026',
  'prend effet à la fin de la période payante en cours',
  'montant calculé au prorata pour le reste de la période payante en cours',
  'votre offre actuelle reste active et inchangée',
  'Aucun montant n’est facturé ni remboursé au moment de la demande',
  'ne retire pas, en soi, une résiliation déjà programmée',
  'remplace une résiliation programmée'
]) {
  if (!fr.includes(needle)) throw new Error(`French terms must include "${needle}"`);
}

console.log('Terms lifecycle assertions passed.');
