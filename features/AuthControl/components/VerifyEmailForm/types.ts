import type { PendingVerification } from '@store/authStore';

export interface VerifyEmailFormProps {
  pending: PendingVerification;
}

export interface VerifyEmailFormValues {
  code: string;
}
