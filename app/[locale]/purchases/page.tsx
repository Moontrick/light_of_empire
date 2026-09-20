import { CabinetLayout } from '@widgets/CabinetLayout';
import { RoleGuard } from '@/components/RoleGuard';
import { MyPurchases } from '@features/MyPurchases';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Мои покупки');

export default function PurchasesPage() {
  return (
    <RoleGuard>
      <CabinetLayout wide>
        <MyPurchases />
      </CabinetLayout>
    </RoleGuard>
  );
}
