import { CurrencyControl } from '@features/CurrencyControl';
import { RoleGuard } from '@/components/RoleGuard';
import { pageMetadata } from '@/shared/seo';
import { UserRole } from '@/shared/types';

export const metadata = pageMetadata('Кредиты');

// Лейаут (admin) пускает с ADMIN, списание кредитов бэк отдаёт только CURATOR+
export default function AdminCurrencyPage() {
  return (
    <RoleGuard minRole={UserRole.CURATOR}>
      <CurrencyControl />
    </RoleGuard>
  );
}
