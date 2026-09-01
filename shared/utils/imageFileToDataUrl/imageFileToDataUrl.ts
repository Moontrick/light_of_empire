interface ImageFileToDataUrlOptions {
  maxWidth?: number;
  quality?: number;
}

// Ресайз на клиенте: data-URL уходит прямо в JSON новости,
// без ужатия документ разду­вается на мегабайты
export function imageFileToDataUrl(
  file: File,
  { maxWidth = 1600, quality = 0.85 }: ImageFileToDataUrlOptions = {},
): Promise<string> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, maxWidth / image.naturalWidth);
      const width = Math.round(image.naturalWidth * scale);
      const height = Math.round(image.naturalHeight * scale);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('Canvas 2d context недоступен'));
        return;
      }
      context.drawImage(image, 0, 0, width, height);

      // PNG сохраняет прозрачность, остальное ужимаем в JPEG
      const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      resolve(canvas.toDataURL(mime, quality));
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Не удалось прочитать изображение'));
    };

    image.src = objectUrl;
  });
}
