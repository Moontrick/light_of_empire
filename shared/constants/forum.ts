import { ForumThreadStatus } from '@/shared/types';
import type { CharterBlock, ForumThreadSort } from '@/shared/types';

export const FORUM_THREAD_TITLE_MIN = 3;
export const FORUM_THREAD_TITLE_MAX = 200;
export const FORUM_REASON_MAX = 500;
export const FORUM_THREAD_TAGS_MAX = 10;
export const FORUM_THREAD_IMAGES_MAX = 30;
export const FORUM_POST_IMAGES_MAX = 10;
export const FORUM_PAGE_LIMIT = 20;
export const FORUM_SEARCH_DEBOUNCE_MS = 400;

export const FORUM_DELETED_USER_LABEL = 'Удалённый пользователь';

export const THREAD_STATUS_LABELS: Record<ForumThreadStatus, string> = {
  [ForumThreadStatus.OPEN]: 'Открыта',
  [ForumThreadStatus.CLOSED]: 'Закрыта',
  [ForumThreadStatus.LOCKED]: 'Заблокирована',
  [ForumThreadStatus.DELETED]: 'Удалена',
};

export const FORUM_SORT_OPTIONS: { value: ForumThreadSort; label: string }[] = [
  { value: 'activity', label: 'По активности' },
  { value: 'created', label: 'По дате создания' },
];

// «Правила» с категориями наказаний — только для Устава
export const FORUM_EDITOR_KINDS: CharterBlock['kind'][] = [
  'text',
  'subheading',
  'list',
  'note',
  'image',
  'link',
];
