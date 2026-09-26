import { ReactNode } from "react";

export type TermsSectionProps = {
      id: string;
  title: string;
  openId: string | null;
  onToggle: (id: string) => void;
  children: ReactNode;
}
