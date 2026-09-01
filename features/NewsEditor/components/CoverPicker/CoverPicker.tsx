'use client';

import { useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Button } from 'antd';
import type { CoverPickerProps } from './types';
import styles from './CoverPicker.module.scss';

export function CoverPicker({ previewUrl, processing, onPick, onClear }: CoverPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => inputRef.current?.click();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) onPick(file);
  };

  return (
    <div className={styles.root}>
      {previewUrl ? (
        <img className={styles.preview} src={previewUrl} alt="Обложка новости" />
      ) : (
        <div className={styles.placeholder}>Обложки нет</div>
      )}
      <input
        ref={inputRef}
        className={styles.fileInput}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className={styles.actions}>
        <Button onClick={openFileDialog} loading={processing}>
          Загрузить обложку
        </Button>
        {previewUrl && (
          <Button onClick={onClear} disabled={processing}>
            Убрать
          </Button>
        )}
      </div>
    </div>
  );
}
