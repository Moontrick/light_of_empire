'use client';

import { Button, Dropdown } from 'antd';
import type { CharterBlock } from '@/shared/types';
import { BLOCK_KINDS, BLOCK_LABELS, createEmptyBlock } from './constants';
import { BlockCard } from './components/BlockCard';
import { TextBlockEditor } from './components/TextBlockEditor';
import { SubheadingBlockEditor } from './components/SubheadingBlockEditor';
import { ListBlockEditor } from './components/ListBlockEditor';
import { NoteBlockEditor } from './components/NoteBlockEditor';
import { RulesBlockEditor } from './components/RulesBlockEditor';
import type { BlocksEditorProps } from './types';
import styles from './BlocksEditor.module.scss';

function BlockBody({
  block,
  onChange,
}: {
  block: CharterBlock;
  onChange: (block: CharterBlock) => void;
}) {
  switch (block.kind) {
  case 'text':
    return <TextBlockEditor value={block} onChange={onChange} />;
  case 'subheading':
    return <SubheadingBlockEditor value={block} onChange={onChange} />;
  case 'list':
    return <ListBlockEditor value={block} onChange={onChange} />;
  case 'note':
    return <NoteBlockEditor value={block} onChange={onChange} />;
  case 'rules':
    return <RulesBlockEditor value={block} onChange={onChange} />;
  default:
    return null;
  }
}

export function BlocksEditor({ value, onChange }: BlocksEditorProps) {
  const move = (from: number, to: number) => {
    const next = [...value];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return (
    <div className={styles.root}>
      {value.map((block, index) => (
        <BlockCard
          key={index}
          title={BLOCK_LABELS[block.kind]}
          canMoveUp={index > 0}
          canMoveDown={index < value.length - 1}
          onMoveUp={() => move(index, index - 1)}
          onMoveDown={() => move(index, index + 1)}
          onDelete={() => onChange(value.filter((_, i) => i !== index))}
        >
          <BlockBody
            block={block}
            onChange={(next) => onChange(value.map((item, i) => (i === index ? next : item)))}
          />
        </BlockCard>
      ))}
      <Dropdown
        menu={{
          items: BLOCK_KINDS.map((kind) => ({
            key: kind,
            label: BLOCK_LABELS[kind],
            onClick: () => onChange([...value, createEmptyBlock(kind)]),
          })),
        }}
      >
        <Button className={styles.addButton}>+ Добавить блок</Button>
      </Dropdown>
    </div>
  );
}
