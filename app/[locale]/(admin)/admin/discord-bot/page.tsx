import { DiscordBotControl } from '@features/DiscordBotControl';
import { RoleGuard } from '@/components/RoleGuard';
import { pageMetadata } from '@/shared/seo';
import { UserRole } from '@/shared/types';

export const metadata = pageMetadata('Настройки бота');

// Лейаут (admin) пускает с ADMIN, настройки бота бэк отдаёт только OWNER+
export default function AdminDiscordBotPage() {
  return (
    <RoleGuard minRole={UserRole.OWNER}>
      <DiscordBotControl />
    </RoleGuard>
  );
}
