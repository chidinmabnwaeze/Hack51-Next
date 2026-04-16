import { ChallengeCreationPayload, ApprovedProps } from "@/types/catalog";
import api from "../api";

export const challengeService = {
  createChallenge: async (data: ChallengeCreationPayload) => {
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

 updateChallenge: async (id: string, data: ChallengeCreationPayload) => {
    const response = await api.put(`/admin/catalog/challenges/${id}`, data);
    return response;
  },

  deleteChallenge: async (id: string) => {
    const response = await api.delete(`/admin/catalog/challenge/templates/${id}`);
    return response;
  },

  // approveChallenge: async (id: string, data: ApprovedProps) => {
  //   const response = await api.post(`/admin/catalog/challenge-approved/${id}`, data);
  //   return response;
  // },

  // getApprovedChallenges: async (params: Record<string, any> = {}) => {
  //   const response = await api.get("/admin/catalog/challenge-approved", { params });
  //   return response;
  // },

  // getPublicChallenges: async (params: Record<string, any> = {}) => {
  //   const response = await api.get("/admin/catalog/challenges", { params });
  //   return response;
  // },

  // getChallengeDetails: async (request_id: string) => {
  //   const response = await api.get(`/admin/catalog/challenges/${request_id}`);
  //   return response;
  // },
};
