import { useMemo, useState } from 'react';
import { IMAGE_UPLOAD_FAILED } from '@/shared/constants/images';
import { alertHandler } from '@/shared/utils/alertHandler';
import { uploadImageFile } from '@/shared/utils/uploadImageFile';
import { buildCommentBlocks, splitCommentBlocks } from '../lib/commentBlocks';
import type { CommentComposerProps } from '../types';

type Params = Pick<CommentComposerProps, 'value' | 'onChange' | 'maxImages'>;

export function useCommentComposer({ value, onChange, maxImages }: Params) {
  const [uploading, setUploading] = useState(false);
  const { text, images } = useMemo(() => splitCommentBlocks(value), [value]);
  const limit = maxImages ?? Infinity;

  const setText = (next: string) => onChange(buildCommentBlocks(next, images));

  const removeImage = (index: number) =>
    onChange(buildCommentBlocks(text, images.filter((_, i) => i !== index)));

  const addFiles = async (files: File[]) => {
    const room = limit - images.length;
    if (room <= 0) {
      alertHandler.addAlert({ defaultText: `Не больше ${limit} картинок` });
      return;
    }
    const accepted = files.slice(0, room);
    if (accepted.length < files.length) {
      alertHandler.addAlert({ defaultText: `Прикреплены только первые ${room}: лимит ${limit} картинок` });
    }

    setUploading(true);
    const uploaded: string[] = [];
    try {
      for (const file of accepted) {
        try {
          const result = await uploadImageFile(file);
          uploaded.push(result.url);
        } catch (error) {
          alertHandler.addAlert({
            defaultText: `${file.name}: ${error instanceof Error ? error.message : IMAGE_UPLOAD_FAILED}`,
          });
        }
      }
    } finally {
      setUploading(false);
    }
    if (uploaded.length > 0) onChange(buildCommentBlocks(text, [...images, ...uploaded]));
  };

  const canSubmit = !uploading && (text.trim().length > 0 || images.length > 0);
  const imagesLeft = Number.isFinite(limit) ? limit - images.length : null;

  return { text, images, setText, addFiles, removeImage, uploading, canSubmit, imagesLeft };
}
