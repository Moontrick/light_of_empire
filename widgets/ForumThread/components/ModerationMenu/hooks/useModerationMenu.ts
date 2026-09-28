'use client';

import { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { useRouter } from '@/shared/i18n/navigation';
import { useForumStore } from '@store/forumStore';
import { ForumThreadStatus } from '@/shared/types';
import type { ModerationMenuProps, ModerationModal } from '../types';

export function useModerationMenu({ thread, permissions }: ModerationMenuProps) {
  const {
    changeThreadStatus, moderateThread, mutating,
    categories, fetchCategories, tags, fetchTags,
  } = useForumStore();
  const router = useRouter();
  const [modal, setModal] = useState<ModerationModal>(null);
  const closeModal = () => setModal(null);

  useEffect(() => {
    if (!permissions.canModerate) return;
    void fetchCategories();
    void fetchTags();
  }, [permissions.canModerate, fetchCategories, fetchTags]);

  const setStatus = (status: ForumThreadStatus, reason?: string) =>
    changeThreadStatus(thread.id, reason ? { status, reason } : { status });

  const lock = async (reason: string) => {
    const ok = await setStatus(ForumThreadStatus.LOCKED, reason);
    if (ok) closeModal();
  };

  const move = async (categoryId: number) => {
    const ok = await moderateThread(thread.id, { category_id: categoryId });
    if (ok) closeModal();
  };

  const saveTags = async (tagIds: number[]) => {
    const ok = await moderateThread(thread.id, { tag_ids: tagIds });
    if (ok) closeModal();
  };

  type MenuItem = NonNullable<MenuProps['items']>[number];
  const candidates: (MenuItem | false)[] = [
    permissions.canEdit && {
      key: 'edit',
      label: 'Править',
      onClick: () => router.push(`/forum/threads/${thread.id}/edit`),
    },
    permissions.canClose && {
      key: 'close',
      label: 'Закрыть тему',
      onClick: () => void setStatus(ForumThreadStatus.CLOSED),
    },
    permissions.canReopen && {
      key: 'reopen',
      label: 'Открыть тему',
      onClick: () => void setStatus(ForumThreadStatus.OPEN),
    },
    permissions.canLock && { key: 'lock', label: 'Заблокировать', onClick: () => setModal('lock') },
    permissions.canUnlock && {
      key: 'unlock',
      label: 'Снять блокировку',
      onClick: () => void setStatus(ForumThreadStatus.OPEN),
    },
    permissions.canRestore && {
      key: 'restore',
      label: 'Восстановить',
      onClick: () => void setStatus(ForumThreadStatus.OPEN),
    },
    permissions.canModerate && { type: 'divider' as const },
    permissions.canModerate && {
      key: 'pin',
      label: thread.is_pinned ? 'Открепить' : 'Закрепить',
      onClick: () => void moderateThread(thread.id, { is_pinned: !thread.is_pinned }),
    },
    permissions.canModerate && { key: 'move', label: 'Перенести в раздел', onClick: () => setModal('move') },
    permissions.canModerate && { key: 'tags', label: 'Теги', onClick: () => setModal('tags') },
    permissions.canDelete && { type: 'divider' as const },
    permissions.canDelete && {
      key: 'delete',
      label: 'Удалить тему',
      danger: true,
      onClick: () => setModal('delete'),
    },
  ];
  const items = candidates.filter((item): item is MenuItem => Boolean(item));

  const remove = async () => {
    const ok = await setStatus(ForumThreadStatus.DELETED);
    if (!ok) return;
    // Автору удалённая тема больше не видна — уводим в раздел
    if (!permissions.canModerate) router.replace(`/forum/${thread.category.slug}`);
    else closeModal();
  };

  return {
    items,
    hasItems: items.some((item) => item != null && (!('type' in item) || item.type !== 'divider')),
    mutating,
    modal,
    closeModal,
    lock,
    move,
    saveTags,
    remove,
    // Архивные разделы бэк не принимает при переносе
    categoryOptions: categories.filter((c) => !c.is_archived && c.id !== thread.category.id),
    tagOptions: tags,
  };
}
