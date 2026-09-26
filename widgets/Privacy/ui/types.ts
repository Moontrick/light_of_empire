import { ReactNode } from "react";

export type PrivacySectionProps = {
      id: string;
  title: string;
  openId: string | null;
  onToggle: (id: string) => void;
  children: ReactNode;
}
