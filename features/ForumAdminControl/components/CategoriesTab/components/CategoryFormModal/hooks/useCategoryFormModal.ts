import { useEffect } from 'react';
import { Form } from 'antd';
import { useForumStore } from '@store/forumStore';
import type { CategoryFormModalProps, CategoryFormValues } from '../types';

export function useCategoryFormModal({ editing, onClose }: CategoryFormModalProps) {
  const [form] = Form.useForm<CategoryFormValues>();
  const { createCategory, updateCategory, mutating } = useForumStore();

  const open = editing !== null;
  const isCreate = editing === 'new';

  useEffect(() => {
    if (editing === null) return;
    if (editing === 'new') {
      form.resetFields();
    } else {
      form.setFieldsValue({
        name: editing.name,
        description: editing.description ?? '',
        is_archived: editing.is_archived,
      });
    }
  }, [editing, form]);

  const onFinish = async (values: CategoryFormValues) => {
    const name = values.name.trim();
    const description = values.description?.trim() ?? '';

    let ok = false;

    if (isCreate) {
      ok = await createCategory({ name, ...(description ? { description } : {}) });
    } else if (editing !== null) {
      const isArchived = Boolean(values.is_archived);
      ok = await updateCategory(editing.id, {
        name,
        // Пустое описание при правке — явная очистка
        description: description || null,
        // is_archived только при изменении: иначе стор покажет текст про архив вместо «Раздел сохранён»
        ...(isArchived !== editing.is_archived ? { is_archived: isArchived } : {}),
      });
    }

    if (ok) onClose();
  };

  return { form, open, isCreate, submitting: mutating, onFinish };
}
