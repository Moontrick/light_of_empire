import type { UserProfile } from '@/shared/types';
import type { AccountField } from '../../types';

export interface EditAccountModalProps {
  open: boolean;
  // Поле, получающее фокус при открытии (клик по Discord/Steam в шапке профиля)
  focusField?: AccountField;
  user: UserProfile;
  onClose: () => void;
}
