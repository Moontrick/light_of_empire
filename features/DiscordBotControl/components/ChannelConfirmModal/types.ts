import type { ChannelConfirmTarget } from '../../types';

export interface ChannelConfirmModalProps {
  target: ChannelConfirmTarget | null;
  confirming: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
