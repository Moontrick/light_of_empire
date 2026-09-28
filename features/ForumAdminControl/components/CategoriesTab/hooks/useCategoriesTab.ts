import { useState } from 'react';
import { useForumStore } from '@store/forumStore';
import type { ForumCategory } from '@/shared/types';
import type { EditingCategory } from '../../../types';

export function useCategoriesTab() {
  const {
    categories,
    categoriesStatus,
    mutating,
    fetchCategories,
    reorderCategories,
    updateCategory,
    deleteCategory,
  } = useForumStore();
  const [editing, setEditing] = useState<EditingCategory>(null);

  const move = (from: number, to: number) => {
    const ids = categories.map((category) => category.id);
    const [id] = ids.splice(from, 1);
    ids.splice(to, 0, id);
    return reorderCategories(ids);
  };

  return {
    categories,
    // Список мог прийти с публичных страниц — скелетон только пока он пуст
    loading: (categoriesStatus === 'idle' || categoriesStatus === 'loading') && categories.length === 0,
    loadError: categoriesStatus === 'error' && categories.length === 0,
    retry: () => fetchCategories(true),
    // Пока идёт принудительное перечитывание, мутации заблокированы: ответ перезаписал бы список
    mutating: mutating || categoriesStatus === 'loading',
    editing,
    openCreate: () => setEditing('new'),
    openEdit: (category: ForumCategory) => setEditing(category),
    closeEdit: () => setEditing(null),
    moveUp: (index: number) => move(index, index - 1),
    moveDown: (index: number) => move(index, index + 1),
    toggleArchive: (category: ForumCategory) =>
      updateCategory(category.id, { is_archived: !category.is_archived }),
    remove: (category: ForumCategory) => deleteCategory(category.id),
  };
}
