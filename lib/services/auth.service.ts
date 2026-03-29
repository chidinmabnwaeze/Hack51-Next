import { LoginProps, RegisterProps } from "@/types/auth";
import api from "../api";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";

export const authService = {
  login: async (data: LoginProps) => {
    const res: ApiResponse<any> = await api.post("/auth/login", data);

    if (!res.access_token || !res.refresh_token) {
      throw new Error("Invalid login res: missing tokens");
    }

    localStorage.setItem("access_token", res.access_token);
    localStorage.setItem("refresh_token", res.refresh_token);
    return await authService.getProfile(); // Fetch and store user profile after login
  },

  register: async (data: RegisterProps) => {
    const response: ApiResponse<any> = await api.post("/auth/register", data);

    if (response.access_token && response.refresh_token) {
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
    }
    return response;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  },

  getProfile: async () => {
    const response: ApiResponse<User> = await api.get("/auth/me");
    console.log("PROFILE", response);

    // optionally store user
    if (response) {
      localStorage.setItem("user", JSON.stringify(response));
    }

    return { user: response };
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  //   updateProfile: async (profileData) => {
  //     return await api.put("/auth/profile", profileData);
  //   },

  //   changePassword: async (currentPassword, newPassword) => {
  //     return await api.post("/auth/change-password", {
  //       currentPassword,
  //       newPassword,
  //     });
  //   },
};
