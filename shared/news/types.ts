export interface NewsParagraph {
  type: 'paragraph';
  text: string;
}

export interface NewsHeading {
  type: 'heading';
  text: string;
}

export interface NewsQuote {
  type: 'quote';
  text: string;
  author?: string;
}

export interface NewsMember {
  type: 'member';
  name: string;
  role: string;
}

export interface NewsList {
  type: 'list';
  title?: string;
  items: string[];
}

export type NewsBlock = NewsParagraph | NewsHeading | NewsQuote | NewsMember | NewsList;

export interface NewsItem {
  slug: string;
  tag: string;
  date: string;
  isoDate: string;
  title: string;
  excerpt: string;
  image: string;
  readingTime: string;
  lead: string;
  body: NewsBlock[];
}
