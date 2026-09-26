'use client';

import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import type { RegisterDto } from '@/shared/api/auth';
import { AuthShell } from '../AuthShell';
import { useRegisterForm } from './hooks/useRegisterForm';

export function RegisterForm() {
  const { onFinish, submitting } = useRegisterForm();

  return (
    <AuthShell
      step="register"
      title="Регистрация"
      tagline="Вступай в ряды Империи"
      footer={
        <>
          Уже есть аккаунт? <Link href="/login">Войти</Link>
        </>
      }
    >
      <Form<RegisterDto>
        layout="vertical"
        requiredMark={false}
        disabled={submitting}
        onFinish={onFinish}
        initialValues={{
          subscribeToNews: true,
        }}
      >
        <Form.Item
          name="login"
          label="Позывной на сервере"
          rules={[
            { required: true, message: 'Укажите позывной на сервере' },
            { min: 2, max: 100, message: 'Длина — от 2 до 100 символов' },
          ]}
        >
          <Input autoComplete="username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Укажите email' },
            { type: 'email', message: 'Некорректный email' },
          ]}
        >
          <Input autoComplete="email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            { required: true, message: 'Укажите пароль' },
            { min: 6, max: 72, message: 'Пароль — от 6 до 72 символов' },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          name="acceptPolicy"
          valuePropName="checked"
          rules={[
            {
              validator: (_, checked) =>
                checked
                  ? Promise.resolve()
                  : Promise.reject(
                    new Error('Необходимо принять пользовательское соглашение'),
                  ),
            },
          ]}
        >
          <Checkbox>
            Я принимаю{' '}
            <Link href="/terms" target="_blank">
              пользовательское соглашение
            </Link>{' '}
            и{' '}
            <Link href="/privacy" target="_blank">
              политику конфиденциальности
            </Link>
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="subscribeToNews"
          valuePropName="checked"
        >
          <Checkbox checked={true}>
            Хочу получать новости и информацию об обновлениях сервера
          </Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={submitting}>
          Создать аккаунт
        </Button>
      </Form>
    </AuthShell>
  );
}
