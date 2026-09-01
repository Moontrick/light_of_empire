import { useState } from 'react';
import type { CharterBlock, DocSectionData } from '@/shared/types';
import { useDocEditor } from '../../../context';

export function useSectionEditor(section: DocSectionData | null, onClose: () => void) {
  const [title, setTitle] = useState(section?.title ?? '');
  const [slug, setSlug] = useState(section?.slug ?? '');
  const [blocks, setBlocks] = useState<CharterBlock[]>(section?.blocks ?? []);

  const { ops, flags } = useDocEditor();

  const saving = section ? flags.savingSectionId === section.id : flags.creatingSection;
  const canSave = title.trim().length > 0;

  const save = async () => {
    const trimmedSlug = slug.trim();
    const ok = section
      ? await ops.updateSection(section.id, {
        title: title.trim(),
        blocks,
        // slug шлём только если реально поменяли — иначе бэк не должен его трогать
        ...(trimmedSlug !== section.slug && trimmedSlug ? { slug: trimmedSlug } : {}),
      })
      : await ops.createSection({
        title: title.trim(),
        blocks,
        ...(trimmedSlug ? { slug: trimmedSlug } : {}),
      });
    if (ok) onClose();
  };

  return { title, setTitle, slug, setSlug, blocks, setBlocks, saving, canSave, save };
}
