import { MyPurchases } from '@features/MyPurchases';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Мои покупки');

export default function PurchasesPage() {
  return <MyPurchases />;
}
