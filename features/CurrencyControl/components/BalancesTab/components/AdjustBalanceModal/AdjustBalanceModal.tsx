'use client';

import { Button, Form, Input, InputNumber, Modal } from 'antd';
import { CURRENCY_MAX_AMOUNT, CURRENCY_MESSAGE_MAX_LENGTH } from '@/shared/constants';
import { CreditsAmount } from '@ui/CreditsAmount';
import { useAdjustBalanceModal } from './hooks/useAdjustBalanceModal';
import type { AdjustBalanceFormValues, AdjustBalanceModalProps } from './types';
import styles from './AdjustBalanceModal.module.scss';

export function AdjustBalanceModal(props: AdjustBalanceModalProps) {
  const { target, onClose } = props;
  const { form, submitting, insufficient, onFinish, shown } = useAdjustBalanceModal(props);
  const isCredit = shown?.mode === 'credit';
  const actionLabel = isCredit ? 'Начислить' : 'Списать';

  return (
    <Modal
      open={target !== null}
      onCancel={onClose}
      centered
      afterClose={() => form.resetFields()}
      title={shown ? `${actionLabel}: ${shown.user.login}` : actionLabel}
      footer={null}
      mask={{ closable: false }}
      closable={!submitting}
      keyboard={!submitting}
    >
      {shown && (
        <p className={styles.current}>
          Текущий баланс: <CreditsAmount value={shown.user.balance} />
        </p>
      )}

      <Form<AdjustBalanceFormValues>
        form={form}
        layout="vertical"
        requiredMark={false}
        disabled={submitting}
        onFinish={onFinish}
      >
        <Form.Item
          name="amount"
          label="Сумма"
          style={{ width: '100%' }}
          
          rules={[
            { required: true, message: 'Укажите сумму' },
            {
              type: 'number',
              min: 1,
              max: CURRENCY_MAX_AMOUNT,
              message: `Сумма — от 1 до ${CURRENCY_MAX_AMOUNT.toLocaleString('ru-RU')}`,
            },
          ]}
          {...(insufficient
            ? { validateStatus: 'warning', help: 'На балансе меньше — сервер откажет в списании' }
            : {})}
        >
          <InputNumber
            className={styles.amount}
            min={1}
            width={'100%'}
            max={CURRENCY_MAX_AMOUNT}
            precision={0}
            placeholder={`От 1 до ${CURRENCY_MAX_AMOUNT.toLocaleString('ru-RU')}`}
          />
        </Form.Item>

        <Form.Item
          name="message"
          label="Описание"
          rules={[
            { required: true, whitespace: true, message: 'Укажите, за что операция' },
            { max: CURRENCY_MESSAGE_MAX_LENGTH, message: 'Описание — до 500 символов' },
          ]}
        >
          <Input.TextArea
            rows={3}
            maxLength={CURRENCY_MESSAGE_MAX_LENGTH}
            showCount
            placeholder={isCredit ? 'За победу в турнире 19.09' : 'Штраф за опоздание'}
          />
        </Form.Item>

        <Button
          type="primary"
          danger={!isCredit}
          htmlType="submit"
          block
          loading={submitting}
        >
          {actionLabel}
        </Button>
      </Form>
    </Modal>
  );
}
