'use client';

import { Button, Form, Input, Modal } from 'antd';
import { useChangePasswordModal } from './hooks/useChangePasswordModal';
import type { ChangePasswordFormValues, ChangePasswordModalProps } from './types';

export function ChangePasswordModal({ open, onClose }: ChangePasswordModalProps) {
  const { form, onFinish, submitting } = useChangePasswordModal(onClose);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      afterClose={() => form.resetFields()}
      title="Смена пароля"
      footer={null}
    >
      <Form<ChangePasswordFormValues>
        form={form}
        layout="vertical"
        requiredMark={false}
        disabled={submitting}
        onFinish={onFinish}
      >
        <Form.Item
          name="current_password"
          label="Текущий пароль"
          rules={[{ required: true, message: 'Укажите текущий пароль' }]}
        >
          <Input.Password autoComplete="current-password" />
        </Form.Item>

        <Form.Item
          name="new_password"
          label="Новый пароль"
          rules={[
            { required: true, message: 'Укажите новый пароль' },
            { min: 6, max: 72, message: 'Пароль — от 6 до 72 символов' },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Повторите новый пароль"
          dependencies={['new_password']}
          rules={[
            { required: true, message: 'Повторите новый пароль' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={submitting}>
          Сменить пароль
        </Button>
      </Form>
    </Modal>
  );
}
