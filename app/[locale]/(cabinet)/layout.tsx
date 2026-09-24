import { CabinetLayout } from '@widgets/CabinetLayout';
import { RoleGuard } from '@/components/RoleGuard';
import type { CabinetGroupLayoutProps } from './types';

// Сайдбар — часть лейаута и переживает навигацию; гвард охраняет только контент,
// поэтому ожидание сессии и переходы показывают скелет в области контента
export default function CabinetGroupLayout({ children }: CabinetGroupLayoutProps) {
  return (
    <CabinetLayout>
      <RoleGuard>{children}</RoleGuard>
    </CabinetLayout>
  );
}
