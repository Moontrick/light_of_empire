import { DonationEditor } from '@features/DonationEditor';
import { RoleGuard } from '@/components/RoleGuard';
import { pageMetadata } from '@/shared/seo';
import { UserRole } from '@/shared/types';

export const metadata = pageMetadata('Редактирование товара');

interface AdminDonationEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminDonationEditPage({ params }: AdminDonationEditPageProps) {
  const { id } = await params;

  return (
    <RoleGuard minRole={UserRole.OWNER}>
      {/* Невалидный id (NaN) распознаёт и показывает «не найдено» сам DonationEditor */}
      <DonationEditor id={Number(id)} />
    </RoleGuard>
  );
}
