'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from '@/shared/i18n/navigation';
import type { CreateDonationDto, UpdateDonationDto } from '@/shared/api/donations';
import { useDonationsAdminStore } from '@/shared/store/donationsAdminStore';
import type { DonationImage, NewsBlock } from '@/shared/types';
import {
  DONATION_IMAGES_MAX,
  DONATION_PRICE_MAX,
  DONATION_TITLE_MAX,
  DONATION_TITLE_MIN,
} from '@/shared/constants';
import { IMAGE_UPLOAD_MAX_BYTES, IMAGE_UPLOAD_MAX_LABEL } from '@/shared/constants/images';
import { alertHandler } from '@/shared/utils/alertHandler';
import type { PendingImage } from '../types';

export function useDonationEditor(id: number | undefined) {
  const router = useRouter();
  const {
    editable, editableStatus, fetchEditable, resetEditable,
    create, update, addImage, deleteImage, saving,
  } = useDonationsAdminStore();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [blocks, setBlocks] = useState<NewsBlock[]>([]);
  const [existingImages, setExistingImages] = useState<DonationImage[]>([]);
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  // Актуальный список для очистки object URL при размонтировании
  const pendingRef = useRef<PendingImage[]>([]);
  pendingRef.current = pendingImages;

  // Невалидный id (например, /admin/donations/abc → NaN) не должен уходить в запрос — сразу «не найден»
  const invalidId = id !== undefined && !(Number.isInteger(id) && id > 0);

  useEffect(() => {
    if (id !== undefined && !invalidId) void fetchEditable(id);
    return () => resetEditable();
  }, [id, invalidId, fetchEditable, resetEditable]);

  useEffect(() => {
    if (!editable) return;
    setTitle(editable.title);
    setPrice(editable.price);
    setIsActive(editable.isActive);
    setBlocks(editable.body);
    setExistingImages(editable.images);
    setPendingImages([]);
  }, [editable]);

  useEffect(
    () => () => pendingRef.current.forEach((image) => URL.revokeObjectURL(image.previewUrl)),
    [],
  );

  const goBack = () => router.push('/admin/donations');

  const trimmedTitle = title.trim();
  const canSave =
    trimmedTitle.length >= DONATION_TITLE_MIN &&
    trimmedTitle.length <= DONATION_TITLE_MAX &&
    price !== null &&
    Number.isInteger(price) &&
    price >= 1 &&
    price <= DONATION_PRICE_MAX;
  const loading =
    id !== undefined && !invalidId && (editableStatus === 'idle' || editableStatus === 'loading');

  const addFiles = (files: File[]) => {
    const free = DONATION_IMAGES_MAX - existingImages.length - pendingImages.length;
    const next: PendingImage[] = [];

    for (const file of files.slice(0, Math.max(0, free))) {
      if (file.size > IMAGE_UPLOAD_MAX_BYTES) {
        alertHandler.addAlert({
          defaultText: `«${file.name}» больше ${IMAGE_UPLOAD_MAX_LABEL} — не добавлена`,
        });
        continue;
      }
      next.push({
        key: `${file.name}-${file.size}-${Date.now()}-${next.length}`,
        file,
        previewUrl: URL.createObjectURL(file),
        name: file.name,
      });
    }

    setPendingImages((prev) => [...prev, ...next]);

    if (free <= 0) {
      alertHandler.addAlert({
        status: 'warning',
        defaultText: `Больше картинок добавить нельзя (лимит ${DONATION_IMAGES_MAX})`,
      });
    } else if (files.length > free) {
      alertHandler.addAlert({
        status: 'warning',
        defaultText: `Добавлены первые ${free} — больше не помещается`,
      });
    }
  };

  const removePending = (key: string) =>
    setPendingImages((prev) => {
      const target = prev.find((image) => image.key === key);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((image) => image.key !== key);
    });

  const removeExisting = async (imageId: number) => {
    if (id === undefined) return;
    setDeletingId(imageId);
    try {
      const ok = await deleteImage(id, imageId);
      if (ok) setExistingImages((prev) => prev.filter((image) => image.id !== imageId));
    } finally {
      setDeletingId(null);
    }
  };

  // Частичное обновление: шлём только изменённые поля (документ: null запрещён)
  const buildUpdateDto = (): UpdateDonationDto => {
    if (!editable) return {};
    const dto: UpdateDonationDto = {};
    if (trimmedTitle !== editable.title) dto.title = trimmedTitle;
    if (price !== null && price !== editable.price) dto.price = price;
    if (isActive !== editable.isActive) dto.is_active = isActive;
    if (JSON.stringify(blocks) !== JSON.stringify(editable.body)) dto.body = blocks;
    return dto;
  };

  const uploadPending = async (donationId: number) => {
    setUploading(true);
    try {
      // Последовательно: параллельные запросы сталкиваются на seq (409)
      for (const [index, image] of pendingImages.entries()) {
        const uploaded = await addImage(donationId, image.file);
        if (!uploaded) {
          alertHandler.addAlert({ status: 'warning', defaultText: `Картинка ${index + 1} не загружена` });
        }
      }
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!canSave || price === null) return;
    let donationId = editable?.id ?? null;

    if (editable) {
      const dto = buildUpdateDto();
      if (Object.keys(dto).length > 0) {
        const ok = await update(editable.id, dto);
        if (!ok) return;
      }
    } else {
      const dto: CreateDonationDto = { title: trimmedTitle, price, is_active: isActive, body: blocks };
      const created = await create(dto);
      if (!created) return;
      donationId = created.id;
    }

    if (donationId !== null && pendingImages.length > 0) await uploadPending(donationId);
    alertHandler.addAlert({ status: 'success', defaultText: 'Товар сохранён' });
    goBack();
  };

  return {
    title, setTitle, price, setPrice, isActive, setIsActive, blocks, setBlocks,
    existingImages, pendingImages, deletingId,
    addFiles, removePending, removeExisting,
    editable, loading, notFound: invalidId || editableStatus === 'notFound',
    loadError: editableStatus === 'error',
    retry: () => { if (id !== undefined && !invalidId) void fetchEditable(id); },
    saving: saving || uploading, canSave, save, goBack,
  };
}
