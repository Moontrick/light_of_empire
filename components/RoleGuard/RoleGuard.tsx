'use client';

import { ConfigProvider, Spin } from 'antd';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import { useRoleGuard } from './hooks/useRoleGuard';
import type { RoleGuardProps } from './types';
import styles from './RoleGuard.module.scss';

export function RoleGuard({ minRole, children }: RoleGuardProps) {
  const { pending, allowed } = useRoleGuard(minRole);

  if (pending) {
    return (
      <ConfigProvider theme={DARK_FORM_THEME}>
        <div className={styles.pending}>
          <Spin size="large" />
        </div>
      </ConfigProvider>
    );
  }

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}
