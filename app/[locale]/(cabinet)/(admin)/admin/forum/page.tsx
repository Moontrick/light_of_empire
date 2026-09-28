import { ForumAdminControl } from '@features/ForumAdminControl';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Форум — управление');

export default function AdminForumPage() {
  return <ForumAdminControl />;
}
