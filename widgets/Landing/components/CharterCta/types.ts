export type CtaVariant = 'primary' | 'default';

export interface CtaCardData {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  ctaLabel: string;
  external?: boolean;
  variant?: CtaVariant;
  discord?: boolean;
}

export interface CtaCardProps {
  card: CtaCardData;
}
