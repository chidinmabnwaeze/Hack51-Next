import { config } from "./../middleware";
import { ApiResponse } from "@/types/api";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
          {
            refresh_token: refreshToken,
          },
        );

        const newAccessToken = response.data.access_token;
        localStorage.setItem("access_token", newAccessToken);
        document.cookie = `access_token=${newAccessToken}; path=/`;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Token refresh failed", refreshError);
        localStorage.removeItem("access_token");
        window.location.href = "/auth/login";

        const message = error.response?.data?.message || "Request failed";
        console.log("API Error response data:", message);

        return Promise.reject(new Error(message));
      }
    }
    const data = error.response?.data;
    const message =
      data?.message ||
      data?.error ||
      data?.detail ||
      (typeof data === "string" ? data : null) ||
      error.message ||
      "Request failed";
    console.error("API Error:", error.response?.status, data);
    const customError = new Error(message);
    (customError as any).status = error.response?.status;
    (customError as any).data = data;
    return Promise.reject(customError);
  },
);

export default api;
