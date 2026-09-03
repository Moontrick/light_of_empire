'use client';

import { Button, Popconfirm } from 'antd';
import type { NewsDiscordActionsProps } from './types';

export function NewsDiscordActions({
  sent,
  loading,
  disabled,
  size,
  onSend,
  onCancel,
}: NewsDiscordActionsProps) {
  if (sent) {
    return (
      <Popconfirm
        title="Снять отметку об отправке в Discord?"
        okText="Снять"
        cancelText="Отмена"
        onConfirm={onCancel}
        disabled={disabled}
      >
        <Button size={size} danger loading={loading} disabled={disabled}>
          Отменить отправку
        </Button>
      </Popconfirm>
    );
  }

  return (
    <Popconfirm
      title="Отправить новость в Discord?"
      okText="Отправить"
      cancelText="Отмена"
      onConfirm={onSend}
      disabled={disabled}
    >
      <Button size={size} loading={loading} disabled={disabled}>
        Отправить в Discord
      </Button>
    </Popconfirm>
  );
}
