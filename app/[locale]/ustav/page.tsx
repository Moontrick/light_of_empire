import { Charter } from '@widgets/Charter';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Устав Имперской Армии', undefined, '/ustav');

export default function UstavPage() {
  return <Charter />;
}
