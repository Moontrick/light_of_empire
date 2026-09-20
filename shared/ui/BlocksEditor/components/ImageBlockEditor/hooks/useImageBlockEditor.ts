import { useState } from 'react';
import { imageFileToDataUrl } from '@/shared/utils/imageFileToDataUrl';
import { alertHandler } from '@/shared/utils/alertHandler';
import type { ImageBlockEditorProps } from '../types';

// Блоки секции ограничены 256 КБ на бэке, поэтому ужимаем сильнее, чем для новостей
const PAGE_IMAGE_MAX_WIDTH = 1200;
const PAGE_IMAGE_QUALITY = 0.72;

export function useImageBlockEditor({ value, onChange }: ImageBlockEditorProps) {
  const [processing, setProcessing] = useState(false);

  const handleFiles = async (files: File[]) => {
    const [file] = files;
    if (!file) return;

    setProcessing(true);
    try {
      const src = await imageFileToDataUrl(file, {
        maxWidth: PAGE_IMAGE_MAX_WIDTH,
        quality: PAGE_IMAGE_QUALITY,
      });
      onChange({ ...value, src });
    } catch {
      alertHandler.addAlert({ defaultText: 'Не удалось обработать изображение' });
    } finally {
      setProcessing(false);
    }
  };

  const setAlt = (alt: string) => onChange({ ...value, alt: alt || undefined });
  const setCaption = (caption: string) => onChange({ ...value, caption: caption || undefined });

  return { processing, handleFiles, setAlt, setCaption };
}
