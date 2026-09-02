import type { DocContent } from '@/shared/types';
import type { PageStatus, PageTreeNodeDto } from '@/shared/api/pages';

export type PagesTreeStatus = 'idle' | 'loading' | 'ready' | 'error';

export type PageViewStatus = 'idle' | 'loading' | 'ready' | 'notFound' | 'error';

export interface PageSummary {
  eyebrow: string;
  title: string;
  intro: string;
}

export interface PageDocument extends DocContent {
  id: number;
  slug: string;
  name: string;
  status: PageStatus;
}

export interface PagesState {
  tree: PageTreeNodeDto[];
  treeStatus: PagesTreeStatus;
  page: PageDocument | null;
  pageSlug: string | null;
  pageStatus: PageViewStatus;
  savingWrapper: boolean;
  savingSectionId: number | null;
  creatingSection: boolean;
  reordering: boolean;
  savingTree: boolean;
  // slug → hero страницы для карточек; null — не загрузилась; нет ключа — ещё не запрашивали
  summaries: Record<string, PageSummary | null>;
}
