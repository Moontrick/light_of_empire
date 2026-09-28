export interface AttachmentListProps {
  // src из блоков image (относительные url image-service)
  images: string[];
  disabled?: boolean;
  onRemove: (index: number) => void;
}
