
import { pageMetadata } from '@/shared/seo';
import { Cookie } from '@/widgets/Cookie';

export const metadata = pageMetadata('Cookie политика', undefined, '/cookie');

export default function CookiePage() {
  return <Cookie />;
}
