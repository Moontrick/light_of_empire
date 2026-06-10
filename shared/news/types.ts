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

export type NewsBlock = NewsParagraph | NewsHeading | NewsQuote;

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
