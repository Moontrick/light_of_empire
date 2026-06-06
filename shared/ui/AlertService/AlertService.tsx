'use client';

import { useEffect, useState } from 'react';
import { alertHandler } from '../../utils/alertHandler';
import { Alert } from '../Alert';
import styles from './AlertService.module.scss';

export function AlertService() {
  const [alerts, setAlerts] = useState(alertHandler.getAlerts());

  function handleDeleteAlert(id: string) {
    alertHandler.removeAlertById(id);
  }

  useEffect(() => {
    const updateAlerts = () => setAlerts([...alertHandler.getAlerts()]);
    alertHandler.subscribe(updateAlerts);
    return () => alertHandler.unsubscribe(updateAlerts);
  }, []);

  return (
    <div className={styles.alerts}>
      {alerts.map((item) => (
        <Alert
          key={item.id}
          status={item.status}
          title={item.message ?? item.defaultText}
          subTitle={item.subTitle}
          onClose={() => handleDeleteAlert(item.id)}
        />
      ))}
    </div>
  );
}
