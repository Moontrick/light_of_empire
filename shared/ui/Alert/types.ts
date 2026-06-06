import { AlertStatus } from '@/shared/utils/alertHandler/type';
import { ReactNode } from 'react';

export type AlertProps = {
  status: `${AlertStatus}`;
  title: string;
  action?: ReactNode;
  children?: ReactNode;
};
