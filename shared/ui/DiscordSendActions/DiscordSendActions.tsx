'use client';

import { Button, Popconfirm } from 'antd';
import type { DiscordSendActionsProps } from './types';

export function DiscordSendActions({
  sent,
  loading,
  disabled,
  size,
  onSend,
  onCancel,
}: DiscordSendActionsProps) {
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
      title="Отправить в Discord?"
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
