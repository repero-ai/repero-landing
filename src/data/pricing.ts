export type PricingLanguage = 'en' | 'fr';

export interface PricingPlan {
  name: string;
  price: string;
  bestFor: string;
  highlights: string[];
  modelAccess: string;
  usageNote?: string;
}

export const pricingPlans: Record<PricingLanguage, PricingPlan[]> = {
  fr: [
    {
      name: 'Free',
      price: '0 €',
      bestFor: 'Pour découvrir Repero et poser quelques questions.',
      highlights: ['Mode automatique uniquement', 'Espace documentaire limité'],
      modelAccess: 'Automatique uniquement'
    },
    {
      name: 'Starter',
      price: '9 € / mois HTVA',
      bestFor: 'Pour une utilisation occasionnelle.',
      highlights: ['Choisissez GPT, Claude ou Mistral ; Repero sélectionne automatiquement le modèle adapté dans la famille choisie.', 'Plus d’espace documentaire que Free'],
      modelAccess: 'GPT, Claude ou Mistral ; sélection automatique dans la famille choisie'
    },
    {
      name: 'Plus',
      price: '19 € / mois HTVA',
      bestFor: 'Pour un usage quotidien.',
      highlights: ['Choisissez votre niveau de contrôle : automatique, par famille ou directement par modèle.'],
      modelAccess: 'Automatique, par famille ou directement par modèle'
    },
    {
      name: 'Pro',
      price: '49 € / mois HTVA',
      bestFor: 'Pour un usage professionnel.',
      highlights: ['Les mêmes niveaux de contrôle que Plus', 'Accès aux modèles de pointe disponibles'],
      modelAccess: 'Automatique, par famille ou directement par modèle, avec modèles de pointe disponibles',
      usageNote: 'Les modèles les plus avancés consomment davantage de votre enveloppe incluse.'
    }
  ],
  en: [
    {
      name: 'Free',
      price: '€0',
      bestFor: 'For discovering Repero and asking a few questions.',
      highlights: ['Automatic mode only', 'Limited document space'],
      modelAccess: 'Automatic only'
    },
    {
      name: 'Starter',
      price: '€9 / month excl. VAT',
      bestFor: 'For occasional use.',
      highlights: ['Choose GPT, Claude or Mistral; Repero automatically selects the right model within the family you choose.', 'More document space than Free'],
      modelAccess: 'GPT, Claude or Mistral; automatic selection within the chosen family'
    },
    {
      name: 'Plus',
      price: '€19 / month excl. VAT',
      bestFor: 'For everyday use.',
      highlights: ['Choose your level of control: automatic, by family or directly by model.'],
      modelAccess: 'Automatic, by family or directly by model'
    },
    {
      name: 'Pro',
      price: '€49 / month excl. VAT',
      bestFor: 'For professional use.',
      highlights: ['The same control levels as Plus', 'Access to available flagship models'],
      modelAccess: 'Automatic, by family or directly by model, with available flagship models',
      usageNote: 'The most advanced models use more of your included usage allowance.'
    }
  ]
};
