// Auth types and utilities
export type UserRole = "employer" | "admin" | "candidate";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Role-based dashboard routes
export const DASHBOARD_ROUTES: Record<UserRole, string> = {
  employer: "/dashboard",
  admin: "/admin/dashboard",
  candidate: "/candidate/dashboard",
};

// Helper function to get dashboard route based on role
export const getDashboardRoute = (role: UserRole): string => {
  return DASHBOARD_ROUTES[role];
};

// Helper to check if user is authenticated
export const isUserAuthenticated = (user: User | null): boolean => {
  return user !== null;
};
