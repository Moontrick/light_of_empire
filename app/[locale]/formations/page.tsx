import { CabinetLayout } from '@widgets/CabinetLayout';
import { RoleGuard } from '@/components/RoleGuard';
import { DirectoryControl } from '@features/DirectoryControl';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Формирования');

export default function FormationsPage() {
  return (
    <RoleGuard>
      <CabinetLayout wide>
        <DirectoryControl kind="formations" />
      </CabinetLayout>
    </RoleGuard>
  );
}
