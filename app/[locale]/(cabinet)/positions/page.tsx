import { DirectoryControl } from '@features/DirectoryControl';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Должности');

export default function PositionsPage() {
  return <DirectoryControl kind="positions" />;
}
