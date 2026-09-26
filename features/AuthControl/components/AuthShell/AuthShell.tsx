'use client';

import { ConfigProvider } from 'antd';
import { AnimatePresence } from 'framer-motion';
import { HudCorners } from '@ui/HudCorners';
import { FORM_THEME } from '@utils/antdTheme';
import { VerifyEmailFooter, VerifyEmailForm } from '../VerifyEmailForm';
import { AuthScreen } from './components/AuthScreen';
import { useAuthShell } from './hooks/useAuthShell';
import type { AuthShellProps } from './types';
import styles from './AuthShell.module.scss';

export function AuthShell({ step, title, tagline, footer, children }: AuthShellProps) {
  const { pending, cancelVerification } = useAuthShell();

  return (
    <ConfigProvider theme={FORM_THEME}>
      <main className={styles.page}>
        <section className={styles.card}>
          <HudCorners />
          <AnimatePresence mode="wait" initial={false}>
            {pending ? (
              <AuthScreen
                key="verify"
                title="Подтверждение"
                tagline="Введи код из письма, солдат"
                footer={<VerifyEmailFooter onChangeEmail={cancelVerification} />}
              >
                <VerifyEmailForm pending={pending} />
              </AuthScreen>
            ) : (
              <AuthScreen key={step} title={title} tagline={tagline} footer={footer}>
                {children}
              </AuthScreen>
            )}
          </AnimatePresence>
        </section>
      </main>
    </ConfigProvider>
  );
}
