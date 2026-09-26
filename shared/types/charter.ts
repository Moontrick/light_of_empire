export type PenaltyCategory = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface CharterRule {
  code: string;
  text: string;
  penalty?: string;
  category?: PenaltyCategory;
  children?: CharterRule[];
}

export type CharterBlock =
  | { kind: 'text'; text: string }
  | { kind: 'list'; ordered?: boolean; items: string[] }
  | { kind: 'subheading'; text: string }
  | { kind: 'note'; title?: string; text?: string; items?: string[] }
  | { kind: 'rules'; items: CharterRule[] }
  // src — относительный url из POST /image-service или внешняя ссылка (data-URL — только
  // в старых записях); перед <img> — resolveImageSrc
  | { kind: 'image'; src: string; alt?: string; caption?: string };

// slug — стабильный якорь секции (#slug); числовой id есть только у данных с бэка
export interface CharterSectionData {
  slug: string;
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
