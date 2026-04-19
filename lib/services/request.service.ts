// import { RequestProps } from "@/types/requests";
// import api from "../api";

// export const requestService = {
//   getRequests: async (params: Record<string, any>) => {
//     const response = await api.get("/employer/requests", { params });
//     console.log("REQUESTS", response);

//     return response;
//   },

//   postRequests: async (data: RequestProps) => {
//     const response = await api.post("/requests", data);
//     return response;
//   },

//   getRequestById: async (requestId: string) => {
//     const response = await api.get(`/admin/review/requests/${requestId}/submissions`);
//     return response;
//   },
//   getSubmissionById: async (id: string) => {
//     const response = await api.get(`/admin/review/submissions/${id}`);
//     return response;
//   }
// };
