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

export interface MobileNavProps {
  open: boolean;
  items: NavNode[];
  activePath?: string;
  onNavigate: () => void;
}

export interface MobileNavItemProps {
  node: NavNode;
  depth: number;
  activePath?: string;
  onNavigate: () => void;
}
