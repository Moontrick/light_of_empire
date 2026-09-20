'use client';

import { Button, Form, Input, Modal } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import { PURCHASE_COMMENT_MAX, PURCHASE_STATUS_LABELS } from '@/shared/constants';
import { CreditsAmount } from '@ui/CreditsAmount';
import { usePurchaseModal } from './hooks/usePurchaseModal';
import type { PurchaseFormValues, PurchaseModalProps } from './types';
import styles from './PurchaseModal.module.scss';

export function PurchaseModal(props: PurchaseModalProps) {
  const { donation, open, onClose } = props;
  const { form, submitting, created, balance, balanceAfter, onFinish, reset } =
    usePurchaseModal(props);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      afterClose={reset}
      centered
      mask={{ closable: false }}
      closable={!submitting}
      keyboard={!submitting}
      title={created ? 'Заявка создана' : `Купить: ${donation.title}`}
      footer={null}
    >
      {created ? (
        <div className={styles.done}>
          <p className={styles.doneText}>
            Заявка №{created.id} создана, статус: {PURCHASE_STATUS_LABELS[created.status]}.
            Куратор свяжется с вами по Steam и выдаст товар.
          </p>
          <div className={styles.doneActions}>
            <Link href="/purchases" className={styles.primaryLink}>
              Мои покупки
            </Link>
            <Button onClick={onClose}>Закрыть</Button>
          </div>
        </div>
      ) : (
        <>
          <dl className={styles.summary}>
            <dt>Цена</dt>
            <dd>
              <CreditsAmount value={donation.price} />
            </dd>
            <dt>Баланс</dt>
            <dd>
              <CreditsAmount value={balance} />
            </dd>
            <dt>После покупки</dt>
            <dd>
              <CreditsAmount value={balanceAfter} />
            </dd>
          </dl>

          <Form<PurchaseFormValues>
            form={form}
            layout="vertical"
            requiredMark={false}
            disabled={submitting}
            onFinish={onFinish}
          >
            <Form.Item
              name="user_comment"
              label="Комментарий"
              rules={[{ max: PURCHASE_COMMENT_MAX, message: 'Комментарий — до 500 символов' }]}
            >
              <Input.TextArea
                rows={3}
                maxLength={PURCHASE_COMMENT_MAX}
                showCount
                placeholder="Например, ник в игре"
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" block loading={submitting}>
              Купить
            </Button>
          </Form>
        </>
      )}
    </Modal>
  );
}
