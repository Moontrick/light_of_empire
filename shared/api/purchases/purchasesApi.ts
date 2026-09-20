import type { PaginatedResponse } from '@/shared/types';
import { baseService } from '../api';
import { PURCHASES_ROUTES } from './routes';
import type {
  CreatePurchaseDto,
  MyPurchasesQuery,
  PurchaseDto,
  PurchaseFullDto,
  PurchasesQuery,
  ResolvePurchaseDto,
} from './types';

export const purchasesApi = {
  create: (dto: CreatePurchaseDto) => baseService.post<PurchaseDto>(PURCHASES_ROUTES.CREATE, dto),

  getMy: (params: MyPurchasesQuery) =>
    baseService.get<PaginatedResponse<PurchaseDto>>(PURCHASES_ROUTES.MY, { params }),

  getAll: (params: PurchasesQuery) =>
    baseService.get<PaginatedResponse<PurchaseFullDto>>(PURCHASES_ROUTES.LIST, { params }),

  resolve: (id: number, dto: ResolvePurchaseDto) =>
    baseService.patch<PurchaseFullDto>(PURCHASES_ROUTES.STATUS(id), dto),
};
