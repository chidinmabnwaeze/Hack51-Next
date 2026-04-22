export type SkillLevel = "entry-level" | "mid-level" | "senior";

export interface RoleCreationPayload {
  name?: string;
  description?: string;
  skill_levels?: SkillLevel[];
  capabilities?: {
    title: string;
    summary: string;
  }[];
}

export interface Capability {
  title: string;
  summary: string;
}

export interface EmployerRoles {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  status: "approved"| "pending" | "rejected";
  proposed_by: null;
  created_at: string;
  updated_at: string;
  catalog_skill_levels: { id: string; level: string }[];
  challenges: string[];
  catalog_capabilities?: Capability[];
}

export interface CreateChallengeWithRubric {
  catalog_role_id?: string;
  title?: string;
  summary?: string;
  scenario?: string;
  deliverables: string[];
  submission_format?: string;
  constraints_text?: string;
  submission_requirements?: string;
  rubric_criteria?: {
    title: string;
    description: string;
    weight: number;
  }[];
}

//sample challenge request ----------------------------------
// export interface CreateChallengeWithRubric{
//   {
//   "catalog_role_id": "93838463-b78b-4703-855f-23941cf47f59",
//   "title": "API Optimization Challenge",
//   "summary": "Improve a sluggish REST API",
//   "scenario": "Your team manages a backend API...",
//   "deliverables": [
//     "Source code repo",
//     "README.md",
//     "Performance report"
//   ],
//   "submission_format": "Single ZIP or public GitHub link",
//   "constraints_text": "Max 10 pages. No external libraries not in requirements.",
//   "submission_requirements": "Provide a public GitHub repo with a comprehensive README.",
//   "rubric_criteria": [
//     {
//       "title": "Code Quality",
//       "description": "Code patterns, readability, maintainability",
//       "weight": 30
//     },
//     {
//       "title": "Code Technicality",
//       "description": "Technical depth and architectural decisions",
//       "weight": 30
//     },
//     {
//       "title": "Code Functionality",
//       "description": "Does it work correctly and efficiently",
//       "weight": 40
//     }
//   ]
// }
// }

