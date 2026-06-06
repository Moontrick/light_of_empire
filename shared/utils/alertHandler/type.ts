import { ReactNode } from 'react';

export enum AlertStatus {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export type AlertMessage = {
  id: string;
  message: string | null;
  status: `${AlertStatus}`;
  defaultText: string;
  subTitle?: ReactNode;
};

export type AddAlert = {
  alert?: unknown;
  status?: `${AlertStatus}`;
  defaultText?: string;
  subTitle?: ReactNode;
};

export type AlertChangeListener = () => void;
