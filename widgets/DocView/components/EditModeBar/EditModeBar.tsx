'use client';

import classNames from 'classnames';
import type { EditModeBarProps } from './types';
import styles from './EditModeBar.module.scss';

export function EditModeBar({ editMode, onToggle, onEditWrapper }: EditModeBarProps) {
  return (
    <div className={styles.bar}>
      {editMode && (
        <button type="button" className={styles.button} onClick={onEditWrapper}>
          Шапка и подвал
        </button>
      )}
      <button
        type="button"
        className={classNames(styles.button, { [styles.buttonActive]: editMode })}
        onClick={onToggle}
      >
        {editMode ? 'Готово' : 'Редактировать'}
      </button>
    </div>
  );
}
