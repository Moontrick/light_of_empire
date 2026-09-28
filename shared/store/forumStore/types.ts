import type {
  ForumCategory,
  ForumPost,
  ForumTag,
  ForumThread,
  ForumThreadListItem,
  ForumThreadSort,
} from '@/shared/types';

export type ForumLoadStatus = 'idle' | 'loading' | 'ready' | 'error';
export type ForumListStatus = 'idle' | 'loading' | 'loadingMore' | 'ready' | 'error';
export type ForumDetailStatus = 'idle' | 'loading' | 'ready' | 'notFound' | 'error';

export interface ForumThreadsFilters {
  category: string;
  tag?: number;
  q?: string;
  sort: ForumThreadSort;
}

export interface ForumState {
  categories: ForumCategory[];
  categoriesStatus: ForumLoadStatus;
  tags: ForumTag[];
  tagsStatus: ForumLoadStatus;

  threads: ForumThreadListItem[];
  threadsTotal: number;
  threadsPage: number;
  threadsFilters: ForumThreadsFilters | null;
  threadsStatus: ForumListStatus;

  thread: ForumThread | null;
  threadStatus: ForumDetailStatus;
  posts: ForumPost[];
  postsTotal: number;
  postsPage: number;
  postsStatus: ForumListStatus;

  // Идёт любая мутация (тема, комментарий, раздел, тег) — кнопки блокируются
  mutating: boolean;

  // Счётчик запросов темы: ответы устаревших/сброшенных запросов игнорируются
  threadRequestId: number;
}
