'use client';

import { ConfigProvider, theme } from 'antd';
import type { ThemeConfig } from 'antd';
import { useMemo, type ReactNode } from 'react';
import { useTheme } from './useTheme';

export function AntdThemeProvider({ children }: { children: ReactNode }) {
  const { resolved } = useTheme();

  const config = useMemo<ThemeConfig>(() => ({
    algorithm: resolved === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: 'var(--bf-yellow)',
      colorPrimaryHover: 'var(--bf-yellow-deep)',
      colorBgBase: 'var(--bf-bg)',
      colorBgContainer: 'var(--bf-tile)',
      colorBgElevated: 'var(--bf-tile)',
      colorText: 'var(--bf-text)',
      colorTextBase: 'var(--bf-text)',
      colorTextSecondary: 'var(--bf-text-muted)',
      colorTextTertiary: 'var(--bf-text-faint)',
      colorBorder: 'var(--bf-line)',
      colorBorderSecondary: 'var(--bf-line)',
      colorLink: 'var(--bf-link)',
      colorSuccess: 'var(--bf-success)',
      colorWarning: 'var(--bf-yellow-deep)',
      colorError: 'var(--bf-yellow)',
      borderRadius: 0,
      fontFamily: 'var(--bf-font)',
    },
    components: {
      Button: {
        primaryColor: 'var(--bf-text-on-yellow)',
        primaryBg: 'var(--bf-yellow)',
        primaryHoverBg: 'var(--bf-yellow-deep)',
        primaryActiveBg: 'var(--bf-yellow-deep)',
        defaultBg: 'var(--bf-tile)',
        defaultColor: 'var(--bf-text)',
        defaultBorderColor: 'transparent',
      },
      Input: {
        colorBgContainer: 'var(--bf-tile)',
        colorText: 'var(--bf-text)',
        colorTextPlaceholder: 'var(--bf-text-faint)',
      },
    },
  }), [resolved]);

  return <ConfigProvider theme={config}>{children}</ConfigProvider>;
}