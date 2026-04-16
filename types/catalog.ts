export type SkillLevel = "entry-level" | "mid-level" | "senior";


export interface RoleCreationPayload {
  name?: string;
  description?: string;
  skill_levels?: SkillLevel;
  capabilities?: [
    {
      title: string;
      summary: string;
    }
  ];
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
