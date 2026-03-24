"use client";
import { useAuth } from "@/lib/context/AuthContext";

export default function LogoutPage() {
  const { logout } = useAuth();
  logout();
}
