export enum NewsStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export interface NewsParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface NewsHeadingBlock {
  type: 'heading';
  text: string;
}

export interface NewsQuoteBlock {
  type: 'quote';
  text: string;
  author?: string;
}

export interface NewsMemberBlock {
  type: 'member';
  name: string;
  role: string;
}

export interface NewsListBlock {
  type: 'list';
  title?: string;
  items: string[];
}

// src — относительный url из POST /image-service (/api/v1/image-service/<file>) или внешняя
// ссылка; data-URL остался только в старых записях. Перед <img> — resolveImageSrc
export interface NewsImageBlock {
  type: 'image';
  src: string;
  alt?: string;
  caption?: string;
}

export type NewsBlock =
  | NewsParagraphBlock
  | NewsHeadingBlock
  | NewsQuoteBlock
  | NewsMemberBlock
  | NewsListBlock
  | NewsImageBlock;

// View-model для UI: даты отформатированы, imageUrl абсолютный
export interface NewsPost {
  id: number;
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  smallBody: string;
  imageUrl: string | null;
  readingTime: string;
  status: NewsStatus;
  isoDate: string;
  date: string;
  publishedAt: string | null;
  createdAt: string;
  changedAt: string;
  isSendToDiscord: boolean;
}

export interface NewsPostDetail extends NewsPost {
  lead: string | null;
  body: NewsBlock[];
}
