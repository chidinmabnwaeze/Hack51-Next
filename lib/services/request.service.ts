import { RequestProps } from "@/types/requests";
import api from "../api";

export const requestService = {
  getRequests: async (data: RequestProps) => {
    const limit = data.limit || 10;
    const page = data.page || 1;
    const sort = data.sort || "created_at";
    const response = await api.get("/requests", {
      params: { ...data, limit, page, sort },
    });
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
