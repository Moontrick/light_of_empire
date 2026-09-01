import { useEffect, useMemo } from 'react';
import { usePagesStore } from '@store/pagesStore';
import { useAuthStore } from '@store/authStore';
import { hasRoleAtLeast, UserRole } from '@/shared/types';
import type { DocEditorContextValue } from '@widgets/DocView';

export function usePageView(slug: string) {
  const page = usePagesStore((state) => state.page);
  const pageSlug = usePagesStore((state) => state.pageSlug);
  const pageStatus = usePagesStore((state) => state.pageStatus);
  const fetchPage = usePagesStore((state) => state.fetchPage);
  const user = useAuthStore((state) => state.user);

  const savePageWrapper = usePagesStore((state) => state.savePageWrapper);
  const createSection = usePagesStore((state) => state.createSection);
  const updateSection = usePagesStore((state) => state.updateSection);
  const deleteSection = usePagesStore((state) => state.deleteSection);
  const reorderSections = usePagesStore((state) => state.reorderSections);
  const savingWrapper = usePagesStore((state) => state.savingWrapper);
  const savingSectionId = usePagesStore((state) => state.savingSectionId);
  const creatingSection = usePagesStore((state) => state.creatingSection);
  const reordering = usePagesStore((state) => state.reordering);

  useEffect(() => {
    const state = usePagesStore.getState();
    if (state.pageSlug !== slug || state.pageStatus === 'idle') {
      void fetchPage(slug);
    }
  }, [slug, fetchPage]);

  // Бэк дополнительно проверяет роль сам — здесь только видимость UI
  const canEdit = hasRoleAtLeast(user?.role, UserRole.CURATOR);
  const showStatusBadge =
    hasRoleAtLeast(user?.role, UserRole.ADMIN) && Boolean(page) && page?.status !== 'PUBLISHED';

  const editor = useMemo<DocEditorContextValue>(
    () => ({
      ops: {
        saveWrapper: savePageWrapper,
        createSection,
        updateSection,
        deleteSection,
        reorderSections,
      },
      flags: { savingWrapper, savingSectionId, creatingSection, reordering },
    }),
    [
      savePageWrapper,
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

  const loading = pageStatus === 'idle' || pageStatus === 'loading' || pageSlug !== slug;
  // notFound должен относиться только к текущему slug — иначе залежавшийся
  // pageStatus чужой страницы триггерит notFound() раньше, чем отработает fetchPage
  const notFound = pageStatus === 'notFound' && pageSlug === slug;

  return { page, pageStatus, loading, notFound, canEdit, showStatusBadge, fetchPage, editor };
}
