import { useState } from 'react';
import { useForumStore } from '@store/forumStore';
import type { ForumTag } from '@/shared/types';
import type { EditingTag } from '../../../types';

export function useTagsTab() {
  const { tags, tagsStatus, mutating, fetchTags, deleteTag } = useForumStore();
  const [editing, setEditing] = useState<EditingTag>(null);

  return {
    tags,
    loading: (tagsStatus === 'idle' || tagsStatus === 'loading') && tags.length === 0,
    loadError: tagsStatus === 'error' && tags.length === 0,
    retry: () => fetchTags(true),
    // Пока идёт принудительное перечитывание, мутации заблокированы: ответ перезаписал бы список
    mutating: mutating || tagsStatus === 'loading',
    editing,
    openCreate: () => setEditing('new'),
    openEdit: (tag: ForumTag) => setEditing(tag),
    closeEdit: () => setEditing(null),
    remove: (tag: ForumTag) => deleteTag(tag.id),
  };
}
