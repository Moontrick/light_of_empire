import axios, { InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';
import { clearAccessToken, getAccessToken, setAccessToken } from './accessToken';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
  }
}

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  skipAuthRefresh?: boolean;
  retriedAfterRefresh?: boolean;
};

export const baseService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACK_PROD || ''}/api/v1`,
  withCredentials: true,
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: 'repeat', encode: false }),
});

let refreshPromise: Promise<string> | null = null;

export function refreshSession(): Promise<string> {
  refreshPromise ??= baseService
    .post<{ access_token: string }>('/auth/refresh', undefined, {
      skipAuthRefresh: true,
    })
    .then(({ data }) => {
      setAccessToken(data.access_token);
      return data.access_token;
    })
    .catch((error) => {
      clearAccessToken();
      throw error;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

baseService.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

baseService.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (axios.isCancel(error) || !axios.isAxiosError(error)) {
      return Promise.reject(error);
    }
    if (error.code === 'ERR_CANCELED') {
      return Promise.reject(error);
    }

    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (
      !originalRequest ||
      error.response?.status !== 401 ||
      originalRequest.skipAuthRefresh ||
      originalRequest.retriedAfterRefresh
    ) {
      return Promise.reject(error);
    }

    originalRequest.retriedAfterRefresh = true;

    try {
      const token = await refreshSession();
      originalRequest.headers.set('Authorization', `Bearer ${token}`);
      return baseService(originalRequest);
    } catch {
      const { useAuthStore } = await import('../store/authStore');
      useAuthStore.getState().reset();
      return Promise.reject(error);
    }
  },
);
