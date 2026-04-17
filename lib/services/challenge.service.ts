import { CreateChallengeWithRubric } from "@/types/catalog";
import api from "../api";

export const challengeService = {
  createChallenge: async (data: CreateChallengeWithRubric) => {
    const response = await api.post("/admin/catalog/challenges", data);
    console.log("CREATE CHALLENGE RESPONSE", response.data);
    return response.data;
  },

  getChallenges: async (params: Record<string, any> = {}) => {
    const response = await api.get("/admin/catalog/challenges", { params });
    console.log("GET CHALLENGE RESPONSE", response);
    return response;
  },

  getChallengeById: async (id: string) => {
    const response = await api.get(`/admin/catalog/challenges/${id}`);
    return response;
  },

 updateChallenge: async (id: string, data: CreateChallengeWithRubric) => {
    const response = await api.put(`/admin/catalog/challenges/${id}`, data);
    return response;
  },

  deleteChallenge: async (id: string) => {
    const response = await api.delete(`/admin/catalog/challenges/${id}`);
    return response;
  },

  };
