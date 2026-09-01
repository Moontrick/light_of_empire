import type { NewsPost, NewsPostDetail } from '@/shared/types';

export type NewsFeedStatus = 'idle' | 'loading' | 'loadingMore' | 'ready' | 'error';
export type NewsArticleStatus = 'idle' | 'loading' | 'ready' | 'notFound' | 'error';

export interface NewsState {
  posts: NewsPost[];
  total: number;
  page: number;
  feedStatus: NewsFeedStatus;
  article: NewsPostDetail | null;
  articleStatus: NewsArticleStatus;
}
