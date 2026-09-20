import { useRef, useState } from 'react';
import type { ChangeEvent, DragEvent, KeyboardEvent } from 'react';
import type { ImageDropZoneProps } from '../types';

const isImage = (file: File) => file.type.startsWith('image/');

export function useImageDropZone({ multiple, disabled, processing, onFiles }: ImageDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const inactive = Boolean(disabled || processing);

  const emit = (list: FileList | null) => {
    const files = Array.from(list ?? []).filter(isImage);
    if (!files.length) return;
    onFiles(multiple ? files : files.slice(0, 1));
  };

  const openFileDialog = () => {
    if (!inactive) inputRef.current?.click();
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    emit(event.target.files);
    // Сбрасываем value, иначе повторный выбор того же файла не вызовет change
    event.target.value = '';
  };

  const onDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    if (!inactive && !dragging) setDragging(true);
  };

  const onDragLeave = () => setDragging(false);

  const onDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setDragging(false);
    if (!inactive) emit(event.dataTransfer.files);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openFileDialog();
    }
  };

  return { inputRef, dragging, inactive, openFileDialog, onInputChange, onDragOver, onDragLeave, onDrop, onKeyDown };
}
