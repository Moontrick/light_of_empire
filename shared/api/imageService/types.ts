export interface UploadedImageDto {
  // Ключ для полей `image` обложек: `<uuid>.<ext>`
  filename: string;
  // Относительный, от хоста API: /api/v1/image-service/<filename>
  url: string;
  mime: string;
  size: number;
}
