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
}

export interface FooterColumnProps {
  column: FooterColumnData;
}
