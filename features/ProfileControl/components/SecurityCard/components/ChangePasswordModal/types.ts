import type { ChangePasswordDto } from '@/shared/api/users';

export interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export interface ChangePasswordFormValues extends ChangePasswordDto {
  confirm: string;
}
