import { Button, Popconfirm } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined } from '@ant-design/icons';
import type { BlockCardProps } from './types';
import styles from './BlockCard.module.scss';

export function BlockCard({
  title,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onDelete,
  children,
}: BlockCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <div className={styles.actions}>
          <Button size="small" icon={<ArrowUpOutlined />} disabled={!canMoveUp} onClick={onMoveUp} />
          <Button
            size="small"
            icon={<ArrowDownOutlined />}
            disabled={!canMoveDown}
            onClick={onMoveDown}
          />
          <Popconfirm title="Удалить блок?" okText="Удалить" cancelText="Отмена" onConfirm={onDelete}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
