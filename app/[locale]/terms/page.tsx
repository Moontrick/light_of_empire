
import { pageMetadata } from '@/shared/seo';
import { Terms } from '@/widgets/Terms';

export const metadata = pageMetadata('Пользовательское соглашение', undefined, '/terms');

export default function TermsPage() {
  return <Terms />;
}
