import { NewsEditor } from '@features/NewsEditor';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Новая новость');

export default function AdminNewsCreatePage() {
  return <NewsEditor />;
}
