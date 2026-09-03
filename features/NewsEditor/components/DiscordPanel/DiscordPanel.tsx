'use client';

import classNames from 'classnames';
import { NewsDiscordActions } from '@ui/NewsDiscordActions';
import type { DiscordPanelProps } from './types';
import styles from './DiscordPanel.module.scss';

export function DiscordPanel({ sent, loading, disabled, onSend, onCancel }: DiscordPanelProps) {
  return (
    <div className={styles.root}>
      <p className={classNames(styles.status, { [styles.statusSent]: sent })}>
        {sent ? 'Новость отправлена в Discord' : 'Новость в Discord не отправлялась'}
      </p>
      <NewsDiscordActions
        sent={sent}
        loading={loading}
        disabled={disabled}
        onSend={onSend}
        onCancel={onCancel}
      />
    </div>
  );
}
