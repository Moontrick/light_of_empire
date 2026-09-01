import { useCallback, useEffect, useState } from 'react';
import { usePagesStore } from '@store/pagesStore';
import { useAuthStore } from '@store/authStore';
import { hasRoleAtLeast, UserRole } from '@/shared/types';
import type { PageStatus, PageTreeNodeDto } from '@/shared/api/pages';
import type { PageFormTarget } from '../types';

export function useStructureControl() {
  const tree = usePagesStore((state) => state.tree);
  const treeStatus = usePagesStore((state) => state.treeStatus);
  const fetchTree = usePagesStore((state) => state.fetchTree);
  const savingTree = usePagesStore((state) => state.savingTree);
  const updatePage = usePagesStore((state) => state.updatePage);
  const deletePage = usePagesStore((state) => state.deletePage);
  const reorderPages = usePagesStore((state) => state.reorderPages);
  const user = useAuthStore((state) => state.user);

  const [modal, setModal] = useState<PageFormTarget>({ open: false, node: null });

  // Всегда перезапрашиваем: под токеном админа дерево полнее публичного
  useEffect(() => {
    void fetchTree();
  }, [fetchTree]);

  // Бэк дополнительно проверяет роль сам — здесь только видимость UI
  const canMutate = hasRoleAtLeast(user?.role, UserRole.CURATOR);

  // Стабильные ссылки: closeModal попадает в deps эффекта загрузки формы —
  // пересоздание на каждый рендер перезапускало бы его и затирало правки пользователя
  const openCreate = useCallback(() => setModal({ open: true, node: null }), []);
  const openEdit = useCallback((node: PageTreeNodeDto) => setModal({ open: true, node }), []);
  const closeModal = useCallback(() => setModal({ open: false, node: null }), []);

  const changeStatus = (node: PageTreeNodeDto, status: PageStatus) =>
    void updatePage(node.id, { status });

  const remove = (node: PageTreeNodeDto) => void deletePage(node.id);

  const move = (node: PageTreeNodeDto, siblings: PageTreeNodeDto[], offset: number) => {
    const ids = siblings.map((item) => item.id);
    const index = ids.indexOf(node.id);
    const target = index + offset;
    if (target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    void reorderPages({ parent_id: node.parent_id, ids });
  };

  return {
    tree,
    treeStatus,
    savingTree,
    canMutate,
    modal,
    openCreate,
    openEdit,
    closeModal,
    changeStatus,
    remove,
    move,
    fetchTree,
  };
}
