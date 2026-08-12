'use client';

import { useCallback } from 'react';
import { alertHandler } from '@/shared/utils/alertHandler';
import { STATUS_COPY_FAILURE, STATUS_COPY_SUCCESS } from '../../../constants';

export function useCopyAddress(address: string) {
  return useCallback(async () => {
    // clipboard недоступен по http и в старых браузерах — не даём упасть,
    // а сообщаем пользователю, что копировать придётся вручную.
    if (!navigator.clipboard) {
      alertHandler.addAlert({ status: 'error', defaultText: STATUS_COPY_FAILURE });
      return;
    }

    try {
      await navigator.clipboard.writeText(address);
      alertHandler.addAlert({ status: 'success', defaultText: STATUS_COPY_SUCCESS });
    } catch {
      alertHandler.addAlert({ status: 'error', defaultText: STATUS_COPY_FAILURE });
    }
  }, [address]);
}
