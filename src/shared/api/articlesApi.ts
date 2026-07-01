import { apiClient } from "./apiClient";
import { ArticlesResponse, SingleArticleResponse } from "../types/articles";

type GetArticlesParams = {
  author?: string;
  favorited?: string;
};

export const articlesApi = {
  getList: async (params?: GetArticlesParams) => {
    const response = await apiClient.get<ArticlesResponse>("articles", { params });
    return response.data;
  },
  getRecord: async (slug: string) => {
    const response = await apiClient.get<SingleArticleResponse>(`articles/${slug}`);
    return response.data;
  },
  addToFavorite: async (slug: string) => {
    const response = await apiClient.post(`articles/${slug}/favorite`);
    return response.data;
  },
  removeFromFavorite: async (slug: string) => {
    const response = await apiClient.delete(`articles/${slug}/favorite`);
    return response.data;
  },
};
