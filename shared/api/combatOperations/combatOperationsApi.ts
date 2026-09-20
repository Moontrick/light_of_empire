import type { StatusResponse } from '@/shared/types';
import { baseService } from '../api';
import { COMBAT_OPERATIONS_ROUTES } from './routes';
import type {
  CombatOperationDetailDto,
  CombatOperationListParams,
  CombatOperationListResponseDto,
  CreateCombatOperationDto,
  UpdateCombatOperationDto,
} from './types';

export const combatOperationsApi = {
  getList: (params?: CombatOperationListParams) =>
    baseService.get<CombatOperationListResponseDto>(COMBAT_OPERATIONS_ROUTES.LIST, { params }),

  getBySlug: (slug: string) =>
    baseService.get<CombatOperationDetailDto>(COMBAT_OPERATIONS_ROUTES.DETAIL(slug)),

  create: (dto: CreateCombatOperationDto) =>
    baseService.post<CombatOperationDetailDto>(COMBAT_OPERATIONS_ROUTES.CREATE, dto),

  update: (id: number, dto: UpdateCombatOperationDto) =>
    baseService.put<CombatOperationDetailDto>(COMBAT_OPERATIONS_ROUTES.UPDATE(id), dto),

  archive: (id: number) =>
    baseService.delete<StatusResponse>(COMBAT_OPERATIONS_ROUTES.ARCHIVE(id)),

  sendToDiscord: (id: number) =>
    baseService.put<StatusResponse>(COMBAT_OPERATIONS_ROUTES.SEND_TO_DISCORD(id)),

  changeSendToDiscordStatus: (id: number) =>
    baseService.put<StatusResponse>(COMBAT_OPERATIONS_ROUTES.CHANGE_SEND_TO_DISCORD_STATUS(id)),
};
