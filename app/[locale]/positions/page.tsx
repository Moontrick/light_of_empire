import { CabinetLayout } from '@widgets/CabinetLayout';
import { RoleGuard } from '@/components/RoleGuard';
import { DirectoryControl } from '@features/DirectoryControl';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Должности');

export default function PositionsPage() {
  return (
    <RoleGuard>
      <CabinetLayout wide>
        <DirectoryControl kind="positions" />
      </CabinetLayout>
    </RoleGuard>
  );
}
