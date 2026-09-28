export interface LockReasonModalProps {
  open: boolean;
  loading: boolean;
  onSubmit: (reason: string) => void;
  onCancel: () => void;
}
