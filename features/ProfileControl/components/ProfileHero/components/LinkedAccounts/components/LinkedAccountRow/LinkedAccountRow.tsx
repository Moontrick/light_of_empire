import classNames from 'classnames';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import type { LinkedAccountRowProps } from './types';
import styles from './LinkedAccountRow.module.scss';

export function LinkedAccountRow({ icon, name, value, href, onEdit }: LinkedAccountRowProps) {
  const linked = value !== null && value !== '';

  // Клик по любому месту строки открывает редактирование; кнопки внутри
  // без своих обработчиков — их клик всплывает сюда же
  return (
    <li
      className={classNames(styles.row, { [styles.linked]: linked })}
      title={linked ? 'Изменить' : 'Добавить'}
      onClick={onEdit}
    >
      <span className={styles.icon}>{icon}</span>

      <div className={styles.meta}>
        <span className={styles.name}>{name}</span>
        {linked && href ? (
          <a
            className={styles.value}
            href={href}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            {value}
          </a>
        ) : (
          <span className={classNames(styles.value, { [styles.valueEmpty]: !linked })}>
            {linked ? value : 'Не привязан'}
          </span>
        )}
      </div>

      {linked ? (
        <button type="button" className={styles.edit}>
          <EditOutlined />
          Изменить
        </button>
      ) : (
        <Button size="small" type="primary">
          Добавить
        </Button>
      )}
    </li>
  );
}
