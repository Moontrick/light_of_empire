'use client';

import { Button, Popconfirm, Select, Tag } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import { PAGE_STATUS_LABELS } from '@/shared/constants';
import type { PageStatus } from '@/shared/api/pages';
import { PAGE_STATUS_COLORS, PAGE_STATUS_OPTIONS } from '../../../../constants';
import type { StructureNodeRowProps } from '../../types';
import styles from './StructureNodeRow.module.scss';

export function StructureNodeRow({
  node,
  siblings,
  first,
  last,
  canMutate,
  savingTree,
  onEdit,
  onChangeStatus,
  onDelete,
  onMove,
}: StructureNodeRowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.info}>
        <span className={styles.name}>{node.name}</span>
        <span className={styles.slug}>/{node.slug}</span>
        {canMutate ? (
          <Select<PageStatus>
            size="small"
            className={styles.status}
            value={node.status}
            options={PAGE_STATUS_OPTIONS}
            disabled={savingTree}
            onChange={(status) => onChangeStatus(node, status)}
          />
        ) : (
          <Tag color={PAGE_STATUS_COLORS[node.status]}>{PAGE_STATUS_LABELS[node.status]}</Tag>
        )}
      </div>
      <div className={styles.actions}>
        <Link className={styles.open} href={`/${node.slug}`}>
          Открыть
        </Link>
        {canMutate && (
          <>
            <Button
              size="small"
              aria-label="Выше"
              disabled={first || savingTree}
              onClick={() => onMove(node, siblings, -1)}
            >
              ↑
            </Button>
            <Button
              size="small"
              aria-label="Ниже"
              disabled={last || savingTree}
              onClick={() => onMove(node, siblings, 1)}
            >
              ↓
            </Button>
            <Button size="small" disabled={savingTree} onClick={() => onEdit(node)}>
              Редактировать
            </Button>
            {node.status !== 'DELETED' && (
              <Popconfirm
                title="Удалить страницу?"
                description="Её можно будет восстановить сменой статуса"
                okText="Удалить"
                okButtonProps={{ danger: true }}
                cancelText="Отмена"
                onConfirm={() => onDelete(node)}
              >
                <Button size="small" danger disabled={savingTree}>
                  Удалить
                </Button>
              </Popconfirm>
            )}
          </>
        )}
      </div>
    </div>
  );
}
