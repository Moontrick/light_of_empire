import type { ServerMeterProps } from './types';
import styles from './ServerMeter.module.scss';

export function ServerMeter({ players, maxPlayers, fillPercent }: ServerMeterProps) {
  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-label="Заполненность сервера"
      aria-valuenow={players}
      aria-valuemin={0}
      aria-valuemax={maxPlayers}
    >
      <span className={styles.fill} style={{ width: `${fillPercent}%` }} />
      <span className={styles.ticks} aria-hidden />
    </div>
  );
}
