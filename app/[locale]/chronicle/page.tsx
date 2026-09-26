import { Chronicle } from '@widgets/Chronicle';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Хроника военного похода', undefined, '/chronicle');

export default function ChroniclePage() {
  return <Chronicle />;
}
