'use client';

import classNames from 'classnames';
import { Button, Popconfirm } from 'antd';
import { parseInlineStyles } from '@/shared/utils/parseInlineStyles';
import type { DirectoryCardProps } from './types';
import styles from './DirectoryCard.module.scss';

export function DirectoryCard({
  entry,
  canManage,
  deleting,
  deleteConfirm,
  deleteWarning,
  onEdit,
  onDelete,
}: DirectoryCardProps) {
  const accent = entry.color || undefined;

  return (
    <article
      className={styles.card}
      style={accent ? { borderLeftColor: accent } : undefined}
    >
      <h3
        className={styles.name}
        style={{
          ...(accent && { color: accent }),
          ...parseInlineStyles(entry.styles),
        }}
      >
        {entry.name}
      </h3>

      <p
        className={classNames(styles.description, {
          [styles.empty]: !entry.description,
        })}
      >
        {entry.description || 'Без описания'}
      </p>

      {canManage && (
        <div className={styles.actions}>
          <Button size="small" onClick={onEdit}>
            Изменить
          </Button>
          <Popconfirm
            title={deleteConfirm}
            description={deleteWarning}
            okText="Удалить"
            cancelText="Отмена"
            okButtonProps={{ danger: true }}
            onConfirm={onDelete}
          >
            <Button size="small" danger loading={deleting}>
              Удалить
            </Button>
          </Popconfirm>
        </div>
      )}
    </article>
  );
}
