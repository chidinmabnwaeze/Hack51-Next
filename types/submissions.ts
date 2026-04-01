export interface SubmissionListProps {
  id: number;
  request_id: number;
  title: string;
  status: "draft" | "pending evaluation" | "rejected" | "shortlisted";
  submitted_at: string;
}
