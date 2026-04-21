// import { RequestProps } from "@/types/requests";
import api from "../api";

export const reviewService = {
  getRequests: async (params: Record<string, any>) => {
    const response = await api.get("/admin/review/requests", { params });
    console.log("REQUESTS", response);

    return response;
  },
  getAllRequestSubmissions: async (requestId: string, params: Record<string, any>) => {
    const response = await api.get(`/admin/review/requests/${requestId}/submissions`, { params });
    console.log("ALL REQUEST SUBMISSIONS", response);
    return response;
  },
  getSubmissionsById: async (id: string) => {
    const response = await api.get(`/admin/review/submissions/${id}`);
    console.log("SUBMISSION BY ID", response);
    return response;
  },
  triageSubmission: async (id: string, data: Record<string, any>) => {
    const response = await api.post(`/admin/review/submissions/${id}`, data);
    console.log("TRIAGE SUBMISSION", response);
    return response;
  },
  scoreSubmission: async (id: string, data: Record<string, any>) => {
    const response = await api.post(`/admin/review/submissions/${id}/score`, data);
    console.log("SCORE SUBMISSION", response);
    return response;
  },
  getShortlists: async (params: Record<string, any>) => {
    const response = await api.get("/admin/review/shortlists", { params });
    console.log("SHORTLISTS", response);
    return response;
  },
  getShortListedCandidates : async (requestId: string, params: Record<string, any>)=>{
      const response = await api.get(`/admin/review/shortlists/${requestId}/candidates`, { params });
    console.log("SHORTLISTED CANDIDATES", response);
    return response;
  },
  confirmTopNCandidates: async (requestId: string, n: number) => {
     const response = await api.post(`/admin/review/shortlists/${requestId}/confirm`, { n });
    console.log("TOP N CANDIDATES", response);
    return response;
  },
  deliverFinalShortlist: async (requestId: string) => {
    const response = await api.post(`/admin/review/shortlists/${requestId}/deliver`);
    console.log("FINAL SHORTLIST", response);
    return response;
  }

};




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
