export interface CoverPickerProps {
  previewUrl: string | null;
  processing: boolean;
  onPick: (file: File) => void;
  onClear: () => void;
}
