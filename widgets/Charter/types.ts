export interface CharterRule {
  code: string;
  text: string;
  penalty?: string;
  children?: CharterRule[];
}

export type CharterBlock =
  | { kind: 'text'; text: string }
  | { kind: 'list'; ordered?: boolean; items: string[] }
  | { kind: 'subheading'; text: string }
  | { kind: 'note'; title?: string; text?: string; items?: string[] }
  | { kind: 'rules'; items: CharterRule[] };

export interface CharterSectionData {
  id: string;
  title: string;
  blocks: CharterBlock[];
}

export interface CharterContent {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  sections: CharterSectionData[];
  footer: string;
  searchPlaceholder?: string;
}

export interface CharterProps {
  content?: CharterContent;
}
