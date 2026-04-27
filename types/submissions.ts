export interface CandidateSubmission {
  artifact_urls: string[];
  artifact_type: string | "link";
  submission_statement: string;
  integrity_declared: boolean;
}
