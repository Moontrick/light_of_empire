import { ProfileControl } from '@features/ProfileControl';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Личный кабинет');

export default function ProfilePage() {
  return <ProfileControl />;
}
