import type { NewsBlock, NewsStatus } from './news';

export interface CombatOperation {
  id: number;
  slug: string;
  title: string;
  tag: string;
  smallBody: string;
  imageUrl: string | null;
  status: NewsStatus;
  isoDate: string;
  date: string;
  publishedAt: string | null;
  createdAt: string;
  changedAt: string;
  isSendToDiscord: boolean;
}

export interface CombatOperationDetail extends CombatOperation {
  body: NewsBlock[];
}
