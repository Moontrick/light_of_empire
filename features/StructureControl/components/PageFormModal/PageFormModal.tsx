'use client';

import { Button, Form, Input, Modal, Select, Skeleton, TreeSelect } from 'antd';
import { RichTextInput } from '@ui/RichTextInput';
import { PAGE_STATUS_OPTIONS } from '../../constants';
import { usePageForm } from './hooks/usePageForm';
import type { PageFormValues } from './hooks/usePageForm';
import type { PageFormModalProps } from './types';

export function PageFormModal({ open, node, onClose }: PageFormModalProps) {
  const { form, loading, saving, parentOptions, submit } = usePageForm(open, node, onClose);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={node ? 'Редактирование страницы' : 'Новая страница'}
      footer={null}
      destroyOnHidden
      width={640}
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <Form<PageFormValues> form={form} layout="vertical" disabled={saving} onFinish={submit}>
          <Form.Item
            name="name"
            label="Название (в меню)"
            rules={[
              { required: true, message: 'Обязательное поле' },
              { max: 255, message: 'Не длиннее 255 символов' },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Адрес (латиницей, пусто — создастся сам)"
            rules={[
              { max: 200, message: 'Не длиннее 200 символов' },
              { pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/, message: 'Строчная латиница, цифры и дефисы' },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item name="parent_id" label="Родительская страница">
            <TreeSelect
              treeData={parentOptions}
              allowClear
              placeholder="Без родителя (в корне)"
              treeDefaultExpandAll
            />
          </Form.Item>

          <Form.Item name="status" label="Статус">
            <Select options={PAGE_STATUS_OPTIONS} />
          </Form.Item>

          <Form.Item
            name="hero_eyebrow"
            label="Надзаголовок"
            rules={[
              { required: true, message: 'Обязательное поле' },
              { max: 255, message: 'Не длиннее 255 символов' },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item
            name="hero_title"
            label="Заголовок"
            rules={[
              { required: true, message: 'Обязательное поле' },
              { max: 255, message: 'Не длиннее 255 символов' },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item
            name="hero_intro"
            label="Вступление"
            rules={[
              { required: true, message: 'Обязательное поле' },
              { max: 4000, message: 'Не длиннее 4000 символов' },
            ]}
          >
            <RichTextInput />
          </Form.Item>

          <Form.Item
            name="footer"
            label="Подвал"
            rules={[
              { required: true, message: 'Обязательное поле' },
              { max: 4000, message: 'Не длиннее 4000 символов' },
            ]}
          >
            <RichTextInput />
          </Form.Item>

          <Form.Item
            name="search_placeholder"
            label="Плейсхолдер поиска (необязательно)"
            rules={[{ max: 255, message: 'Не длиннее 255 символов' }]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={saving}>
            Сохранить
          </Button>
          <Button block onClick={onClose}>
            Отмена
          </Button>
        </Form>
      )}
    </Modal>
  );
}
