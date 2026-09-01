import { CabinetLayout } from '@widgets/CabinetLayout';
import { RoleGuard } from '@/components/RoleGuard';
import { UserRole } from '@/shared/types';
import type { AdminLayoutProps } from './types';

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <RoleGuard minRole={UserRole.ADMIN}>
      <CabinetLayout wide>{children}</CabinetLayout>
    </RoleGuard>
  );
}
