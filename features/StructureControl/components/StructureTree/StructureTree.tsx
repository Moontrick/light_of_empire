import { StructureNodeRow } from './components/StructureNodeRow';
import type { StructureTreeProps } from './types';
import styles from './StructureTree.module.scss';

export function StructureTree({ nodes, ...handlers }: StructureTreeProps) {
  return (
    <ul className={styles.list}>
      {nodes.map((node, index) => (
        <li key={node.id}>
          <StructureNodeRow
            node={node}
            siblings={nodes}
            first={index === 0}
            last={index === nodes.length - 1}
            {...handlers}
          />
          {node.children.length > 0 && <StructureTree nodes={node.children} {...handlers} />}
        </li>
      ))}
    </ul>
  );
}
