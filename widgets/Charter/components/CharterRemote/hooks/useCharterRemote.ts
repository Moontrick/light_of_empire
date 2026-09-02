import { useEffect, useMemo, useState } from 'react';
import { useCharterStore } from '@store/charterStore';
import { useAuthStore } from '@store/authStore';
import { hasRoleAtLeast, UserRole } from '@/shared/types';
import type { DocEditorContextValue } from '@widgets/DocView';

export function useCharterRemote() {
  const charter = useCharterStore((state) => state.charter);
  const status = useCharterStore((state) => state.status);
  const fetchCharter = useCharterStore((state) => state.fetchCharter);
  const user = useAuthStore((state) => state.user);

  const saveWrapper = useCharterStore((state) => state.saveWrapper);
  const createSection = useCharterStore((state) => state.createSection);
  const updateSection = useCharterStore((state) => state.updateSection);
  const deleteSection = useCharterStore((state) => state.deleteSection);
  const reorderSections = useCharterStore((state) => state.reorderSections);
  const savingWrapper = useCharterStore((state) => state.savingWrapper);
  const savingSectionId = useCharterStore((state) => state.savingSectionId);
  const creatingSection = useCharterStore((state) => state.creatingSection);
  const reordering = useCharterStore((state) => state.reordering);

  // Модалка нужна и в пустом состоянии, когда DocView ещё не отрендерен
  const [wrapperOpen, setWrapperOpen] = useState(false);

  useEffect(() => {
    if (useCharterStore.getState().status === 'idle') {
      void fetchCharter();
    }
  }, [fetchCharter]);

  // Бэк дополнительно проверяет роль сам — здесь только видимость UI
  const canEdit = hasRoleAtLeast(user?.role, UserRole.CURATOR);

  const editor = useMemo<DocEditorContextValue>(
    () => ({
      ops: { saveWrapper, createSection, updateSection, deleteSection, reorderSections },
      flags: { savingWrapper, savingSectionId, creatingSection, reordering },
    }),
    [
      saveWrapper,
      createSection,
      updateSection,
      deleteSection,
      reorderSections,
      savingWrapper,
      savingSectionId,
      creatingSection,
      reordering,
    ],
  );

  return {
    charter,
    status,
    canEdit,
    fetchCharter,
    editor,
    wrapperOpen,
    openWrapper: () => setWrapperOpen(true),
    closeWrapper: () => setWrapperOpen(false),
  };
}
