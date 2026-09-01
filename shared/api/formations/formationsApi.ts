import type { Formation, StatusResponse } from '@/shared/types';
import { baseService } from '../api';
import { FORMATIONS_ROUTES } from './routes';
import type { CreateFormationDto, UpdateFormationDto } from './types';

export const formationsApi = {
  getFormations: () => baseService.get<Formation[]>(FORMATIONS_ROUTES.LIST),

  createFormation: (dto: CreateFormationDto) =>
    baseService.post<Formation>(FORMATIONS_ROUTES.CREATE, dto),

  updateFormation: (id: number, dto: UpdateFormationDto) =>
    baseService.patch<Formation>(FORMATIONS_ROUTES.UPDATE(id), dto),

  deleteFormation: (id: number) =>
    baseService.delete<StatusResponse>(FORMATIONS_ROUTES.DELETE(id)),
};
