import manifest from '../data/features.json';

export type FeatureStatus = 'live' | 'beta' | 'planned' | 'deprecated';

export interface FeatureCategory {
  id: string;
  name: string;
  tagline: string;
  displayOrder: number;
}

export interface Feature {
  id: string;
  name: string;
  category: string;
  status: FeatureStatus;
  versionIntroduced?: string;
  plannedVersion?: string;
  description: string;
  marketingCopy: string;
  icon: string;
  screenshot?: string;
}

interface RawManifest {
  categories: FeatureCategory[];
  features: Feature[];
}

const data = manifest as unknown as RawManifest;

export const categories: FeatureCategory[] = [...data.categories].sort(
  (a, b) => a.displayOrder - b.displayOrder,
);

export const features: Feature[] = data.features;

export function getCategory(id: string): FeatureCategory | undefined {
  return categories.find((c) => c.id === id);
}

export function featuresByCategory(): Array<{ category: FeatureCategory; items: Feature[] }> {
  return categories.map((category) => ({
    category,
    items: features.filter((f) => f.category === category.id),
  }));
}

export function liveAndBeta(): Feature[] {
  return features.filter((f) => f.status === 'live' || f.status === 'beta');
}

export function planned(): Feature[] {
  return features.filter((f) => f.status === 'planned');
}

export function statusLabel(status: FeatureStatus): string {
  switch (status) {
    case 'live':
      return 'Shipped';
    case 'beta':
      return 'Beta';
    case 'planned':
      return 'Coming soon';
    case 'deprecated':
      return 'Sunset';
  }
}
