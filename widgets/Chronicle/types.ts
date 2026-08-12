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
  era: string;
  campaignDay: number;
  title: string;
  // ISO-дата реальной публикации: в вёрстку не выводится, уходит только
  // в атрибут <time dateTime> для поисковиков и читалок.
  publishedAt?: string;
  blocks: ChronicleContentBlock[];
  video?: ChronicleVideo;
}

export interface ChronicleMilestoneData {
  id: string;
  location: string;
  text: string;
}

export type ChronicleNode =
  | ({ kind: 'entry' } & ChronicleEntryData)
  | ({ kind: 'milestone' } & ChronicleMilestoneData);

export interface ChronicleIntroSection {
  title: string;
  paragraphs: string[];
  items?: string[];
  video?: ChronicleVideo;
}

export interface ChronicleContent {
  hero: { eyebrow: string; title: string; intro: string };
  intro: ChronicleIntroSection[];
  nodes: ChronicleNode[];
}
