import { apiClient } from "./apiClient";
import { ProfileResponse } from "../types/profile";


export const profileApi = {
  getRecord: async (username: string) => {
    const response = await apiClient.get<ProfileResponse>(`profiles/${username}`);
    return response.data;
  },
  followProfile: async (username: string) => {
    const response = await apiClient.post(`profiles/${username}/follow`);
    return response.data;
  },
  unfollowProfile: async (username: string) => {
    const response = await apiClient.delete(`profiles/${username}/follow`);
    return response.data;
  },
};
