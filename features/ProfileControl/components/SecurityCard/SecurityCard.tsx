'use client';

import { useState } from 'react';
import { Button } from 'antd';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import styles from './SecurityCard.module.scss';

export function SecurityCard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <p className={styles.text}>
        После смены пароля все активные сессии будут завершены — потребуется войти
        заново.
      </p>
      <Button onClick={() => setModalOpen(true)}>Сменить пароль</Button>
      <ChangePasswordModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
