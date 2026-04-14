export type UserRole = "system_admin" | "employer" | "candidate";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  timezone: string;
  avatar_url?: string;
  role: UserRole;
  workspace: string[];
  is_internal: boolean;
  verified_at?: string;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

