import { DonationEditor } from '@features/DonationEditor';
import { RoleGuard } from '@/components/RoleGuard';
import { pageMetadata } from '@/shared/seo';
import { UserRole } from '@/shared/types';

export const metadata = pageMetadata('Новый товар');

export default function AdminDonationCreatePage() {
  return (
    <RoleGuard minRole={UserRole.OWNER}>
      <DonationEditor />
    </RoleGuard>
  );
}
