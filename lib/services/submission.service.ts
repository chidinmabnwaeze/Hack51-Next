import { ApiResponse } from "@/types/api";
import api from "../api";
import { SubmissionListProps } from "@/types/submissions";

export const submissionService = {
  submissionList: async (data: SubmissionListProps) => {
    const res: ApiResponse<any> = await api.get("my-submissions", {
      params: {
        page: 1,
        limit: 10,
      },
    });
    return res;
  },
};
