import { Hub } from '@widgets/Hub';
import { extraContent } from '@widgets/Hub/content/extra';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Дополнительно');

export default function ExtraPage() {
  return <Hub content={extraContent} />;
}
