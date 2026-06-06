export interface NavNode {
  label: string;
  href: string;
  active?: boolean;
  children?: NavNode[];
}

export interface CharterHeaderProps {
  transparent?: boolean;
}

export interface NavItemProps {
  node: NavNode;
  depth: number;
  activePath?: string;
  onNavigate?: () => void;
}
