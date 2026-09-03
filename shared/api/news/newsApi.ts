import type { StatusResponse } from '@/shared/types';
import { baseService } from '../api';
import { NEWS_ROUTES } from './routes';
import type {
  CreateNewsDto,
  NewsDetailDto,
  NewsListParams,
  NewsListResponseDto,
  UpdateNewsDto,
} from './types';

export const newsApi = {
  getNewsList: (params?: NewsListParams) =>
    baseService.get<NewsListResponseDto>(NEWS_ROUTES.LIST, { params }),

  getNewsBySlug: (slug: string) =>
    baseService.get<NewsDetailDto>(NEWS_ROUTES.DETAIL(slug)),

  createNews: (dto: CreateNewsDto) => baseService.post(NEWS_ROUTES.CREATE, dto),

  updateNews: (id: number, dto: UpdateNewsDto) =>
    baseService.put(NEWS_ROUTES.UPDATE(id), dto),

  archiveNews: (id: number) =>
    baseService.delete<StatusResponse>(NEWS_ROUTES.ARCHIVE(id)),

  sendToDiscord: (id: number) => baseService.put(NEWS_ROUTES.SEND_TO_DISCORD(id)),

  changeSendToDiscordStatus: (id: number) =>
    baseService.put(NEWS_ROUTES.CHANGE_SEND_TO_DISCORD_STATUS(id)),
};

export function getNewsCoverUrl(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  return `${process.env.NEXT_PUBLIC_BACK_PROD || ''}${imageUrl}`;
}
