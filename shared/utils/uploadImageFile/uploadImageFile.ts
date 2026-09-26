import { imageServiceApi, type UploadedImageDto } from '@/shared/api/imageService';
import { IMAGE_UPLOAD_MAX_BYTES, IMAGE_UPLOAD_TOO_LARGE } from '@/shared/constants/images';
import { getApiErrorMessage } from '../getApiErrorMessage';

// Единая точка загрузки картинок редакторами: проверка размера до запроса,
// любая ошибка приходит вызывающему уже как Error с русским текстом для алерта
// (400 бэка несёт причину в message — не картинка, формат, размер)
export async function uploadImageFile(file: File): Promise<UploadedImageDto> {
  if (file.size > IMAGE_UPLOAD_MAX_BYTES) {
    throw new Error(IMAGE_UPLOAD_TOO_LARGE);
  }

  try {
    const { data } = await imageServiceApi.upload(file);
    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}
