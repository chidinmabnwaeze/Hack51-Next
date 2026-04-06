import { RequestProps } from "@/types/requests";
import api from "../api";

export const requestService = {
  getRequests: async (params: Record<string, any>) => {
    const response = await api.get("/requests", { params });
    console.log("REQUESTS", response);

    return response;
  },

  postRequests: async (data: RequestProps) => {
    const response = await api.post("/requests", data);
    return response;
  },

  getRequestById: async (request_id: number) => {
    const response = await api.get(`/requests/${request_id}`);
    return response;
  },
};
