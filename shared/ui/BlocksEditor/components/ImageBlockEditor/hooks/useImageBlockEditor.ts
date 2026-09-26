import { useState } from 'react';
import { IMAGE_UPLOAD_FAILED } from '@/shared/constants/images';
import { alertHandler } from '@/shared/utils/alertHandler';
import { resolveImageSrc } from '@/shared/utils/resolveImageSrc';
import { uploadImageFile } from '@/shared/utils/uploadImageFile';
import type { ImageBlockEditorProps } from '../types';

export function useImageBlockEditor({ value, onChange }: ImageBlockEditorProps) {
  const [processing, setProcessing] = useState(false);

  const handleFiles = async (files: File[]) => {
    const [file] = files;
    if (!file) return;

    setProcessing(true);
    try {
      // В блок кладём относительный url image-service; хост добавляется при рендере
      const uploaded = await uploadImageFile(file);
      onChange({ ...value, src: uploaded.url });
    } catch (error) {
      alertHandler.addAlert({
        defaultText: error instanceof Error ? error.message : IMAGE_UPLOAD_FAILED,
      });
    } finally {
      setProcessing(false);
    }
  };

  const setAlt = (alt: string) => onChange({ ...value, alt: alt || undefined });
  const setCaption = (caption: string) => onChange({ ...value, caption: caption || undefined });

  return { processing, previewUrl: resolveImageSrc(value.src), handleFiles, setAlt, setCaption };
}
