'use client';

import { useEffect } from 'react';
import { ConfigProvider, notification } from 'antd';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import { alertHandler } from '../../utils/alertHandler';
import type { AlertMessage } from '../../utils/alertHandler/type';

const ALERT_DURATION_SECONDS = 7;
const STACK_THRESHOLD = 3;

export function AlertService() {
  const [api, contextHolder] = notification.useNotification({
    stack: { threshold: STACK_THRESHOLD },
  });

  useEffect(() => {
    const show = (alert: AlertMessage) => {
      api[alert.status]({
        key: alert.id,
        title: alert.message,
        description: alert.subTitle,
        placement: 'topRight',
        duration: ALERT_DURATION_SECONDS,
      });
    };

    alertHandler.subscribe(show);
    return () => alertHandler.unsubscribe(show);
  }, [api]);

  return <ConfigProvider theme={DARK_FORM_THEME}>{contextHolder}</ConfigProvider>;
}
