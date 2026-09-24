import { RoleGuard } from '@/components/RoleGuard';
import { CaseContent } from '@/features/CasinoControl/components/CaseContent';
import { pageMetadata } from '@/shared/seo';
import { UserRole } from '@/shared/types';

export const metadata = pageMetadata('Казино');


export default function AdminCasinoPage() {
  return (
    <RoleGuard minRole={UserRole.ADMIN}>
      <CaseContent />
    </RoleGuard>
  );
}
