import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { composeNameStyles, parseNameStyles } from '../../../lib/nameStyles';
import { toColorString } from '../../../lib/toColorString';
import type { DirectoryFormValues, EditDirectoryModalProps } from '../types';

export function useEditDirectoryModal({
  config,
  editing,
  onClose,
  onSaved,
}: EditDirectoryModalProps) {
  const [form] = Form.useForm<DirectoryFormValues>();
  const [submitting, setSubmitting] = useState(false);

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
        color: editing.color,
        stylePresets: parseNameStyles(editing.styles),
      });
    }
  }, [editing, form]);

  const onFinish = async (values: DirectoryFormValues) => {
    setSubmitting(true);
    try {
      // Пустые строки очищают поля при редактировании
      const dto = {
        name: values.name,
        description: values.description ?? '',
        color: toColorString(values.color),
        styles: composeNameStyles(values.stylePresets ?? []),
      };

      if (isCreate) {
        await config.api.create(dto);
        alertHandler.addAlert({
          status: 'success',
          defaultText: config.labels.created(values.name),
        });
      } else if (editing !== null) {
        await config.api.update(editing.id, dto);
        alertHandler.addAlert({
          status: 'success',
          defaultText: config.labels.updated(values.name),
        });
      }

      onClose();
      onSaved();
    } catch (error) {
      alertHandler.addAlert({
        defaultText: getApiErrorMessage(error, config.errorMessages),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return { form, open, isCreate, submitting, onFinish };
}
