import { DonationsControl } from '@features/DonationsControl';
import { RoleGuard } from '@/components/RoleGuard';
import { pageMetadata } from '@/shared/seo';
import { UserRole } from '@/shared/types';

export const metadata = pageMetadata('Донат');

// Лейаут (admin) пускает с ADMIN, карточки товаров правит только OWNER+
export default function AdminDonationsPage() {
  return (
    <RoleGuard minRole={UserRole.OWNER}>
      <DonationsControl />
    </RoleGuard>
  );
}
