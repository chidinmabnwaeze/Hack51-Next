export type RequestStatus =
  | "draft"
  | "published"
  | "evaluating"
  | "shortlisted";

export interface EmployerRequest {
  id: string;
  title: string;
  role_type: string;
  role_level: string;
  challenge_id: string;
  challenge_cap: number;
  shortlist_size: number;
  deadline: string;
  status: RequestStatus;
  created_at: string;
}

export interface CreateRequestPayload {
  title: string;
  role_type: string;
  role_level?: string;
  challenge_id: string;
  challenge_cap: number;
  shortlist_size: number;
  deadline: string;
}

export interface UpdateRequestPayload {
  title?: string;
  role_type?: string;
  role_level?: string;
  challenge_id?: string;
  challenge_cap?: number;
  shortlist_size?: number;
  deadline?: string;
}

// export interface Role {
//   id: string;
//   name: string;
// }

export interface Challenge {
  id: string;
  title: string;
  description?: string;
}

export interface Shortlist {
  id: string;
  request_id: string;
  candidates: Candidate[];
}

export interface Candidate {
  id: string;
  name: string;
  score: number;
}

export interface PaymentInitResponse {
  authorization_url: string;
  reference: string;
}