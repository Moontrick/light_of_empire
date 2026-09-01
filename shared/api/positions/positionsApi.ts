import type { Position, StatusResponse } from '@/shared/types';
import { baseService } from '../api';
import { POSITIONS_ROUTES } from './routes';
import type { CreatePositionDto, UpdatePositionDto } from './types';

export const positionsApi = {
  getPositions: () => baseService.get<Position[]>(POSITIONS_ROUTES.LIST),

  createPosition: (dto: CreatePositionDto) =>
    baseService.post<Position>(POSITIONS_ROUTES.CREATE, dto),

  updatePosition: (id: number, dto: UpdatePositionDto) =>
    baseService.patch<Position>(POSITIONS_ROUTES.UPDATE(id), dto),

  deletePosition: (id: number) =>
    baseService.delete<StatusResponse>(POSITIONS_ROUTES.DELETE(id)),
};
