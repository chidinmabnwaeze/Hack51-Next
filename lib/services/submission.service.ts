import { EmployerRequest } from "@/types/employer";
import { ApiResponse } from "@/types/api";
import api from "../api";
import { CandidateSubmission } from "@/types/submissions";

export const submissionService = {
  candidateSubmissions: async (data: SubmissionListProps) => {
    const res: ApiResponse<any> = await api.get("candidate/submissions", {
      params: {
        page: 1,
        limit: 10,
      },
    });
    return res;
  },
  submitArtifact: async (
    id: string,
    data: CandidateSubmission,
  ): Promise<EmployerRequest> => {
    const response = await api.post(`/candidate/challenges/${id}/submit`, data);
    return response.data;
  },
};
