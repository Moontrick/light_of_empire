import type { ComponentType } from 'react';
import type { SvgTypesProps } from '@/shared/types/SvgTypes';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumnData {
  title: string;
  links: FooterLink[];
}

export interface FooterSocial {
  label: string;
  href: string;
  icon: ComponentType<SvgTypesProps & { className?: string }>;
  external?: boolean;
}

export interface FooterColumnProps {
  column: FooterColumnData;
}
