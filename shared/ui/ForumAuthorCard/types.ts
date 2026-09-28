import type { ReactNode } from 'react';
import type { ForumAuthor } from '@/shared/types';

export interface ForumAuthorCardProps {
  author: ForumAuthor | null;
  // sm — строка в списке тем (без формирования/должности), md — шапка темы и комментарий
  size?: 'sm' | 'md';
  // Строка под логином: дата, «изменено» и т.п.
  meta?: ReactNode;
}
