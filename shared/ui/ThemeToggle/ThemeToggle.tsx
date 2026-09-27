'use client';

import { Tooltip } from 'antd';
import type { CSSProperties } from 'react';
import s from './ThemeToggle.module.scss';
import { useTheme } from '@/shared/utils/theme/useTheme';

interface ThemeToggleProps {
  /** Диаметр кружка, px */
  size?: number;
  className?: string;
}

export function ThemeToggle({ size = 36, className }: ThemeToggleProps) {
  const { isDark, mode, toggle } = useTheme();

  const action = isDark ? 'Включить светлую тему' : 'Включить тёмную тему';
  const hint = mode === 'system' ? `${action} · сейчас как в системе` : action;

  return (
    <Tooltip title={hint}>
      <button
        type="button"
        className={className ? `${s.toggle} ${className}` : s.toggle}
        style={{ '--size': `${size}px` } as CSSProperties}
        onClick={toggle}
        aria-label="Тёмная тема"
        aria-pressed={isDark}
        data-auto={mode === 'system' || undefined}
      >
        <span className={s.disc} aria-hidden />
      </button>
    </Tooltip>
  );
}