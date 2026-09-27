'use client';

import { ConfigProvider, theme } from 'antd';
import type { ThemeConfig } from 'antd';
import { useMemo, type ReactNode } from 'react';
import { useTheme } from './useTheme';

const BF = {
  light: { bg: '#e9e9e9', text: '#262626', link: '#2a5697', success: '#3d8b4f' },
  dark: { bg: '#161616', text: '#e6e6e6', link: '#5095eb', success: '#5cb870' },
} as const;

export function AntdThemeProvider({ children }: { children: ReactNode }) {
  const { resolved } = useTheme();

  const config = useMemo<ThemeConfig>(() => {
    const p = BF[resolved];
    return {
      algorithm: resolved === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: '#f2b41f',
        colorBgBase: p.bg,
        colorTextBase: p.text,
        colorLink: p.link,
        colorSuccess: p.success,
        borderRadius: 0, // угловатый стиль BF
        fontFamily: 'var(--bf-font)',
      },
      components: {
        // Тёмный текст на жёлтой кнопке (= --bf-text-on-yellow)
        Button: { primaryColor: '#1a1a1a' },
      },
    };
  }, [resolved]);

  return <ConfigProvider theme={config}>{children}</ConfigProvider>;
}