'use client';

import { Button, Form, Input, Modal } from 'antd';
import { PURCHASE_COMMENT_MAX } from '@/shared/constants';
import { ExternalLinkModal } from '@ui/ExternalLinkModal';
import { useResolvePurchaseModal } from './hooks/useResolvePurchaseModal';
import type { ResolveFormValues, ResolvePurchaseModalProps } from './types';
import styles from './ResolvePurchaseModal.module.scss';

export function ResolvePurchaseModal(props: ResolvePurchaseModalProps) {
  const { target, onClose } = props;
  const {
    form, submitting, shown, isReject, onFinish, externalUrl, openExternal, closeExternal,
  } = useResolvePurchaseModal(props);
  const actionLabel = isReject ? 'Отказать' : 'Выдать';

  return (
    <>
      <Modal
        open={target !== null}
        onCancel={onClose}
        centered
        mask={{ closable: false }}
        closable={!submitting}
        keyboard={!submitting}
        afterClose={() => form.resetFields()}
        title={
          shown
            ? `${actionLabel}: ${shown.purchase.donation.title} — ${shown.purchase.user.login}`
            : actionLabel
        }
        footer={null}
      >
        {shown && (
          <p className={styles.steamRow}>
            Steam покупателя:{' '}
            <a
              className={styles.steam}
              href={shown.purchase.steamUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => {
                event.preventDefault();
                openExternal(shown.purchase.steamUrl);
              }}
            >
              {shown.purchase.steamUrl}
            </a>
          </p>
        )}

        <Form<ResolveFormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          disabled={submitting}
          onFinish={onFinish}
        >
          <Form.Item
            name="resolution_comment"
            label={isReject ? 'Причина отказа' : 'Комментарий'}
            rules={[
              ...(isReject
                ? [{ required: true, whitespace: true, message: 'Укажите причину отказа' }]
                : []),
              { max: PURCHASE_COMMENT_MAX, message: 'Комментарий — до 500 символов' },
            ]}
          >
            <Input.TextArea
              rows={3}
              maxLength={PURCHASE_COMMENT_MAX}
              showCount
              placeholder={isReject ? 'Нет в наличии' : 'Выдано в игре'}
            />
          </Form.Item>

          <Button type="primary" danger={isReject} htmlType="submit" block loading={submitting}>
            {actionLabel}
          </Button>
        </Form>
      </Modal>

      <ExternalLinkModal url={externalUrl} onClose={closeExternal} />
    </>
  );
}
