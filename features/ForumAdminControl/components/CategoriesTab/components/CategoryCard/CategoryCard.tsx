'use client';

import classNames from 'classnames';
import { Button, Popconfirm, Tooltip } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import type { CategoryCardProps } from './types';
import styles from './CategoryCard.module.scss';

export function CategoryCard({
  category, canMoveUp, canMoveDown, disabled,
  onMoveUp, onMoveDown, onEdit, onToggleArchive, onDelete,
}: CategoryCardProps) {
  const hasThreads = category.threads_count > 0;

  return (
    <article className={classNames(styles.card, { [styles.archived]: category.is_archived })}>
      <div className={styles.order}>
        <Button
          size="small"
          icon={<ArrowUpOutlined />}
          aria-label="Выше"
          disabled={disabled || !canMoveUp}
          onClick={onMoveUp}
        />
        <Button
          size="small"
          icon={<ArrowDownOutlined />}
          aria-label="Ниже"
          disabled={disabled || !canMoveDown}
          onClick={onMoveDown}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.titleLine}>
          <h3 className={styles.name}>{category.name}</h3>
          {category.is_archived && <span className={styles.badge}>Архив</span>}
          <span className={styles.slug}>/{category.slug}</span>
        </div>
        <p className={classNames(styles.description, { [styles.empty]: !category.description })}>
          {category.description || 'Без описания'}
        </p>
        <span className={styles.count}>Тем: {category.threads_count}</span>
      </div>

      <div className={styles.actions}>
        <Button size="small" onClick={onEdit} disabled={disabled}>
          Изменить
        </Button>
        <Button size="small" onClick={onToggleArchive} disabled={disabled}>
          {category.is_archived ? 'Из архива' : 'В архив'}
        </Button>
        <Tooltip title={hasThreads ? 'Сначала перенесите темы в другой раздел' : undefined}>
          <span>
            <Popconfirm
              title="Удалить раздел?"
              description="Действие необратимо"
              okText="Удалить"
              cancelText="Отмена"
              okButtonProps={{ danger: true }}
              disabled={disabled || hasThreads}
              onConfirm={onDelete}
            >
              <Button size="small" danger disabled={disabled || hasThreads}>
                Удалить
              </Button>
            </Popconfirm>
          </span>
        </Tooltip>
      </div>
    </article>
  );
}
