export type PricingLanguage = 'en' | 'fr';

// Purchase-intent entry point owned by ai-platform: only the plan key travels.
// Prices, VAT and Stripe/billing identifiers are always resolved server-side.
const APP_ORIGIN = 'https://app.repero.ai';
export const FREE_SIGNUP_HREF = `${APP_ORIGIN}/auth/signup/`;
export const purchaseIntentHref = (plan: 'starter' | 'plus' | 'pro') =>
  `${APP_ORIGIN}/chat/billing/subscribe/?plan=${plan}`;

export interface PricingPlan {
  name: string;
  ctaHref: string;
  price: string;
  priceSuffix?: string;
  bestFor: string;
  modelAccess: string[];
  documentSpace: string;
  aiUsage: string;
  vatExample?: string;
}

export const pricingPlans: Record<PricingLanguage, PricingPlan[]> = {
  fr: [
    {
      name: 'Free',
      ctaHref: FREE_SIGNUP_HREF,
      price: '0 €',
      bestFor: 'Pour découvrir Repero et poser quelques questions.',
      modelAccess: ['Mode automatique uniquement.'],
      documentSpace: 'Espace documentaire limité',
      aiUsage: 'Usage IA : découverte'
    },
    {
      name: 'Starter',
      ctaHref: purchaseIntentHref('starter'),
      price: '9 € / mois',
      priceSuffix: 'HTVA',
      bestFor: 'Pour une utilisation occasionnelle.',
      modelAccess: ['Choisissez GPT, Claude ou Mistral ; Repero gère automatiquement le modèle dans la famille choisie.'],
      documentSpace: 'Plus d’espace documentaire que Free',
      aiUsage: 'Usage IA : base',
      vatExample: '10,89 € TVAC en Belgique'
    },
    {
      name: 'Plus',
      ctaHref: purchaseIntentHref('plus'),
      price: '19 € / mois',
      priceSuffix: 'HTVA',
      bestFor: 'Pour un usage quotidien.',
      modelAccess: ['Automatique, par famille ou directement par modèle'],
      documentSpace: 'Espace documentaire plus confortable',
      aiUsage: 'Usage IA : environ 2,5× Starter',
      vatExample: '22,99 € TVAC en Belgique'
    },
    {
      name: 'Pro',
      ctaHref: purchaseIntentHref('pro'),
      price: '49 € / mois',
      priceSuffix: 'HTVA',
      bestFor: 'Pour un usage professionnel.',
      modelAccess: ['Automatique, par famille ou directement par modèle', 'Accès aux modèles de pointe disponibles [1]'],
      documentSpace: 'Espace documentaire étendu',
      aiUsage: 'Usage IA : environ 3× Plus',
      vatExample: '59,29 € TVAC en Belgique'
    }
  ],
  en: [
    {
      name: 'Free',
      ctaHref: FREE_SIGNUP_HREF,
      price: '€0',
      bestFor: 'For discovering Repero and asking a few questions.',
      modelAccess: ['Automatic mode only.'],
      documentSpace: 'Limited document space',
      aiUsage: 'AI usage: discovery'
    },
    {
      name: 'Starter',
      ctaHref: purchaseIntentHref('starter'),
      price: '€9 / month',
      priceSuffix: 'excl. VAT',
      bestFor: 'For occasional use.',
      modelAccess: ['Choose GPT, Claude or Mistral; Repero automatically manages the model in the family you choose.'],
      documentSpace: 'More document space than Free',
      aiUsage: 'AI usage: base',
      vatExample: '€10.89 incl. VAT in Belgium'
    },
    {
      name: 'Plus',
      ctaHref: purchaseIntentHref('plus'),
      price: '€19 / month',
      priceSuffix: 'excl. VAT',
      bestFor: 'For everyday use.',
      modelAccess: ['Automatic, by family or directly by model'],
      documentSpace: 'More comfortable document space',
      aiUsage: 'AI usage: about 2.5× Starter',
      vatExample: '€22.99 incl. VAT in Belgium'
    },
    {
      name: 'Pro',
      ctaHref: purchaseIntentHref('pro'),
      price: '€49 / month',
      priceSuffix: 'excl. VAT',
      bestFor: 'For professional use.',
      modelAccess: ['Automatic, by family or direct model selection', 'Access to available flagship models [1]'],
      documentSpace: 'Extended document space',
      aiUsage: 'AI usage: about 3× Plus',
      vatExample: '€59.29 incl. VAT in Belgium'
    }
  ]
};
