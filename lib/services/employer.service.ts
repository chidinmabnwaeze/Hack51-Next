import api from "../api";
import {
  EmployerRequest,
  CreateRequestPayload,
  UpdateRequestPayload,
  Challenge,
  Shortlist,
  PaymentInitResponse,
} from "@/types/employer";
import { EmployerRoles } from "@/types/catalog";

export const employerService = {
  // =========================
  //  CATALOG
  // =========================
  getRoles: async (): Promise<EmployerRoles[]> => {
    const res = await api.get("/employer/catalog/roles");
    return res.data.approved;
  },

  getRoleById: async (id: string): Promise<EmployerRoles> => {
    const res = await api.get(`/employer/catalog/roles/${id}`);
    return res.data;
  },

  getChallenges: async (): Promise<Challenge[]> => {
    const res = await api.get("/employer/catalog/challenges");
    return res.data.approved;
  },

  getChallengeById: async (id: string): Promise<Challenge> => {
    const res = await api.get(`/employer/catalog/challenges/${id}`);
    return res.data;
  },

  // =========================
  //  REQUESTS
  // =========================
  getRequests: async (params?: {
    status?: string;
    page?: number;
    limit?: number;
    drafts?: boolean;
  }): Promise<EmployerRequest[]> => {
    const res = await api.get("/employer/requests", { params });
    return res.data;
  },

  createRequest: async (
    payload: CreateRequestPayload,
  ): Promise<EmployerRequest> => {
    const res = await api.post("/employer/requests", payload);
    return res.data;
  },

  getRequestById: async (id: string): Promise<EmployerRequest> => {
    const res = await api.get(`/employer/requests/${id}`);
    return res.data;
  },

  updateRequest: async (
    id: string,
    payload: Partial<EmployerRequest>,
  ): Promise<EmployerRequest> => {
    const res = await api.patch(`/employer/requests/${id}`, { payload });
    console.log("PATCH", res.data);
    return res.data;
  },

  deleteRequest: async (id: string): Promise<void> => {
    await api.delete(`/employer/requests/${id}`);
  },

  publishRequest: async (id: string, challenge_id: string): Promise<void> => {
    const r = await api.post(`/employer/requests/${id}/publish`, {
      challenge_id,
    });

    console.log("RX", r);
  },

  // =========================
  //  SHORTLISTS
  // =========================
  getShortlists: async (): Promise<Shortlist[]> => {
    const res = await api.get("/employer/shortlists");
    return res.data;
  },

  getShortlistById: async (id: string): Promise<Shortlist> => {
    const res = await api.get(`/employer/shortlists/${id}`);
    return res.data;
  },

  // =========================
  //  BILLING
  // =========================
  getBilling: async () => {
    const res = await api.get("/employer/billing");
    return res.data;
  },

  initiatePayment: async (): Promise<PaymentInitResponse> => {
    const res = await api.post("/employer/payments/initiate");
    return res.data;
  },

  verifyPayment: async (reference: string) => {
    const res = await api.get(`/employer/payments/verify/${reference}`);
    return res.data;
  },
};
