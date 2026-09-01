import { UsersControl } from '@features/UsersControl';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Пользователи');

export default function AdminUsersPage() {
  return <UsersControl />;
}
