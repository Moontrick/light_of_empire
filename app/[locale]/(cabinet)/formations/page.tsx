import { DirectoryControl } from '@features/DirectoryControl';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Формирования');

export default function FormationsPage() {
  return <DirectoryControl kind="formations" />;
}
