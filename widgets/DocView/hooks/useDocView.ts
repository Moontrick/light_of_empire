import { useState } from 'react';

export function useDocView() {
  const [editMode, setEditMode] = useState(false);
  const [wrapperOpen, setWrapperOpen] = useState(false);
  const [editingSectionSlug, setEditingSectionSlug] = useState<string | null>(null);
  const [addingSection, setAddingSection] = useState(false);

  const toggleEditMode = () =>
    setEditMode((prev) => {
      const next = !prev;
      if (!next) {
        setWrapperOpen(false);
        setEditingSectionSlug(null);
        setAddingSection(false);
      }
      return next;
    });

  return {
    editMode,
    toggleEditMode,
    wrapperOpen,
    openWrapper: () => setWrapperOpen(true),
    closeWrapper: () => setWrapperOpen(false),
    editingSectionSlug,
    startEditSection: (slug: string) => setEditingSectionSlug(slug),
    stopEditSection: () => setEditingSectionSlug(null),
    addingSection,
    startAddSection: () => setAddingSection(true),
    stopAddSection: () => setAddingSection(false),
  };
}
