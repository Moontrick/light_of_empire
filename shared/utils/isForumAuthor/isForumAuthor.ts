import type { ForumAuthor, UserProfile } from '@/shared/types';

// Временно по login: GET /auth/me не отдаёт id, а ForumAuthor не отдаёт email.
// Когда бэк добавит id в профиль — сравнивать author.id === user.id здесь
export function isForumAuthor(
  author: ForumAuthor | null | undefined,
  user: UserProfile | null,
): boolean {
  return Boolean(author && user && author.login === user.login);
}
