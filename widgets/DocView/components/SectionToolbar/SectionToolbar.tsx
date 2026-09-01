'use client';

import { Button, ConfigProvider, Popconfirm } from 'antd';
import { DARK_FORM_THEME } from '@/shared/lib/antdTheme';
import { useSectionToolbar } from './hooks/useSectionToolbar';
import type { SectionToolbarProps } from './types';
import styles from './SectionToolbar.module.scss';

export function SectionToolbar({ section, sections }: SectionToolbarProps) {
  const { canMoveUp, canMoveDown, reordering, deleting, moveUp, moveDown, remove } =
    useSectionToolbar(section, sections);

  return (
    // Тулбар живёт вне SectionEditor, поэтому тёмную antd-тему подключаем сами
    <ConfigProvider theme={DARK_FORM_THEME}>
      <div className={styles.toolbar}>
        <Button
          size="small"
          className={styles.action}
          aria-label="Выше"
          disabled={!canMoveUp || reordering}
          onClick={moveUp}
        >
          ↑
        </Button>
        <Button
          size="small"
          className={styles.action}
          aria-label="Ниже"
          disabled={!canMoveDown || reordering}
          onClick={moveDown}
        >
          ↓
        </Button>
        <Popconfirm
          title="Удалить секцию?"
          description="Восстановить её будет нельзя"
          okText="Удалить"
          okButtonProps={{ danger: true }}
          cancelText="Отмена"
          onConfirm={remove}
        >
          <Button size="small" className={styles.delete} danger loading={deleting}>
            Удалить
          </Button>
        </Popconfirm>
      </div>
    </ConfigProvider>
  );
}
