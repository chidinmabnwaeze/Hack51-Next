import { ChallengeCreationPayload, ApprovedProps } from "@/types/catalog";
import api from "../api";

export const challengeService = {
  createChallenge: async (data: ChallengeCreationPayload) => {
    const response = await api.post("/catalog/challenge-templates", data);
    console.log("CREATE CHALLENGE RESPONSE", response.data);
    return response.data;
  },

  getChallenges: async (params: Record<string, any> = {}) => {
    const response = await api.get("catalog/challenge-templates", { params });
    console.log("GET CHALLENGE RESPONSE", response);
    return response;
  },

  getChallengeById: async (id: string) => {
    const response = await api.get(`/catalog/challenge-templates/${id}`);
    return response;
  },

  editChallenge: async (id: string, data: ChallengeCreationPayload) => {
    const response = await api.put(`/catalog/challenge/templates/${id}`, data);
    return response;
  },

  deleteChallenge: async (id: string) => {
    const response = await api.delete(`/catalog/challenge/templates/${id}`);
    return response;
  },

  approveChallenge: async (id: string, data: ApprovedProps) => {
    const response = await api.post(`/catalog/challenge-approved/${id}`, data);
    return response;
  },

  getApprovedChallenges: async (params: Record<string, any> = {}) => {
    const response = await api.get("/catalog/challenge-approved", { params });
    return response;
  },

  getPublicChallenges: async (params: Record<string, any> = {}) => {
    const response = await api.get("/catalog/challenges", { params });
    return response;
  },

  getChallengeDetails: async (request_id: string) => {
    const response = await api.get(`/catalog/challenges/${request_id}`);
    return response;
  },
};
