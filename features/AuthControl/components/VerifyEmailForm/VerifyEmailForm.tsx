'use client';

import { Button, Form, Input } from 'antd';
import { CODE_LENGTH } from '../../constants';
import { useVerifyEmailForm } from './hooks/useVerifyEmailForm';
import type { VerifyEmailFormProps, VerifyEmailFormValues } from './types';
import styles from './VerifyEmailForm.module.scss';

const digitsOnly = (value: string) => value.replace(/\D/g, '');

export function VerifyEmailForm(props: VerifyEmailFormProps) {
  const {
    form,
    email,
    submitting,
    resending,
    cooldown,
    codeExpired,
    expiresIn,
    onFinish,
    onCodeComplete,
    resend,
  } = useVerifyEmailForm(props);

  return (
    <Form<VerifyEmailFormValues>
      form={form}
      layout="vertical"
      requiredMark={false}
      disabled={submitting}
      onFinish={onFinish}
    >
      <p className={styles.lead}>
        Код отправлен на <strong className={styles.email}>{email}</strong>
      </p>

      <Form.Item
        name="code"
        className={styles.codeItem}
        rules={[
          { required: true, message: 'Введите код из письма' },
          { pattern: /^\d{6}$/, message: 'Код — 6 цифр' },
        ]}
      >
        <Input.OTP
          length={CODE_LENGTH}
          size="large"
          autoFocus
          inputMode="numeric"
          formatter={digitsOnly}
          disabled={submitting || codeExpired}
          onChange={onCodeComplete}
        />
      </Form.Item>

      <p className={styles.status}>
        {codeExpired && <span className={styles.expired}>Код недействителен — запросите новый</span>}
        {!codeExpired && expiresIn && <>Код действует ещё {expiresIn}</>}
        {!codeExpired && !expiresIn && <>Введите код из письма</>}
      </p>

      <Button
        type="primary"
        htmlType="submit"
        block
        loading={submitting}
        disabled={codeExpired}
      >
        Подтвердить
      </Button>

      <Button
        type="link"
        block
        className={styles.resend}
        loading={resending}
        disabled={submitting || resending || cooldown > 0}
        onClick={resend}
      >
        {cooldown > 0 ? `Отправить ещё раз через ${cooldown} с` : 'Отправить ещё раз'}
      </Button>
    </Form>
  );
}
