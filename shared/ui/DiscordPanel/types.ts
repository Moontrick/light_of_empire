export interface DiscordPanelProps {
  sent: boolean;
  loading: boolean;
  disabled: boolean;
  onSend: () => void;
  onCancel: () => void;
}
