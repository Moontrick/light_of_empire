'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/shared/i18n/navigation';
import type { CreateCombatOperationDto } from '@/shared/api/combatOperations';
import { useAuthStore } from '@store/authStore';
import { useCombatOperationsAdminStore } from '@/shared/store/combatOperationsAdminStore';
import { hasRoleAtLeast, NewsStatus, UserRole } from '@/shared/types';
import type { NewsBlock } from '@/shared/types';
import { IMAGE_UPLOAD_FAILED } from '@/shared/constants/images';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getCoverUrl } from '@/shared/utils/getCoverUrl';
import { uploadImageFile } from '@/shared/utils/uploadImageFile';

// Обложка: keep — не менять, set — загруженный в image-service файл, clear — очистить.
// Файл уходит на сервер сразу при выборе и привязывается к операции при сохранении.
type CoverValue =
  | { kind: 'keep' }
  | { kind: 'set'; filename: string; previewUrl: string }
  | { kind: 'clear' };

export function useCombatOperationEditor(slug: string | undefined) {
  const {
    editable, editableStatus, fetchEditable, resetEditable,
    create, update, saving, mutatingId,
    sendToDiscord, changeDiscordStatus,
  } = useCombatOperationsAdminStore();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [blocks, setBlocks] = useState<NewsBlock[]>([]);
  const [cover, setCover] = useState<CoverValue>({ kind: 'keep' });
  const [coverProcessing, setCoverProcessing] = useState(false);
  // Флаг держим отдельно от editable: его обновление сбросило бы несохранённые правки формы
  const [isSendToDiscord, setIsSendToDiscord] = useState(false);

  useEffect(() => {
    if (slug) void fetchEditable(slug);
    return () => resetEditable();
  }, [slug, fetchEditable, resetEditable]);

  useEffect(() => {
    if (!editable) return;
    setTitle(editable.title);
    setTag(editable.tag);
    setCustomSlug(editable.slug);
    setBlocks(editable.body);
    setCover({ kind: 'keep' });
    setIsSendToDiscord(editable.isSendToDiscord);
  }, [editable]);

  const goBack = () => router.push('/admin/combat-operations');

  const canSave = Boolean(title.trim() && tag.trim());
  const loading = Boolean(slug) && (editableStatus === 'idle' || editableStatus === 'loading');
  const isPublished = editable?.status === NewsStatus.PUBLISHED;
  const draftButtonLabel = isPublished ? 'Снять с публикации в черновик' : 'Сохранить черновик';
  const publishButtonLabel = isPublished ? 'Сохранить и опубликовать' : 'Опубликовать';

  const coverPreviewUrl =
    cover.kind === 'set' ? cover.previewUrl : cover.kind === 'clear' ? null : editable?.imageUrl ?? null;

  const pickCover = async (file: File) => {
    setCoverProcessing(true);
    try {
      const uploaded = await uploadImageFile(file);
      setCover({
        kind: 'set',
        filename: uploaded.filename,
        previewUrl: getCoverUrl(uploaded.url) ?? uploaded.url,
      });
    } catch (error) {
      alertHandler.addAlert({
        defaultText: error instanceof Error ? error.message : IMAGE_UPLOAD_FAILED,
      });
    } finally {
      setCoverProcessing(false);
    }
  };

  const clearCover = () => setCover({ kind: 'clear' });

  // Бэк разрешает отправку с роли CURATOR — здесь только видимость панели
  const canSendToDiscord = Boolean(editable) && hasRoleAtLeast(user?.role, UserRole.CURATOR);
  const discordMutating = Boolean(editable) && mutatingId === editable?.id;

  const sendEditableToDiscord = async () => {
    if (!editable) return;
    const ok = await sendToDiscord(editable.id);
    if (ok) setIsSendToDiscord(true);
  };

  const cancelEditableDiscordSend = async () => {
    if (!editable) return;
    const ok = await changeDiscordStatus(editable.id);
    if (ok) setIsSendToDiscord(false);
  };

  const buildDto = (status: NewsStatus): CreateCombatOperationDto => ({
    title: title.trim(),
    tag: tag.trim(),
    ...(customSlug.trim() && customSlug.trim() !== editable?.slug ? { slug: customSlug.trim() } : {}),
    body: blocks,
    status,
    ...(cover.kind === 'set' ? { image: cover.filename } : {}),
    ...(cover.kind === 'clear' ? { image: null } : {}),
  });

  const save = async (status: NewsStatus) => {
    const ok = editable
      ? await update(editable.id, buildDto(status))
      : await create(buildDto(status));
    if (ok) goBack();
  };

  const retry = () => {
    if (slug) void fetchEditable(slug);
  };

  return {
    title, setTitle, tag, setTag,
    customSlug, setCustomSlug, blocks, setBlocks,
    coverPreviewUrl, coverProcessing, pickCover, clearCover,
    editable, loading, notFound: editableStatus === 'notFound',
    loadError: editableStatus === 'error', retry,
    saving, canSave, save, goBack,
    draftButtonLabel, publishButtonLabel,
    canSendToDiscord, isSendToDiscord, discordMutating,
    sendEditableToDiscord, cancelEditableDiscordSend,
  };
}
