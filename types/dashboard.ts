import { EmployerRequest } from "./employer";

export type Days = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

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

export interface AdminDashboardProps {
  stats: {
    submissions_received: number;
    invalid_submissions: number;
    evaluated_submissions: number;
    shortlists_delivered: number;
  };
  users: {
    total: number;
    verified: number;
    active: number;
    by_role: {
      candidate: number;
      employer: number;
      system_admin: number;
      admin_reviewer: number;
    };
  };
  requests: {
    total: number;
    by_status: {
      draft: number;
      published: number;
      shortlisted: number;
    };
  };
  payments: {
    total_revenue_ngn: number;
    total_transactions: number;
  };
  charts: {
    evaluations_per_day: {
      day: Days;
      count: number;
    };
  }[];

  requests_overview: {
    label: string;
    value: number;
  }[];
}

export interface CandidateDashboardProps {
 "summary": {
      "total_submissions": 4,
      "total_shortlisted": 0,
      "unread_notifications": 12,
      "by_status": {
        "under_review": 1,
        "scored": 3
      }
    },
    "recent_submissions": [
      {
        "id": "4ef9ef79-0fdf-440f-9b7f-f20546048270",
        "status": "under_review",
        "submitted_at": "2026-05-08T15:45:31.821517+00:00",
        "job_requests": {
          "title": "lawyer",
          "deadline": "2026-05-30T00:00:00+00:00",
          "role_type": "cd965369-cc5a-47c6-aac6-b4c2a086031f"
        }
      },
      {
        "id": "54513699-ff1e-4bab-be77-438fcfed7a7f",
        "status": "scored",
        "submitted_at": "2026-05-08T14:29:09.493939+00:00",
        "job_requests": {
          "title": "Farm Manager",
          "deadline": "2026-05-22T00:00:00+00:00",
          "role_type": "5db8941c-089d-42e9-8617-5b95a02ddc41"
        }
      },
      {
        "id": "4c0bc2aa-003c-4105-9d9a-b16aa0cfd925",
        "status": "scored",
        "submitted_at": "2026-04-28T00:47:17.893321+00:00",
        "job_requests": {
          "title": "Accountant",
          "deadline": "2026-05-09T00:00:00+00:00",
          "role_type": "95914b2c-2875-46dd-8fe5-2a328a7b7a34"
        }
      },
      {
        "id": "5bd362d3-2f8f-4fac-9763-e60ca55cae55",
        "status": "scored",
        "submitted_at": "2026-04-28T00:08:09.766133+00:00",
        "job_requests": {
          "title": "Doctor",
          "deadline": "2026-06-13T00:00:00+00:00",
          "role_type": "81474c60-2dec-47ff-8fe1-e6dfffbbc59e"
        }
      }
    ],
    "shortlists": [],
    "profile": {
      "skills": [],
      "experience_years": null,
      "location": null
    }
  },
}