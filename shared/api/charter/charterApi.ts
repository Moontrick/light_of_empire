import type { StatusResponse } from '@/shared/types';
import { baseService } from '../api';
import { CHARTER_ROUTES } from './routes';
import type {
  CharterDto,
  CharterSectionDto,
  CharterWrapperDto,
  CreateSectionDto,
  UpdateCharterDto,
  UpdateSectionDto,
} from './types';

export const charterApi = {
  getCharter: () => baseService.get<CharterDto>(CHARTER_ROUTES.CHARTER),

  updateCharter: (dto: UpdateCharterDto) =>
    baseService.put<CharterWrapperDto>(CHARTER_ROUTES.CHARTER, dto),

  createSection: (dto: CreateSectionDto) =>
    baseService.post<CharterSectionDto>(CHARTER_ROUTES.SECTIONS, dto),

  updateSection: (id: number, dto: UpdateSectionDto) =>
    baseService.put<CharterSectionDto>(CHARTER_ROUTES.SECTION(id), dto),

  reorderSections: (ids: number[]) =>
    baseService.put<StatusResponse>(CHARTER_ROUTES.SECTIONS_ORDER, { ids }),

  deleteSection: (id: number) =>
    baseService.delete<StatusResponse>(CHARTER_ROUTES.SECTION(id)),
};
