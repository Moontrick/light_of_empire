export interface ChronicleImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ChronicleVideo {
  url: string;
  title: string;
}

export type ChronicleContentBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'image'; image: ChronicleImage };

export interface ChronicleEntryData {
  id: string;
  author: string;
  date: string;
  title?: string;
  blocks: ChronicleContentBlock[];
  video?: ChronicleVideo;
}

export interface ChronicleIntroSection {
  title: string;
  paragraphs: string[];
  items?: string[];
  video?: ChronicleVideo;
}

export interface ChronicleContent {
  hero: { eyebrow: string; title: string; intro: string };
  intro: ChronicleIntroSection[];
  entries: ChronicleEntryData[];
}
