export interface RoleCreationPayload {
  title: string;
  level: string;
  competencies: string;
  name: string;
  description: string;
  skill_levels: "entry-level" | "mid-level" | "senior";
  capabilities: [string];
}

export interface ChallengeCreationPayload {
  version: number;
  title: string;
  scenario: string;
  deliverables: [string];
  rules: string;
  created_by: string;
  submission_requirements: string;
}
export interface ApprovedProps {
  id: string;
  version: number;
  title: string;
  approval_status: "approved" | "rejected" | "pending";
  approved_by_id: string;
  approved_at: string;
  created_at: string;
}
