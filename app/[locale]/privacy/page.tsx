
import { pageMetadata } from '@/shared/seo';
import { Privacy } from '@/widgets/Privacy';

export const metadata = pageMetadata('Политика конфиденциальности', undefined, '/privacy');

export default function PrivacyPage() {
  return <Privacy />;
}
