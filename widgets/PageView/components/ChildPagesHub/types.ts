export interface ChildPageItem {
  slug: string;
  title: string;
  description: string;
  loading: boolean;
}

export interface ChildPagesHubProps {
  items: ChildPageItem[];
}
