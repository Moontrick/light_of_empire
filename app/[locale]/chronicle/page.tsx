import { Chronicle } from '@widgets/Chronicle';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Хроника военного похода');

export default function ChroniclePage() {
  return <Chronicle />;
}
