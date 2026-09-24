'use client';

import { ContentSkeleton } from '@ui/ContentSkeleton';
import { useRoleGuard } from './hooks/useRoleGuard';
import type { RoleGuardProps } from './types';

export function RoleGuard({ minRole, children }: RoleGuardProps) {
  const { pending, allowed } = useRoleGuard(minRole);

  if (pending) {
    return <ContentSkeleton />;
  }

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}
