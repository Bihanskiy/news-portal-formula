export type IArticle = {
  author: string;
  description: string | null;
  title: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
  source: {
    id: any;
    name: string;
  }
}