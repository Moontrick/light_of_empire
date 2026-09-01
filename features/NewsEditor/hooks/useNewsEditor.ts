'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/shared/i18n/navigation';
import type { CreateNewsDto } from '@/shared/api/news';
import { useNewsAdminStore } from '@/shared/store/newsAdminStore';
import { NewsStatus } from '@/shared/types';
import type { NewsBlock } from '@/shared/types';
import { imageFileToDataUrl } from '@/shared/utils/imageFileToDataUrl';
import { alertHandler } from '@/shared/utils/alertHandler';

// Обложка: keep — не менять, набор data-URL — заменить, null — очистить
type CoverValue = { kind: 'keep' } | { kind: 'set'; dataUrl: string } | { kind: 'clear' };

export function useNewsEditor(slug: string | undefined) {
  const {
    editable, editableStatus, fetchEditable, resetEditable,
    createNews, updateNews, saving,
  } = useNewsAdminStore();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [lead, setLead] = useState('');
  const [blocks, setBlocks] = useState<NewsBlock[]>([]);
  const [cover, setCover] = useState<CoverValue>({ kind: 'keep' });
  const [coverProcessing, setCoverProcessing] = useState(false);

  useEffect(() => {
    if (slug) void fetchEditable(slug);
    return () => resetEditable();
  }, [slug, fetchEditable, resetEditable]);

  useEffect(() => {
    if (!editable) return;
    setTitle(editable.title);
    setTag(editable.tag);
    setExcerpt(editable.excerpt);
    setCustomSlug(editable.slug);
    setLead(editable.lead ?? '');
    setBlocks(editable.body);
    setCover({ kind: 'keep' });
  }, [editable]);

  const goBack = () => router.push('/admin/news');

  const canSave = Boolean(title.trim() && tag.trim() && excerpt.trim());
  const loading = Boolean(slug) && (editableStatus === 'idle' || editableStatus === 'loading');
  const isPublished = editable?.status === NewsStatus.PUBLISHED;
  const draftButtonLabel = isPublished ? 'Снять с публикации в черновик' : 'Сохранить черновик';
  const publishButtonLabel = isPublished ? 'Сохранить и опубликовать' : 'Опубликовать';

  const coverPreviewUrl =
    cover.kind === 'set' ? cover.dataUrl : cover.kind === 'clear' ? null : editable?.imageUrl ?? null;

  const pickCover = async (file: File) => {
    setCoverProcessing(true);
    try {
      const dataUrl = await imageFileToDataUrl(file);
      setCover({ kind: 'set', dataUrl });
    } catch {
      alertHandler.addAlert({ defaultText: 'Не удалось обработать изображение' });
    } finally {
      setCoverProcessing(false);
    }
  };

  const clearCover = () => setCover({ kind: 'clear' });

  const buildDto = (status: NewsStatus): CreateNewsDto => ({
    title: title.trim(),
    tag: tag.trim(),
    excerpt: excerpt.trim(),
    ...(customSlug.trim() && customSlug.trim() !== editable?.slug ? { slug: customSlug.trim() } : {}),
    lead: lead.trim() || undefined,
    body: blocks,
    status,
    ...(cover.kind === 'set' ? { image: cover.dataUrl } : {}),
    ...(cover.kind === 'clear' ? { image: null } : {}),
  });

  const save = async (status: NewsStatus) => {
    const ok = editable
      ? await updateNews(editable.id, buildDto(status))
      : await createNews(buildDto(status));
    if (ok) goBack();
  };

  return {
    title, setTitle, tag, setTag, excerpt, setExcerpt,
    customSlug, setCustomSlug, lead, setLead, blocks, setBlocks,
    coverPreviewUrl, coverProcessing, pickCover, clearCover,
    editable, loading, notFound: editableStatus === 'notFound',
    saving, canSave, save, goBack,
    draftButtonLabel, publishButtonLabel,
  };
}
