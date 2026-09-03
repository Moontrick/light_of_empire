'use client';

import { Button, Input, Popconfirm } from 'antd';
import { useSettingCard } from './hooks/useSettingCard';
import type { SettingCardProps } from './types';
import styles from './SettingCard.module.scss';

export function SettingCard({ setting, saving, disabled, onSave, onReset }: SettingCardProps) {
  const {
    draft,
    setDraft,
    canSave,
    canReset,
    effectiveValue,
    usesDefault,
    changedAtLabel,
    submit,
  } = useSettingCard({ setting, onSave });

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{setting.description}</h3>
        <span className={styles.code}>{setting.code}</span>
      </div>

      <p className={styles.meta}>
        <span>
          Сейчас:{' '}
          <span className={styles.metaValue}>{effectiveValue ?? 'не задано'}</span>
          {usesDefault && ' (по умолчанию)'}
        </span>
        {changedAtLabel && <span>Изменено: {changedAtLabel}</span>}
      </p>

      <div className={styles.controls}>
        <Input
          className={styles.input}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onPressEnter={submit}
          placeholder={setting.default_value ?? 'Введите значение'}
          disabled={disabled}
          autoComplete="off"
        />
        <Button type="primary" onClick={submit} loading={saving} disabled={!canSave || disabled}>
          Сохранить
        </Button>
        {canReset && (
          <Popconfirm
            title="Сбросить к значению по умолчанию?"
            okText="Сбросить"
            cancelText="Отмена"
            onConfirm={onReset}
            disabled={disabled}
          >
            <Button disabled={disabled}>Сбросить</Button>
          </Popconfirm>
        )}
      </div>
    </div>
  );
}
