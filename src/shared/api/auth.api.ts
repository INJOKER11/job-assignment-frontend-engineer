import { LoginRequest, LoginResponse } from "../types/auth";
import { apiClient } from "./apiClient";


export const authApi = {
  login: async (data: LoginRequest) => {
    const response = await apiClient.post<LoginResponse>("/users//login", data)
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await apiClient.get("/user");
    return response.data;
  }
}
