import { RoleCreationPayload } from "@/types/catalog";
import api from "../api";

export const catalogService = {
  createRole: async (data: RoleCreationPayload) => {
    const response = await api.post("/admin/catalog/roles", data);
    console.log("CREATE ROLE RESPONSE", response.data);
    return response.data;
  },

  getRoles: async (params: Record<string, any> = {}) => {
    const response = await api.get("/admin/catalog/roles", { params });
    console.log("GET ROLE RESPONSE", response);
    return response;
  },

  getRoleById: async (id: string) => {
    const response = await api.get(`/admin/catalog/roles/${id}`);
    return response;
  },

  updateRole: async (id: string, data: RoleCreationPayload) =>{
    const response = await api.patch(`/admin/catalog/roles/${id}`, data);
    return response;
  },

  deleteRole: async (id: string) => {
    const response = await api.delete(`/admin/catalog/roles/${id}`);
    return response;
  }
};
