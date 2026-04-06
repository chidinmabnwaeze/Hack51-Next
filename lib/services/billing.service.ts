import { BillingProps } from "@/types/billing";
import api from "../api";

export const billingService = {
  getBillingCredits: async (params: Record<string, any> = {}) => {
    const response = await api.get("/billing/credits", { params });
    console.log("GET BILLING CREDITS ", response);
    return response;
  },

  getBillingTransactions: async (params: Record<string, any> = {}) => {
    const response = await api.get("/billing/transactions", { params });
    console.log("GET BILLING TRANSACTIONS ", response);
    return response;
  },

  createDeposit: async (data: BillingProps) => {
    const response = await api.post("/billing/deposit", data);
    console.log("CREATE DEPOSIT RESPONSE", response.data);
    return response.data;
  },
};
