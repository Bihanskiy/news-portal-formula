import { AxiosResponse } from "axios";
import { baseAPI } from "../api/api";
import { API_KEY } from "../api/config";

import { IArticle } from "../models/article.model";

export const getArticles = async ({
  country = "ua",
  category = "",
  search = "",
  pageSize = 5,
  page = 0
}:
  {
    country?: string,
    category?: string,
    search?: string,
    pageSize?: number,
    page?: number
  }): Promise<AxiosResponse<ServerResponseTypes<IArticle[]>>> => {
  return baseAPI.get<ServerResponseTypes<IArticle[]>>(
    `/top-headlines?country=${country}&category=${category}&q=${search}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`
  )
}