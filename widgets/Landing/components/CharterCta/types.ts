export type CtaVariant = 'primary' | 'default';

export interface CtaCardData {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  ctaLabel: string;
  // Кадр внутри плитки; без него рисуется имперская эмблема на сером
  image?: string;
  external?: boolean;
  variant?: CtaVariant;
  discord?: boolean;
}

export interface CtaCardProps {
  card: CtaCardData;
}
