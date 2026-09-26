import { Button } from 'antd';
import type { AccountCardProps } from './types';
import styles from './AccountCard.module.scss';

export function AccountCard({ onEdit }: AccountCardProps) {
  return (
    <>
      <p className={styles.text}>
        Позывной на сервере, Discord ID и ссылка на Steam — по ним командование и кураторы связываются с
        вами и выдают покупки.
      </p>
      <Button className={styles.action} onClick={onEdit}>
        Редактировать
      </Button>
    </>
  );
}
