import { Form } from 'antd';
import { useEffect } from 'react';
import type { DocContent } from '@/shared/types';
import { useDocEditor } from '../../../context';

export interface WrapperFormValues {
  hero_eyebrow: string;
  hero_title: string;
  hero_intro: string;
  footer: string;
  search_placeholder: string;
}

export function useWrapperForm(open: boolean, initial: DocContent | null, onClose: () => void) {
  const [form] = Form.useForm<WrapperFormValues>();
  const { ops, flags } = useDocEditor();
  const saving = flags.savingWrapper;

  useEffect(() => {
    if (!open) return;
    form.setFieldsValue({
      hero_eyebrow: initial?.hero.eyebrow ?? '',
      hero_title: initial?.hero.title ?? '',
      hero_intro: initial?.hero.intro ?? '',
      footer: initial?.footer ?? '',
      search_placeholder: initial?.searchPlaceholder ?? '',
    });
  }, [open, initial, form]);

  const submit = async (values: WrapperFormValues) => {
    const ok = await ops.saveWrapper({
      hero_eyebrow: values.hero_eyebrow,
      hero_title: values.hero_title,
      hero_intro: values.hero_intro,
      footer: values.footer,
      search_placeholder: values.search_placeholder.trim() || null,
    });
    if (ok) onClose();
  };

  return { form, saving, submit };
}
