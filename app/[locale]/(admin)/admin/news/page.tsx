import { NewsControl } from '@features/NewsControl';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Новости — управление');

export default function AdminNewsPage() {
  return <NewsControl />;
}
