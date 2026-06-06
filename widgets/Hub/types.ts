export interface HubCardData {
  title: string;
  description: string;
  href: string;
  soon?: boolean;
}

export interface HubContent {
  eyebrow: string;
  title: string;
  intro: string;
  cards: HubCardData[];
}

export interface HubProps {
  content: HubContent;
}
