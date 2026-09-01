import { CharterHeader } from '@widgets/CharterHeader';
import { LoginForm } from '@features/AuthControl';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Вход');

export default function LoginPage() {
  return (
    <>
      <CharterHeader />
      <LoginForm />
    </>
  );
}
