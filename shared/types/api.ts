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
