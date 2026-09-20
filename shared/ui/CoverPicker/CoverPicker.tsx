'use client';

import { Button } from 'antd';
import { ImageDropZone } from '@ui/ImageDropZone';
import type { CoverPickerProps } from './types';
import styles from './CoverPicker.module.scss';

export function CoverPicker({ previewUrl, processing, onPick, onClear }: CoverPickerProps) {
  return (
    <div className={styles.root}>
      <ImageDropZone
        previewUrl={previewUrl}
        previewAlt="Обложка"
        processing={processing}
        hint={
          previewUrl
            ? 'Перетащите новую обложку или нажмите, чтобы заменить'
            : 'Перетащите обложку или нажмите, чтобы выбрать'
        }
        onFiles={(files) => onPick(files[0])}
      />
      {previewUrl && (
        <div className={styles.actions}>
          <Button onClick={onClear} disabled={processing}>
            Убрать обложку
          </Button>
        </div>
      )}
    </div>
  );
}
