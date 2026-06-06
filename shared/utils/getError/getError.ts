import { AxiosError } from 'axios';

type ApiErrorBody = {
  statusCode?: number;
  error?: string;
  message?: string | { message?: string | string[] };
  errors?: string[];
  detail?: string;
  path?: string;
  timestamp?: string;
};

export function getError(error?: unknown): string | null {
  if (error && typeof error === 'object') {
    if ('isAxiosError' in error && (error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.data) {
        const data = axiosError.response.data as ApiErrorBody;

        if (data?.message) {
          if (typeof data.message === 'string') {
            return data.message;
          }
          if (typeof data.message === 'object' && data.message.message) {
            const msg = data.message.message;
            if (typeof msg === 'string') {
              return msg;
            }
            if (Array.isArray(msg) && msg.length > 0) {
              return msg[0];
            }
          }
        }
        if (data?.detail && typeof data.detail === 'string') {
          return data.detail;
        }
        return null;
      }

      return null;
    }

    if (error instanceof Error) {
      return error.message;
    }
  }

  return null;
}

export function getErrorList(error?: unknown): string[] | null {
  if (
    error &&
    typeof error === 'object' &&
    'isAxiosError' in error &&
    (error as AxiosError).isAxiosError
  ) {
    const data = (error as AxiosError).response?.data as ApiErrorBody | undefined;
    if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors;
    }
  }
  return null;
}
