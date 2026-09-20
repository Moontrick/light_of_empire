// Единый формат ошибок API (см. раздел Auth в CLAUDE.md).
// message допускает вложенный объект — защита от нестандартных ответов прокси.
export interface StatusResponse {
  status: string;
}

export type ApiErrorBody = {
  statusCode?: number;
  error?: string;
  message?: string | { message?: string | string[] };
  errors?: string[];
  detail?: string;
  path?: string;
  timestamp?: string;
};

// Общий формат постраничных списков (валюта, покупки)
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
