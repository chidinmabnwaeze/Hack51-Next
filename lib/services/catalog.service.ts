import { RoleCreationPayload } from "@/types/catalog";
import api from "../api";

export const catalogService = {
  createRole: async (data: RoleCreationPayload) => {
    const response = await api.post("/catalog/roles", data);
    console.log("CREATE ROLE RESPONSE", response.data);
    return response.data;
  },

  getRoles: async (params: Record<string, any> = {}) => {
    const response = await api.get("catalog/roles", { params });
    console.log("GET ROLE RESPONSE", response);
    return response;
  },

  getRoleById: async (role_id: string) => {
    const response = await api.get(`/catalog/roles/${role_id}`);
    return response;
  },

  updateRole: async (role_id: string, data: RoleCreationPayload) =>{
    const response = await api.patch(`/catalog/roles/${role_id}`, data);
    return response;
  }
};
