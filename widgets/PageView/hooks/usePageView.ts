import { useEffect, useMemo } from 'react';
import { usePagesStore } from '@store/pagesStore';
import { useAuthStore } from '@store/authStore';
import { hasRoleAtLeast, UserRole } from '@/shared/types';
import { findTreeNode, publishedNodes } from '@/shared/utils/pagesTree';
import type { DocEditorContextValue } from '@widgets/DocView';
import type { ChildPageItem } from '../components/ChildPagesHub';

export function usePageView(slug: string) {
  const page = usePagesStore((state) => state.page);
  const pageSlug = usePagesStore((state) => state.pageSlug);
  const pageStatus = usePagesStore((state) => state.pageStatus);
  const fetchPage = usePagesStore((state) => state.fetchPage);
  const user = useAuthStore((state) => state.user);

  const tree = usePagesStore((state) => state.tree);
  const treeStatus = usePagesStore((state) => state.treeStatus);
  const fetchTree = usePagesStore((state) => state.fetchTree);
  const summaries = usePagesStore((state) => state.summaries);
  const fetchSummaries = usePagesStore((state) => state.fetchSummaries);

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

  useEffect(() => {
    if (usePagesStore.getState().treeStatus === 'idle') {
      void fetchTree();
    }
  }, [fetchTree]);

  const childNodes = useMemo(() => {
    if (treeStatus !== 'ready') return [];
    const node = findTreeNode(tree, slug);
    return node ? publishedNodes(node.children) : [];
  }, [tree, treeStatus, slug]);

  useEffect(() => {
    if (childNodes.length > 0) {
      void fetchSummaries(childNodes.map((node) => node.slug));
    }
  }, [childNodes, fetchSummaries]);

  const childPages = useMemo<ChildPageItem[]>(
    () =>
      childNodes.map((node) => ({
        slug: node.slug,
        title: node.name,
        description: summaries[node.slug]?.intro ?? '',
        loading: !(node.slug in summaries),
      })),
    [childNodes, summaries],
  );

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

  return {
    page,
    pageStatus,
    loading,
    notFound,
    canEdit,
    showStatusBadge,
    fetchPage,
    editor,
    childPages,
  };
}
