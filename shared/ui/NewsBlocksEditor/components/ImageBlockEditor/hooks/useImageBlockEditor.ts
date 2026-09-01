import { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { imageFileToDataUrl } from '@/shared/utils/imageFileToDataUrl';
import { alertHandler } from '@/shared/utils/alertHandler';
import type { ImageBlockEditorProps } from '../types';

export function useImageBlockEditor({ value, onChange }: ImageBlockEditorProps) {
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => inputRef.current?.click();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setProcessing(true);
    try {
      const src = await imageFileToDataUrl(file);
      onChange({ ...value, src });
    } catch {
      alertHandler.addAlert({ defaultText: 'Не удалось обработать изображение' });
    } finally {
      setProcessing(false);
    }
  };

  const setAlt = (alt: string) => onChange({ ...value, alt: alt || undefined });
  const setCaption = (caption: string) => onChange({ ...value, caption: caption || undefined });

  return { inputRef, processing, openFileDialog, handleFileChange, setAlt, setCaption };
}
