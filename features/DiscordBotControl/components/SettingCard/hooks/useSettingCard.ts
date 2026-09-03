import { useEffect, useState } from 'react';
import type { SettingCardProps } from '../types';

export function useSettingCard({ setting, onSave }: Pick<SettingCardProps, 'setting' | 'onSave'>) {
  const [draft, setDraft] = useState(setting.value ?? '');

  useEffect(() => {
    setDraft(setting.value ?? '');
  }, [setting.value]);

  const trimmed = draft.trim();
  const dirty = trimmed !== (setting.value ?? '');
  const canSave = dirty && trimmed.length > 0;
  // Сбрасывать есть куда, только если у параметра есть встроенный дефолт
  const canReset = setting.is_set && setting.default_value !== null;

  const effectiveValue = setting.value ?? setting.default_value;
  const usesDefault = !setting.is_set && setting.default_value !== null;
  const changedAtLabel = setting.changed_at
    ? new Date(setting.changed_at).toLocaleString('ru-RU')
    : null;

  const submit = () => {
    if (canSave) onSave(trimmed);
  };

  return {
    draft,
    setDraft,
    canSave,
    canReset,
    effectiveValue,
    usesDefault,
    changedAtLabel,
    submit,
  };
}
