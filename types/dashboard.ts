import { EmployerRequest } from "./employer";

export interface EmployerDashboardProps {
  summary: {
    total_requests: number;
    total_submissions: number;
    total_evaluations: number;
    total_shortlists_delivered: number;
    unread_notifications: number;
    by_status: {
      shortlisted: number;
      published: number;
      draft: number;
    };
  };
  active_requests: EmployerRequest[];
  recent_requests: EmployerRequest[];
}
