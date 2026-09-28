import type {
  CharterBlock,
  ForumCategory,
  ForumPost,
  ForumThread,
  ForumThreadSort,
  ForumThreadStatus,
  PaginatedResponse,
} from '@/shared/types';

export interface ForumThreadsParams {
  // slug раздела
  category?: string;
  // id тега
  tag?: number;
  q?: string;
  sort?: ForumThreadSort;
  page?: number;
  limit?: number;
}

export interface ForumPostsParams {
  page?: number;
  limit?: number;
}

// GET /forum/threads/:id — тема плюс первая страница комментариев
export type ForumThreadDetailDto = ForumThread & { posts: PaginatedResponse<ForumPost> };

export interface CreateForumThreadDto {
  title: string;
  category_id: number;
  blocks: CharterBlock[];
  tag_ids?: number[];
}

// Хотя бы одно поле обязательно, иначе 422 Nothing to update
export interface UpdateForumThreadDto {
  title?: string;
  blocks?: CharterBlock[];
}

export interface ChangeForumThreadStatusDto {
  status: ForumThreadStatus;
  reason?: string;
}

// Хотя бы одно поле обязательно; tag_ids — полная замена набора
export interface ModerateForumThreadDto {
  is_pinned?: boolean;
  category_id?: number;
  tag_ids?: number[];
}

export interface CreateForumPostDto {
  blocks: CharterBlock[];
  reply_to_id?: number;
}

export interface UpdateForumPostDto {
  blocks: CharterBlock[];
}

export interface CreateForumCategoryDto {
  name: string;
  description?: string;
}

// description: null — очистить; name/is_archived null бэк не принимает (422)
export interface UpdateForumCategoryDto {
  name?: string;
  description?: string | null;
  is_archived?: boolean;
}

// Все id разделов ровно по разу, иначе 400
export interface ReorderForumCategoriesDto {
  ids: number[];
}

// Ответ POST/PUT раздела без счётчиков — их дополняет стор
export type ForumCategoryWriteDto = Omit<ForumCategory, 'threads_count' | 'last_thread'>;

export interface CreateForumTagDto {
  name: string;
  color?: string;
  formation_id?: number;
}

// color: null / formation_id: null — очистить поле
export interface UpdateForumTagDto {
  name?: string;
  color?: string | null;
  formation_id?: number | null;
}
