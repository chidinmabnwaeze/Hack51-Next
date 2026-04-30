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
   users: {
    id: string;
    email: string;
    last_name: string;
    avatar_url: string | null;
    first_name: string;
  };
  // job_requests: JobRequests;
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

export interface SubmissionFullDetail {
  id: string;
  status: "submitted";
  artifact_urls: string[];
  artifact_type: string;
  submission_statement: string;
  integrity_declared: boolean;
  triage_decision: string | null;
  triage_reason: string | null;
  triaged_at: string | null;
  reviewer_notes: string | null;
  total_score: number | null;
  scored_at: string | null;
  resubmit_count: number;
  submitted_at: string;
  created_at: string;
  updated_at: string;
  users: {
    id: string;
    email: string;
    last_name: string;
    avatar_url: string | null;
    first_name: string;
  };
  job_requests: {
    id: string;
    title: string;
    deadline: string;
    role_type: string;
    challenge_cap: number;
    shortlist_size: number;
    snapshot_rubric: [
      {
        id: string;
        title: string;
        weight: number;
        sort_order: number;
        description: string;
      },
    ];
    snapshot_challenge: {
      id: string;
      title: string;
      summary: string;
      scenario: string;
      deliverables: string[];
      rubric_criteria: [
        {
          id: string;
          title: string;
          weight: number;
          sort_order: number;
          description: string;
        },
      ];
      constraints_text: string;
      submission_format: string;
    };
  };
  submission_scores: number[];
}

