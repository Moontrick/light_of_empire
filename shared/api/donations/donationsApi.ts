import type { StatusResponse } from '@/shared/types';
import { baseService } from '../api';
import { DONATIONS_ROUTES } from './routes';
import type {
  CreateDonationDto,
  DonationDetailDto,
  DonationImageDto,
  DonationListItemDto,
  DonationListParams,
  UpdateDonationDto,
} from './types';

export const donationsApi = {
  getList: (params?: DonationListParams) =>
    baseService.get<DonationListItemDto[]>(DONATIONS_ROUTES.LIST, { params }),

  getById: (id: number) => baseService.get<DonationDetailDto>(DONATIONS_ROUTES.DETAIL(id)),

  create: (dto: CreateDonationDto) =>
    baseService.post<DonationDetailDto>(DONATIONS_ROUTES.LIST, dto),

  update: (id: number, dto: UpdateDonationDto) =>
    baseService.put<DonationDetailDto>(DONATIONS_ROUTES.DETAIL(id), dto),

  // Файл уходит сразу в донат, отдельный POST /image-service не нужен
  addImage: (id: number, file: File | Blob) => {
    const form = new FormData();
    form.append('image', file);
    return baseService.post<DonationImageDto>(DONATIONS_ROUTES.IMAGES(id), form);
  },

  deleteImage: (id: number, imageId: number) =>
    baseService.delete<StatusResponse>(DONATIONS_ROUTES.DELETE_IMAGE(id, imageId)),
};
