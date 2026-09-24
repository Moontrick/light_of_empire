import { PurchasesControl } from '@features/PurchasesControl';
import { RoleGuard } from '@/components/RoleGuard';
import { pageMetadata } from '@/shared/seo';
import { UserRole } from '@/shared/types';

export const metadata = pageMetadata('Покупка доната');

// Лейаут (admin) пускает с ADMIN, очередь заявок бэк отдаёт только CURATOR+
export default function AdminPurchasesPage() {
  return (
    <RoleGuard minRole={UserRole.CURATOR}>
      <PurchasesControl />
    </RoleGuard>
  );
}
