import type { ButtonProps } from 'antd';

export interface NewsDiscordActionsProps {
  sent: boolean;
  loading: boolean;
  disabled?: boolean;
  size?: ButtonProps['size'];
  onSend: () => void;
  onCancel: () => void;
}
