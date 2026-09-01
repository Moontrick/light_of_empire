export interface StringListEditorProps {
  items: string[];
  onChange: (items: string[]) => void;
  addLabel?: string;
  itemPlaceholder?: string;
}
