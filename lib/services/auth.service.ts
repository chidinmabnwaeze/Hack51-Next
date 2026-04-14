import { LoginProps, RegisterProps, VerificationProps } from "@/types/auth";
import api from "../api";
import { ApiResponse } from "@/types/api";
import { User, UserRole } from "@/types/user";

export const authService = {
  login: async (data: LoginProps) => {
    const res: ApiResponse<any> = await api.post("/auth/login", data);
    const tokens = res.data;
    if (!tokens.access_token || !tokens.refresh_token) {
      throw new Error("Invalid login res: missing tokens");
    }

    localStorage.setItem("access_token", tokens.access_token);
    localStorage.setItem("refresh_token", tokens.refresh_token);

    document.cookie = `access_token=${tokens.access_token}; path=/`;
    document.cookie = `refresh_token=${tokens.refresh_token}; path=/`;
    return await authService.getProfile(); // Fetches and stores user profile after login
  },

  register: async (data: RegisterProps) => {
    const response: ApiResponse<any> = await api.post("/auth/register", data);
    const tokens = response.data;
    if (tokens.access_token && tokens.refresh_token) {
      localStorage.setItem("access_token", tokens.access_token);
      localStorage.setItem("refresh_token", tokens.refresh_token);
    }
    return response;
  },

  verifyEmail: async (data: VerificationProps) => {
    const response = await api.post("/auth/verify-email", data);
    return response;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/auth/login";
  },

  getProfile: async () => {
    const response: ApiResponse<User> = await api.get("/auth/me");
    console.log("PROFILE", response);

    // optionally store user
    if (response) {
      localStorage.setItem("user", JSON.stringify(response));
      document.cookie = `user=${encodeURIComponent(JSON.stringify(response))}; path=/`;
    }

    return { user: response.data };
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    console.log("CURRENT USER", user);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("access_token");
  },

  isVerified: () => {
    return;
  },

  getRoleRoute: (role: UserRole) => {
    const roleRoutes: Record<UserRole, string> = {
      system_admin: "/admin/dashboard",
      employer: "/dashboard",
      candidate: "/candidate/dashboard",
    };

    return roleRoutes[role];
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
