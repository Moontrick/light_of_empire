import type { PageStatus, PageTreeNodeDto } from '@/shared/api/pages';

export interface StructureTreeProps {
  nodes: PageTreeNodeDto[];
  canMutate: boolean;
  savingTree: boolean;
  onEdit: (node: PageTreeNodeDto) => void;
  onChangeStatus: (node: PageTreeNodeDto, status: PageStatus) => void;
  onDelete: (node: PageTreeNodeDto) => void;
  onMove: (node: PageTreeNodeDto, siblings: PageTreeNodeDto[], offset: number) => void;
}

export interface StructureNodeRowProps extends Omit<StructureTreeProps, 'nodes'> {
  node: PageTreeNodeDto;
  siblings: PageTreeNodeDto[];
  first: boolean;
  last: boolean;
}
