import { baseService } from '../api';
import { IMAGE_SERVICE_ROUTES } from './routes';
import type { UploadedImageDto } from './types';

export const imageServiceApi = {
  // multipart, поле `image`; Content-Type с boundary axios выставит сам
  upload: (file: Blob | File) => {
    const form = new FormData();
    form.append('image', file);
    return baseService.post<UploadedImageDto>(IMAGE_SERVICE_ROUTES.UPLOAD, form);
  },
};
