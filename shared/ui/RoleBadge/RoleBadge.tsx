import classNames from 'classnames';
import { ROLE_LABELS } from '@/shared/constants';
import type { RoleBadgeProps } from './types';
import styles from './RoleBadge.module.scss';

export function RoleBadge({ role }: RoleBadgeProps) {
  return <span className={classNames(styles.badge, styles[role])}>{ROLE_LABELS[role]}</span>;
}
