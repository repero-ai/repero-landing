export type PricingLanguage = 'en' | 'fr';

export interface PricingPlan {
  name: string;
  price: string;
  priceSuffix?: string;
  bestFor: string;
  highlights: string[];
  modelAccess: string;
  aiUsage: string;
  vatExample?: string;
  usageNote?: string;
}

export const pricingPlans: Record<PricingLanguage, PricingPlan[]> = {
  fr: [
    {
      name: 'Free',
      price: '0 €',
      bestFor: 'Pour découvrir Repero et poser quelques questions.',
      highlights: ['Mode automatique uniquement', 'Espace documentaire limité'],
      modelAccess: 'Automatique uniquement',
      aiUsage: 'Usage IA : découverte'
    },
    {
      name: 'Starter',
      price: '9 € / mois',
      priceSuffix: 'HTVA',
      bestFor: 'Pour une utilisation occasionnelle.',
      highlights: ['Choisissez GPT, Claude ou Mistral ; Repero gère automatiquement le modèle dans la famille choisie.', 'Plus d’espace documentaire que Free'],
      modelAccess: 'GPT, Claude ou Mistral ; sélection automatique dans la famille choisie',
      aiUsage: 'Usage IA : base',
      vatExample: '10,89 € TVAC en Belgique'
    },
    {
      name: 'Plus',
      price: '19 € / mois',
      priceSuffix: 'HTVA',
      bestFor: 'Pour un usage quotidien.',
      highlights: ['Choisissez votre niveau de contrôle : automatique, par famille ou directement par modèle.', 'Espace documentaire plus confortable'],
      modelAccess: 'Automatique, par famille ou directement par modèle',
      aiUsage: 'Usage IA : environ 1,5× Starter',
      vatExample: '22,99 € TVAC en Belgique'
    },
    {
      name: 'Pro',
      price: '49 € / mois',
      priceSuffix: 'HTVA',
      bestFor: 'Pour un usage professionnel.',
      highlights: ['Les mêmes niveaux de contrôle que Plus', 'Accès aux modèles de pointe disponibles', 'Espace documentaire étendu'],
      modelAccess: 'Automatique, par famille ou directement par modèle, avec modèles de pointe disponibles',
      aiUsage: 'Usage IA : environ 2,5× Plus',
      vatExample: '59,29 € TVAC en Belgique',
      usageNote: 'Les modèles les plus avancés consomment davantage de votre enveloppe incluse.'
    }
  ],
  en: [
    {
      name: 'Free',
      price: '€0',
      bestFor: 'For discovering Repero and asking a few questions.',
      highlights: ['Automatic mode only', 'Limited document space'],
      modelAccess: 'Automatic only',
      aiUsage: 'AI usage: discovery'
    },
    {
      name: 'Starter',
      price: '€9 / month',
      priceSuffix: 'excl. VAT',
      bestFor: 'For occasional use.',
      highlights: ['Choose GPT, Claude or Mistral; Repero automatically manages the model in the family you choose.', 'More document space than Free'],
      modelAccess: 'GPT, Claude or Mistral; automatic selection within the chosen family',
      aiUsage: 'AI usage: base',
      vatExample: '€10.89 incl. VAT in Belgium'
    },
    {
      name: 'Plus',
      price: '€19 / month',
      priceSuffix: 'excl. VAT',
      bestFor: 'For everyday use.',
      highlights: ['Choose your level of control: automatic, by family or directly by model.', 'More comfortable document space'],
      modelAccess: 'Automatic, by family or directly by model',
      aiUsage: 'AI usage: about 1.5× Starter',
      vatExample: '€22.99 incl. VAT in Belgium'
    },
    {
      name: 'Pro',
      price: '€49 / month',
      priceSuffix: 'excl. VAT',
      bestFor: 'For professional use.',
      highlights: ['The same control levels as Plus', 'Access to available flagship models', 'Extended document space'],
      modelAccess: 'Automatic, by family or directly by model, with available flagship models',
      aiUsage: 'AI usage: about 2.5× Plus',
      vatExample: '€59.29 incl. VAT in Belgium',
      usageNote: 'The most advanced models use more of your included usage allowance.'
    }
  ]
};
