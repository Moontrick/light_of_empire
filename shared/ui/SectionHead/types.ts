export interface SectionHeadLink {
  href: string;
  label: string;
}

export interface SectionHeadProps {
  // Корень хлебных крошек («ДОКУМЕНТЫ / …»)
  eyebrow: string;
  title: string;
  text?: string;
  link?: SectionHeadLink;
}
