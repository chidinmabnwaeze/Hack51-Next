import { authService } from "@/lib/services/auth.service";

export default function LogoutPage() {
  const logout = authService.logout;
  logout();
}
