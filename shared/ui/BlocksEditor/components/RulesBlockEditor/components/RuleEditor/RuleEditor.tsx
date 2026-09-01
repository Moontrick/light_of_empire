import { Button, Input, Select } from 'antd';
import type { CharterRule, PenaltyCategory } from '@/shared/types';
import { RichTextInput } from '@ui/RichTextInput';
import { CATEGORY_LABELS } from '../../../../constants';
import type { RuleEditorProps } from './types';
import styles from './RuleEditor.module.scss';

export function RuleEditor({ value, onChange, onDelete, depth, canDelete = true }: RuleEditorProps) {
  const children = value.children ?? [];

  const patchChild = (index: number, child: CharterRule) =>
    onChange({ ...value, children: children.map((item, i) => (i === index ? child : item)) });

  const deleteChild = (index: number) => {
    const next = children.filter((_, i) => i !== index);
    onChange({ ...value, ...(next.length ? { children: next } : { children: undefined }) });
  };

  return (
    <div className={styles.rule}>
      <div className={styles.row}>
        <Input
          className={styles.code}
          value={value.code}
          onChange={(event) => onChange({ ...value, code: event.target.value })}
          placeholder="Код (1.1)"
        />
        <Select
          className={styles.category}
          allowClear
          placeholder="Категория"
          value={value.category}
          onChange={(category?: PenaltyCategory) => onChange({ ...value, category })}
          options={Object.entries(CATEGORY_LABELS).map(([key, label]) => ({
            value: Number(key),
            label: <span className={`${styles.catOption} ${styles[`cat${key}`]}`}/>,
          }))}
        />
        {canDelete && (
          <Button danger size="small" onClick={onDelete}>
            ×
          </Button>
        )}
      </div>
      <RichTextInput
        value={value.text}
        onChange={(text) => onChange({ ...value, text })}
        placeholder="Текст правила"
        rows={2}
      />
      <Input
        value={value.penalty ?? ''}
        onChange={(event) =>
          onChange({ ...value, penalty: event.target.value || undefined })
        }
        placeholder="Наказание (необязательно)"
      />
      {children.length > 0 && (
        <div className={styles.children}>
          {children.map((child, index) => (
            <RuleEditor
              key={index}
              value={child}
              onChange={(rule) => patchChild(index, rule)}
              onDelete={() => deleteChild(index)}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
      {depth < 2 && (
        <Button
          size="small"
          onClick={() =>
            onChange({ ...value, children: [...children, { code: '', text: '' }] })
          }
        >
          + Подправило
        </Button>
      )}
    </div>
  );
}
