// Лимит image-service на один файл; проверяем до отправки, чтобы не гонять 5 МБ ради 400
export const IMAGE_UPLOAD_MAX_BYTES = 25 * 1024 * 1024;
export const IMAGE_UPLOAD_MAX_LABEL = '25 МБ';

export const IMAGE_UPLOAD_TOO_LARGE = `Файл больше ${IMAGE_UPLOAD_MAX_LABEL}`;
export const IMAGE_UPLOAD_FAILED = 'Не удалось загрузить изображение';
