'use client';

import { Button, Form, Modal, Select } from 'antd';
import { useEditUserModal } from './hooks/useEditUserModal';
import type { EditUserFormValues, EditUserModalProps } from './types';

export function EditUserModal(props: EditUserModalProps) {
  const { user, onClose } = props;
  const { form, open, formations, positions, loadingDictionaries, submitting, onFinish } =
    useEditUserModal(props);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      title={user ? `Редактирование: ${user.login}` : 'Редактирование'}
      footer={null}
    >
      <Form<EditUserFormValues>
        form={form}
        layout="vertical"
        requiredMark={false}
        disabled={submitting}
        onFinish={onFinish}
      >
        <Form.Item name="position_id" label="Должность">
          <Select
            allowClear
            placeholder="Без должности"
            loading={loadingDictionaries}
            options={positions.map((position) => ({
              value: position.id,
              label: position.name,
            }))}
          />
        </Form.Item>

        <Form.Item name="formation_id" label="Формирование">
          <Select
            allowClear
            placeholder="Без формирования"
            loading={loadingDictionaries}
            options={formations.map((formation) => ({
              value: formation.id,
              label: formation.name,
            }))}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={submitting}>
          Сохранить
        </Button>
      </Form>
    </Modal>
  );
}
