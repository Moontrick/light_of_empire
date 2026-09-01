'use client';

import { Button, Dropdown } from 'antd';
import type { NewsBlock } from '@/shared/types';
import { BlockCard } from '@ui/BlocksEditor/components/BlockCard';
import { NEWS_BLOCK_KINDS, NEWS_BLOCK_LABELS, createEmptyNewsBlock } from './constants';
import { ParagraphBlockEditor } from './components/ParagraphBlockEditor';
import { HeadingBlockEditor } from './components/HeadingBlockEditor';
import { QuoteBlockEditor } from './components/QuoteBlockEditor';
import { MemberBlockEditor } from './components/MemberBlockEditor';
import { NewsListBlockEditor } from './components/NewsListBlockEditor';
import { ImageBlockEditor } from './components/ImageBlockEditor';
import type { NewsBlocksEditorProps } from './types';
import styles from './NewsBlocksEditor.module.scss';

function BlockBody({
  block,
  onChange,
}: {
  block: NewsBlock;
  onChange: (block: NewsBlock) => void;
}) {
  switch (block.type) {
  case 'paragraph':
    return <ParagraphBlockEditor value={block} onChange={onChange} />;
  case 'heading':
    return <HeadingBlockEditor value={block} onChange={onChange} />;
  case 'quote':
    return <QuoteBlockEditor value={block} onChange={onChange} />;
  case 'member':
    return <MemberBlockEditor value={block} onChange={onChange} />;
  case 'list':
    return <NewsListBlockEditor value={block} onChange={onChange} />;
  case 'image':
    return <ImageBlockEditor value={block} onChange={onChange} />;
  default:
    return null;
  }
}

export function NewsBlocksEditor({ value, onChange }: NewsBlocksEditorProps) {
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
          title={NEWS_BLOCK_LABELS[block.type]}
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
          items: NEWS_BLOCK_KINDS.map((kind) => ({
            key: kind,
            label: NEWS_BLOCK_LABELS[kind],
            onClick: () => onChange([...value, createEmptyNewsBlock(kind)]),
          })),
        }}
      >
        <Button className={styles.addButton}>+ Добавить блок</Button>
      </Dropdown>
    </div>
  );
}
