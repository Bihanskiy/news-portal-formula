type ServerResponseTypes<T> = {
  status: string;
  totalResults: number;
  articles: T;
}