import type { CharterBlock } from './charter';
import type { DirectoryEntry, UserRole } from './user';

export enum ForumThreadStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  LOCKED = 'LOCKED',
  DELETED = 'DELETED',
}

export enum ForumPostStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}

export type ForumThreadSort = 'activity' | 'created';

// Формирование/должность у автора и тега приходят без description
export type ForumDirectoryRef = Pick<DirectoryEntry, 'id' | 'name' | 'color' | 'styles'>;

// Публичный автор темы/комментария — без email. null — пользователь удалён
export interface ForumAuthor {
  id: number;
  login: string;
  avatar_url: string | null;
  role: UserRole;
  formation: ForumDirectoryRef | null;
  position: ForumDirectoryRef | null;
}

export interface ForumCategoryLastThread {
  id: number;
  title: string;
  last_post_at: string | null;
  created_at: string;
}

export interface ForumCategory {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  seq_number: number;
  is_archived: boolean;
  threads_count: number;
  last_thread: ForumCategoryLastThread | null;
  created_at: string;
  changed_at: string;
}

export interface ForumCategoryRef {
  id: number;
  slug: string;
  name: string;
}

export interface ForumTag {
  id: number;
  name: string;
  color: string | null;
  formation: ForumDirectoryRef | null;
}

export interface ForumThreadListItem {
  id: number;
  title: string;
  status: ForumThreadStatus;
  is_pinned: boolean;
  author: ForumAuthor | null;
  category: ForumCategoryRef;
  tags: ForumTag[];
  posts_count: number;
  last_post_at: string | null;
  last_post_author: ForumAuthor | null;
  edited_at: string | null;
  created_at: string;
}

export interface ForumThread extends ForumThreadListItem {
  blocks: CharterBlock[];
  status_reason: string | null;
  status_changed_by: ForumAuthor | null;
  status_changed_at: string | null;
}

export interface ForumReplyTo {
  id: number;
  author: ForumAuthor | null;
  // null — у цели нет текста или она удалена
  excerpt: string | null;
}

export interface ForumPost {
  id: number;
  author: ForumAuthor | null;
  // У удалённого комментария всегда []
  blocks: CharterBlock[];
  status: ForumPostStatus;
  reply_to: ForumReplyTo | null;
  edited_at: string | null;
  created_at: string;
  // Только для ADMIN+; у остальных ключей нет вовсе
  deleted_by?: ForumAuthor | null;
  deleted_at?: string | null;
}
