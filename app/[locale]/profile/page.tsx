import { CabinetLayout } from '@widgets/CabinetLayout';
import { RoleGuard } from '@/components/RoleGuard';
import { ProfileControl } from '@features/ProfileControl';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Личный кабинет');

export default function ProfilePage() {
  return (
    <RoleGuard>
      <CabinetLayout wide>
        <ProfileControl />
      </CabinetLayout>
    </RoleGuard>
  );
}
