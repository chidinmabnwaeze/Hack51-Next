import { create } from "zustand";
import { LoginProps, RegisterProps } from "@/types/auth";
import { authService } from "../services/auth.service";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";

export const userAuth = create((set) => ({
  user: authService.getCurrentUser(),
  isAuthenticated: authService.isAuthenticated(),

  login: async (data: LoginProps) => {
    try {
      const response: ApiResponse<User> = await authService.login(data);

      set({ user: response.user, isAuthenticated: true });
      return response;
    } catch (error) {
      throw error;
    }
  },

  register: async (data: RegisterProps) => {
    try {
      const response = await authService.register(data);
      set({ user: response.user, isAuthenticated: true });
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },

  //   updateUser: (userData) => {
  //     const updatedUser = { ...useAuthStore.getState().user, ...userData };
  //     localStorage.setItem("user", JSON.stringify(updatedUser));
  //     set({ user: updatedUser });
  //   },
}));

export const submission = create((set)=>({
  
}))