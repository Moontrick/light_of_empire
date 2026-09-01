'use client';

import { Button, Form, Input } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import type { LoginDto } from '@/shared/api/auth';
import { AuthShell } from '../AuthShell';
import { useLoginForm } from './hooks/useLoginForm';

export function LoginForm() {
  const { onFinish, submitting } = useLoginForm();

  return (
    <AuthShell
      title="Вход"
      tagline="Доложись по форме, солдат"
      footer={
        <>
          Нет аккаунта? <Link href="/register">Регистрация</Link>
        </>
      }
    >
      <Form<LoginDto>
        layout="vertical"
        requiredMark={false}
        disabled={submitting}
        onFinish={onFinish}
      >
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
          <Input.Password autoComplete="current-password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={submitting}>
          Войти
        </Button>
      </Form>
    </AuthShell>
  );
}
