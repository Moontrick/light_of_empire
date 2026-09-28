'use client';

import { Button, Popconfirm } from 'antd';
import { DirectoryTag } from '@ui/DirectoryTag';
import { ForumTagChip } from '@ui/ForumTagChip';
import type { TagCardProps } from './types';
import styles from './TagCard.module.scss';

export function TagCard({ tag, disabled, onEdit, onDelete }: TagCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.preview}>
        <ForumTagChip tag={tag} />
      </div>
      <div className={styles.formation}>
        {tag.formation ? <DirectoryTag entry={tag.formation} /> : <span className={styles.common}>Общий</span>}
      </div>
      <div className={styles.actions}>
        <Button size="small" onClick={onEdit} disabled={disabled}>
          Изменить
        </Button>
        <Popconfirm
          title="Удалить тег?"
          description="Тег снимется со всех тем"
          okText="Удалить"
          cancelText="Отмена"
          okButtonProps={{ danger: true }}
          disabled={disabled}
          onConfirm={onDelete}
        >
          <Button size="small" danger disabled={disabled}>
            Удалить
          </Button>
        </Popconfirm>
      </div>
    </article>
  );
}
