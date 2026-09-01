'use client';

import { ConfigProvider } from 'antd';
import { HudCorners } from '@ui/HudCorners';
import { UserAvatar } from '@ui/UserAvatar';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import type { AuthShellProps } from './types';
import styles from './AuthShell.module.scss';

export function AuthShell({ title, tagline, footer, children }: AuthShellProps) {
  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <main className={styles.page}>
        <section className={styles.card}>
          <HudCorners />
          <div className={styles.logo}>
            <UserAvatar size="lg" alt="Логотип" />
          </div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.tagline}>{tagline}</p>
          {children}
          <p className={styles.footer}>{footer}</p>
        </section>
      </main>
    </ConfigProvider>
  );
}
