import { LucideIcon } from "lucide-react";

export interface RegisterProps {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  // timezone: string;
  avatar_url?: string;
  role: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface DashboardRoute {
  employer: "/";
  candidate: "/candidate/dashboard";
  admin: "/admin/dashboard";
}
