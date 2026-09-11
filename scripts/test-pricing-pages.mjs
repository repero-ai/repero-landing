import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');

function read(path) {
  const file = join(dist, path);
  if (!existsSync(file)) throw new Error(`Missing build artifact: ${path}`);
  return readFileSync(file, 'utf8');
}

function expect(value, needle, label) {
  if (!value.includes(needle)) throw new Error(`${label} must include ${needle}`);
}

function reject(value, needle, label) {
  if (value.includes(needle)) throw new Error(`${label} must not include ${needle}`);
}

const fr = read('fr/tarifs.html');
const en = read('en/pricing.html');

for (const [html, label, path, alternate] of [
  [fr, 'French pricing', '/fr/tarifs', 'https://repero.ai/en/pricing'],
  [en, 'English pricing', '/en/pricing', 'https://repero.ai/fr/tarifs']
]) {
  expect(html, `rel="canonical" href="https://repero.ai${path}"`, `${label} canonical`);
  expect(html, `href="${alternate}"`, `${label} alternate`);
  expect(html, 'https://app.repero.ai', `${label} application CTA`);
  reject(html, 'API key', `${label} API-key message`);
  reject(html, 'clé API', `${label} API-key message`);
  reject(html, '—', `${label} misleading document-space dash`);
}

for (const value of ['0 €', '9 € / mois HTVA', '19 € / mois HTVA', '49 € / mois HTVA']) expect(fr, value, 'French pricing');
for (const value of ['€0', '€9 / month excl. VAT', '€19 / month excl. VAT', '€49 / month excl. VAT']) expect(en, value, 'English pricing');

expect(fr, '10,89 € TVAC en Belgique', 'French Starter VAT example');
expect(fr, '22,99 € TVAC en Belgique', 'French Plus VAT example');
expect(fr, '59,29 € TVAC en Belgique', 'French Pro VAT example');
expect(fr, 'Exemple TVAC calculé avec le taux belge de 21 %. Le montant final de TVA est déterminé lors de la souscription selon votre pays et votre statut.', 'French VAT note');
expect(en, '€10.89 incl. VAT in Belgium', 'English Starter VAT example');
expect(en, '€22.99 incl. VAT in Belgium', 'English Plus VAT example');
expect(en, '€59.29 incl. VAT in Belgium', 'English Pro VAT example');
expect(en, 'VAT-inclusive example calculated using Belgium’s 21% standard rate. Final VAT is determined during subscription based on your country and status.', 'English VAT note');

expect(fr, 'Mode automatique uniquement', 'French Free automatic-only access');
expect(en, 'Automatic mode only', 'English Free automatic-only access');
expect(fr, 'Choisissez GPT, Claude ou Mistral ; Repero sélectionne automatiquement le modèle adapté dans la famille choisie.', 'French Starter family choice');
expect(en, 'Choose GPT, Claude or Mistral; Repero automatically selects the right model within the family you choose.', 'English Starter family choice');
expect(fr, 'automatique, par famille ou directement par modèle', 'French Plus direct model choice');
expect(en, 'automatic, by family or directly by model', 'English Plus direct model choice');
expect(fr, 'Accès aux modèles de pointe disponibles', 'French Pro flagship access');
expect(en, 'Access to available flagship models', 'English Pro flagship access');
expect(fr, 'Les modèles les plus avancés consomment davantage de votre enveloppe incluse.', 'French advanced-model usage note');
expect(en, 'The most advanced models use more of your included usage allowance.', 'English advanced-model usage note');
expect(fr, 'Usage IA : découverte', 'French Free usage');
expect(fr, 'Usage IA : base', 'French Starter usage');
expect(fr, 'Usage IA : environ 1,5× Starter', 'French Plus usage');
expect(fr, 'Usage IA : environ 2,5× Plus', 'French Pro usage');
expect(en, 'AI usage: discovery', 'English Free usage');
expect(en, 'AI usage: base', 'English Starter usage');
expect(en, 'AI usage: about 1.5× Starter', 'English Plus usage');
expect(en, 'AI usage: about 2.5× Plus', 'English Pro usage');
expect(fr, 'feature-card flex h-full flex-col', 'French aligned cards');
expect(fr, 'btn-primary mt-auto', 'French aligned card CTAs');

console.log('Pricing page build assertions passed.');
