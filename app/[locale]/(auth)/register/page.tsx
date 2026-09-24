import { RegisterForm } from '@features/AuthControl';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Регистрация');

export default function RegisterPage() {
  return <RegisterForm />;
}
