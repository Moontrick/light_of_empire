import classNames from 'classnames';
import { formatPlaytime } from '../../../../lib/formatPlaytime';
import type { RosterChipProps } from './types';
import styles from './RosterChip.module.scss';

export function RosterChip({ player, isTop }: RosterChipProps) {
  return (
    <li className={classNames(styles.chip, { [styles.top]: isTop })}>
      <span className={styles.name}>{player.name}</span>
      <span className={styles.time}>{formatPlaytime(player.timeSeconds)}</span>
    </li>
  );
}
