import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { pagesApi } from '@/shared/api/pages';
import type { PageStatus, PageTreeNodeDto, UpdatePageDto } from '@/shared/api/pages';
import { usePagesStore } from '@store/pagesStore';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';

export interface PageFormValues {
  name: string;
  slug: string;
  parent_id?: number | null;
  status: PageStatus;
  hero_eyebrow: string;
  hero_title: string;
  hero_intro: string;
  footer: string;
  search_placeholder: string;
}

interface ParentOption {
  value: number;
  title: string;
  children: ParentOption[];
}

// Свою ветку из вариантов родителя убираем — бэк запрещает перенос в своё поддерево
function buildParentOptions(nodes: PageTreeNodeDto[], excludeId: number | null): ParentOption[] {
  return nodes
    .filter((node) => node.id !== excludeId)
    .map((node) => ({
      value: node.id,
      title: node.name,
      children: buildParentOptions(node.children, excludeId),
    }));
}

export function usePageForm(open: boolean, node: PageTreeNodeDto | null, onClose: () => void) {
  const [form] = Form.useForm<PageFormValues>();
  const [loading, setLoading] = useState(false);
  const [initialSlug, setInitialSlug] = useState('');
  const [initialParentId, setInitialParentId] = useState<number | null>(null);

  const tree = usePagesStore((state) => state.tree);
  const createPage = usePagesStore((state) => state.createPage);
  const updatePage = usePagesStore((state) => state.updatePage);
  const saving = usePagesStore((state) => state.savingTree);

  const parentOptions = buildParentOptions(tree, node?.id ?? null);

  useEffect(() => {
    if (!open) return;

    if (!node) {
      form.setFieldsValue({
        name: '',
        slug: '',
        parent_id: null,
        status: 'DRAFT',
        hero_eyebrow: '',
        hero_title: '',
        hero_intro: '',
        footer: '',
        search_placeholder: '',
      });
      return;
    }

    let cancelled = false;
    setLoading(true);
    pagesApi
      .getPage(node.slug)
      .then(({ data }) => {
        if (cancelled) return;
        setInitialSlug(data.slug);
        setInitialParentId(data.parent_id);
        form.setFieldsValue({
          name: data.name,
          slug: data.slug,
          parent_id: data.parent_id,
          status: data.status,
          hero_eyebrow: data.hero_eyebrow,
          hero_title: data.hero_title,
          hero_intro: data.hero_intro,
          footer: data.footer,
          search_placeholder: data.search_placeholder ?? '',
        });
      })
      .catch((error) => {
        if (cancelled) return;
        alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
        onClose();
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, node, form, onClose]);

  const submit = async (values: PageFormValues) => {
    const trimmedSlug = values.slug.trim();
    const parentId = values.parent_id ?? null;
    const base = {
      name: values.name.trim(),
      hero_eyebrow: values.hero_eyebrow,
      hero_title: values.hero_title,
      hero_intro: values.hero_intro,
      footer: values.footer,
      search_placeholder: values.search_placeholder.trim() || null,
      status: values.status,
    };

    const ok = node
      ? await updatePage(node.id, {
        ...base,
        ...(trimmedSlug && trimmedSlug !== initialSlug ? { slug: trimmedSlug } : {}),
        // parent_id шлём только при смене — иначе бэк переставит страницу в конец
        ...(parentId !== initialParentId ? { parent_id: parentId } : {}),
      } satisfies UpdatePageDto)
      : await createPage({
        ...base,
        ...(trimmedSlug ? { slug: trimmedSlug } : {}),
        parent_id: parentId,
      });

    if (ok) onClose();
  };

  return { form, loading, saving, parentOptions, submit };
}
