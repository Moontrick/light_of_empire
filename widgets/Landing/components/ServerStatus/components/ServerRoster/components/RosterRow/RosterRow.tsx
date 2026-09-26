import classNames from 'classnames';
import { formatPlaytime } from '../../../../lib/formatPlaytime';
import type { RosterRowProps } from './types';
import styles from './RosterRow.module.scss';

export function RosterRow({ player, index, isTop }: RosterRowProps) {
  return (
    <li className={classNames(styles.row, { [styles.top]: isTop })}>
      <span className={styles.index}>{index}</span>
      <span className={styles.name}>{player.name}</span>
      <span className={styles.time}>{formatPlaytime(player.timeSeconds)}</span>
    </li>
  );
}
