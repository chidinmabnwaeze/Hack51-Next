import { EmployerRequest } from "@/types/employer";

export interface CandidateSubmission {
  artifact_urls: string[];
  artifact_type: string | "link";
  submission_statement: string;
  integrity_declared: boolean;
}

export interface SubmissionListProps {
  id: string;
  status: "submitted";
  artifact_urls: string[];
  submission_statement: string;
  triage_decision: string | null;
  triage_reason: string | null;
  reviewer_notes: string | null;
  total_score: string | null;
  resubmit_count: number;
  submitted_at: string;
  updated_at: string;
  job_requests: JobRequests;
 
}

export interface JobRequests extends EmployerRequest {
  workspaces: {
    company_name: string | null;
  };
}

export type Stats = {
  submitted: number;
  total: number;
  shortlisted: number;
  rejected: number;
  under_review: number;
};