'use client';

import { Button, Popconfirm } from 'antd';
import { ImageDropZone } from '@ui/ImageDropZone';
import type { DonationImagesEditorProps } from './types';
import styles from './DonationImagesEditor.module.scss';

export function DonationImagesEditor({
  existing,
  pending,
  max,
  deletingId,
  onAdd,
  onRemoveExisting,
  onRemovePending,
}: DonationImagesEditorProps) {
  const count = existing.length + pending.length;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.label}>Картинки</span>
        <span className={styles.counter}>
          {count} / {max}
        </span>
      </div>

      <div className={styles.grid}>
        {existing.map((image) => (
          <div key={`existing-${image.id}`} className={styles.item}>
            <img src={image.url} alt="" className={styles.image} />
            <Popconfirm
              title="Удалить картинку?"
              okText="Удалить"
              cancelText="Отмена"
              onConfirm={() => onRemoveExisting(image.id)}
            >
              <Button size="small" danger loading={deletingId === image.id} className={styles.remove}>
                Удалить
              </Button>
            </Popconfirm>
          </div>
        ))}
        {pending.map((image) => (
          <div key={image.key} className={styles.item}>
            <img src={image.previewUrl} alt={image.name} className={styles.image} />
            <span className={styles.pendingBadge}>Загрузится при сохранении</span>
            <Button size="small" className={styles.remove} onClick={() => onRemovePending(image.key)}>
              Убрать
            </Button>
          </div>
        ))}
      </div>

      <ImageDropZone
        multiple
        disabled={count >= max}
        hint={
          count >= max
            ? `Лимит ${max} картинок достигнут`
            : 'Перетащите картинки или нажмите, чтобы выбрать'
        }
        onFiles={onAdd}
      />
    </div>
  );
}
