import { Button } from 'antd';
import type { CharterRule } from '@/shared/types';
import { RuleEditor } from './components/RuleEditor';
import type { RulesBlockEditorProps } from './types';
import styles from './RulesBlockEditor.module.scss';

export function RulesBlockEditor({ value, onChange }: RulesBlockEditorProps) {
  const patchItem = (index: number, rule: CharterRule) =>
    onChange({ ...value, items: value.items.map((item, i) => (i === index ? rule : item)) });

  const deleteItem = (index: number) =>
    onChange({ ...value, items: value.items.filter((_, i) => i !== index) });

  return (
    <div className={styles.root}>
      {value.items.map((rule, index) => (
        <RuleEditor
          key={index}
          value={rule}
          onChange={(next) => patchItem(index, next)}
          onDelete={() => deleteItem(index)}
          canDelete={value.items.length > 1}
          depth={0}
        />
      ))}
      <Button
        size="small"
        onClick={() => onChange({ ...value, items: [...value.items, { code: '', text: '' }] })}
      >
        + Правило
      </Button>
    </div>
  );
}
