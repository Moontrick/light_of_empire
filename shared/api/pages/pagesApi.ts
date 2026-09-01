import type { StatusResponse } from '@/shared/types';
import { baseService } from '../api';
import { PAGES_ROUTES } from './routes';
import type {
  CreatePageDto,
  CreatePageSectionDto,
  PageDto,
  PageSectionDto,
  PageTreeNodeDto,
  ReorderPagesDto,
  UpdatePageDto,
  UpdatePageSectionDto,
} from './types';

export const pagesApi = {
  getTree: () => baseService.get<PageTreeNodeDto[]>(PAGES_ROUTES.PAGES),

  getPage: (slug: string) => baseService.get<PageDto>(PAGES_ROUTES.PAGE(slug)),

  createPage: (dto: CreatePageDto) => baseService.post<PageDto>(PAGES_ROUTES.PAGES, dto),

  updatePage: (id: number, dto: UpdatePageDto) =>
    baseService.put<PageDto>(PAGES_ROUTES.PAGE_BY_ID(id), dto),

  reorderPages: (dto: ReorderPagesDto) =>
    baseService.put<StatusResponse>(PAGES_ROUTES.PAGES_ORDER, dto),

  deletePage: (id: number) => baseService.delete<StatusResponse>(PAGES_ROUTES.PAGE_BY_ID(id)),

  createSection: (pageId: number, dto: CreatePageSectionDto) =>
    baseService.post<PageSectionDto>(PAGES_ROUTES.PAGE_SECTIONS(pageId), dto),

  updateSection: (id: number, dto: UpdatePageSectionDto) =>
    baseService.put<PageSectionDto>(PAGES_ROUTES.SECTION(id), dto),

  reorderSections: (pageId: number, ids: number[]) =>
    baseService.put<StatusResponse>(PAGES_ROUTES.SECTIONS_ORDER(pageId), { ids }),

  deleteSection: (id: number) => baseService.delete<StatusResponse>(PAGES_ROUTES.SECTION(id)),
};
