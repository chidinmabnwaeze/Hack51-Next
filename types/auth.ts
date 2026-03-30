export interface RegisterProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface DashboardRoute{
  employer: "/";
  candidate: "/candidate/dashboard";  
  admin: "/admin/dashboard";
}