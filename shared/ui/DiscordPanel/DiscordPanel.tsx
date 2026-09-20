'use client';

import classNames from 'classnames';
import { DiscordSendActions } from '@ui/DiscordSendActions';
import type { DiscordPanelProps } from './types';
import styles from './DiscordPanel.module.scss';

export function DiscordPanel({ sent, loading, disabled, onSend, onCancel }: DiscordPanelProps) {
  return (
    <div className={styles.root}>
      <p className={classNames(styles.status, { [styles.statusSent]: sent })}>
        {sent ? 'Отправлено в Discord' : 'В Discord не отправлялось'}
      </p>
      <DiscordSendActions
        sent={sent}
        loading={loading}
        disabled={disabled}
        onSend={onSend}
        onCancel={onCancel}
      />
    </div>
  );
}
