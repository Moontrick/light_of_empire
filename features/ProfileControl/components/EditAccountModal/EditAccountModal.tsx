'use client';

import { Button, Form, Input, Modal } from 'antd';
import { IconDiscord } from '@/public/icons/IconDiscord';
import { IconSteam } from '@/public/icons/IconSteam';
import type { UpdateProfileDto } from '@/shared/api/users';
import { useEditAccountModal } from './hooks/useEditAccountModal';
import type { EditAccountModalProps } from './types';

export function EditAccountModal({ open, focusField, user, onClose }: EditAccountModalProps) {
  const { onFinish, submitting } = useEditAccountModal(onClose);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      // Форма пересоздаётся при каждом открытии: подхватывает свежие данные и autoFocus
      destroyOnHidden
      title="Аккаунт"
      footer={null}
    >
      <Form<UpdateProfileDto>
        layout="vertical"
        requiredMark={false}
        disabled={submitting}
        initialValues={{
          login: user.login,
          discord_id: user.discord_id ?? '',
          steam_url: user.steam_url ?? '',
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="login"
          label="Логин"
          rules={[
            { required: true, message: 'Укажите логин' },
            { min: 2, max: 100, message: 'Логин — от 2 до 100 символов' },
          ]}
        >
          <Input autoComplete="username" autoFocus={focusField === 'login'} />
        </Form.Item>

        <Form.Item
          name="discord_id"
          label="Discord ID"
          rules={[{ pattern: /^\d{17,20}$/, message: 'Discord ID — от 17 до 20 цифр' }]}
        >
          <Input
            inputMode="numeric"
            autoComplete="off"
            autoFocus={focusField === 'discord_id'}
            prefix={<IconDiscord width={16} height={16} />}
          />
        </Form.Item>

        <Form.Item
          name="steam_url"
          label="Ссылка на Steam"
          rules={[
            { type: 'url', message: 'Некорректная ссылка' },
            { max: 200, message: 'Не длиннее 200 символов' },
          ]}
        >
          <Input
            autoComplete="off"
            autoFocus={focusField === 'steam_url'}
            prefix={<IconSteam width={16} height={16} />}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={submitting}>
          Сохранить
        </Button>
      </Form>
    </Modal>
  );
}
