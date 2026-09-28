import type { ForumCategory, ForumTag } from '@/shared/types';

export type ForumAdminTab = 'categories' | 'tags';

// 'new' — модалка создания; сущность — модалка правки
export type EditingCategory = ForumCategory | 'new' | null;
export type EditingTag = ForumTag | 'new' | null;
